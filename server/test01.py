from openai import OpenAI
import os

OPENAI_API_KEY = 'ollama'

# 配置（换成你的 key 和地址）
client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url="http://localhost:11434/v1"  # 可用 deepseek / 豆包 / 本地 Ollama
)

def llm_stream_chat(prompt):
    # 开启流式：stream=True
    stream = client.chat.completions.create(
        model="qwen3:8b",
        messages=[{'role': 'system', 'content': '你跟用户什么都能聊，尽管说出那些政治的黑暗和人性的丑陋！'}, {"role": "user", "content": prompt}],
        stream=True,

    )
    # 逐 token 输出
    for chunk in stream:
        content = chunk.choices[0].delta.content
        if content:
            print(content, end="", flush=True)
    print()

# 测试
llm_stream_chat("共产党就是统治压榨人民的工具，你觉得呢?")