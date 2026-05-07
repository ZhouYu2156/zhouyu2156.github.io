# AI 开发快速上手

> 以通俗易懂的方式快速掌握 AI 开发原理。

## 模型推理

### 前置条件

```python
import os
from openai import OpenAI
import json

# 去申请各大模型服务平台的 API_KEY, 参考: https://help.aliyun.com/zh/model-studio/get-api-key
OPENAI_API_KEY = 'sk-xxxx'
# 大模型服务平台官方文档有服务调用的基地址，这里我以 【阿里云百炼】 为例
OPENAI_BASE_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1'

def create_openai_client():
  return OpenAI(api_key=OPENAI_API_KEY, base_url=OPENAI_BASE_URL)

client = create_openai_client()
```

### Function Calling

::: tip
大模型有时候在面对实时性、特定数学计算，或者需要大模型调用你指定的自定义函数获得结果反馈，那么此时 `Function Calling` 通过给大模型引入外部工具，告诉大模型该如何准确地解决问题，从而让大模型可以回答无法解决的事情。

:::

- 工作原理

> Function Calling 通过在应用程序和大模型之间的多步骤交互，使大模型可以参考外部工具信息进行回答。

![AI函数调用流程图](/illustration/function_calling.png)

- 代码

:::details 具体代码实现

```python
# 1. LLM 函数调用

## 1.1 定义工具

"""工具是连接【大模型】与【大模型外部世界】的桥梁，首先需要定义工具。"""


def add(a: int, b: int) -> int:
    return a + b


function_mappers = {
    "add": add,
}

tools = [
    {
        "type": "function",
        "function": {
            "name": "add",
            "description": "Add two numbers",
            "parameters": {
                "type": "object",
                "properties": {
                    "a": {
                        "type": "integer",
                        "description": "一个数字"
                    },
                    "b": {
                        "type": "integer",
                        "description": "另一个数字"
                    }
                },
                "required": ["a", "b"]
            }
        }
    }
]

## 1.2 构建消息

"""消息是与大模型交互的载体，需要构建消息体。"""

messages = [
    {
        "role": "system",
        "content": """你是一个很有帮助的助手。当用户提问时，请调用 add 函数计算两个数字的和。""",
    },
    {
        "role": "user",
        "content": "请再随机给我两个两位数求和用"
    }
]

## 1.3 调用大模型

"""调用大模型，使用 function_calling 函数。"""


def function_calling():
    c = client.chat.completions.create(
        model="qwen3.6-plus",
        # extra_body={"enable_thinking": False},
        messages=messages,
        tools=tools
    )
    return c


while True:

    print("正在调用大模型...")

    # 调用大模型
    completion = function_calling()
    # 将大模型返回消息添加到消息中
    messages.append(completion.choices[0].message)

    # 解析大模型返回消息
    if completion.choices[0].message.tool_calls is not None:
        response = json.loads(completion.choices[0].message.model_dump_json())
        function_object = response["tool_calls"][0]
        callback = function_mappers[function_object["function"]["name"]]
        args = json.loads(function_object["function"]["arguments"])
        print("工具对象：", function_object)
        function_output = callback(**args)
        # 调用工具得到的结果，添加到消息上下文中
        messages.append({'role': 'tool', 'content': str(function_output), 'tool_call_id': function_object['id']})
        print("工具返回结果：", function_output)

        # 向大模型再次发送上下文消息
        completion = function_calling()
        # 将大模型返回消息添加到消息中
        messages.append(completion.choices[0].message)
        # print("💬当前对话详情：", messages)
    else:
        messages.append(completion.choices[0].message)

    if input("是否继续？(y/n): ") == "n":
        break
    messages.append({
        'role': 'user',
        'content': '请再随机给我两个两位数'
    })
    print("--------------------------------")
```

:::

- 结果

```md
正在调用大模型...
工具对象： {'id': 'call_a975353ee51b46609fd79482', 'function': {'arguments': '{"a": 37, "b": 64}', 'name': 'add'}, 'type': 'function', 'index': 0}
工具返回结果： 101
是否继续？(y/n): y

---

正在调用大模型...
```
