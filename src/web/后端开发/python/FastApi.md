# FastApi 框架

::: tip 介绍 
- 推荐：[前往 `FastApi` 官方文档](https://fastapi.tiangolo.com/zh/)

:::


## HTTP 请求协议内容
![http请求协议内容](/pictures/python_images/http请求协议内容.png)

## 快速上手
```python
import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def home():
    return "Hello world!"


if __name__ == '__main__':
    uvicorn.run('main:app', host='127.0.0.1', port=8000, reload=True)

```


## 请求与响应

### 查询路径参数

> 可以通过类型注解的方式来转换参数为指定的注解类型，如果不能转换为返回相应的错误响应信息

```python
@app.get('/user/{id}')
async def index(id: int):
    """
    路径参数
    """
    print(id, type(id))
    return {"id": id}
```

### 查询字符串参数

> 查询字符串就是路径的`?`后面的`key1=value1&key2=value2`内容



