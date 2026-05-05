from openai import OpenAI
from datetime import datetime
import json
import os
import random
import dotenv

OPENAI_API_KEY = 'sk-e01d344cd5ac4b5c8954bcb4b66b5057'

dotenv.load_dotenv()

# 初始化客户端
client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)
# 模拟用户问题
USER_QUESTION = "北京天气咋样"
# 定义工具列表
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "当你想查询指定城市的天气时非常有用。",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "城市或县区，比如北京市、杭州市、余杭区等。",
                    }
                },
                "required": ["location"],
            },
        },
    },
]


# 模拟天气查询工具
def get_current_weather(arguments):
    weather_conditions = ["晴天", "多云", "雨天"]
    random_weather = random.choice(weather_conditions)
    location = arguments["location"]
    return f"{location}今天是{random_weather}。"


# 封装模型响应函数
def get_response(messages):
    completion = client.chat.completions.create(
        model="qwen3.6-plus",
        extra_body={"enable_thinking": False},
        messages=messages,
        tools=tools,
    )
    return completion


messages = [{"role": "user", "content": USER_QUESTION}]
response = get_response(messages)
assistant_output = response.choices[0].message
if assistant_output.content is None:
    assistant_output.content = ""
messages.append(assistant_output)
# 如果不需要调用工具，直接输出内容
if assistant_output.tool_calls is None:
    print(f"无需调用天气查询工具，直接回复：{assistant_output.content}")
else:
    # 进入工具调用循环
    while assistant_output.tool_calls is not None:
        tool_call = assistant_output.tool_calls[0]
        tool_call_id = tool_call.id
        func_name = tool_call.function.name
        arguments = json.loads(tool_call.function.arguments)
        print(f"正在调用工具 [{func_name}]，参数：{arguments}")
        # 执行工具
        tool_result = get_current_weather(arguments)
        # 构造工具返回信息
        tool_message = {
            "role": "tool",
            "tool_call_id": tool_call_id,
            "content": tool_result,  # 保持原始工具输出
        }
        print(f"工具返回：{tool_message['content']}")
        messages.append(tool_message)
        # 再次调用模型，获取总结后的自然语言回复
        response = get_response(messages)
        assistant_output = response.choices[0].message
        if assistant_output.content is None:
            assistant_output.content = ""
        messages.append(assistant_output)
    print(f"助手最终回复：{assistant_output.content}")