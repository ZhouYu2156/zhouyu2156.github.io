---
footer: false
---

# Ollama 开源大模型

::: info 文档

> Ollama 是一个开源的大型语言模型（LLM）服务工具，它允许用户在本地机器上运行和部署大型语言模型。

- 推荐 1：[Ollama 官网](https://ollama.com/)
- 推荐 2：[Ollama Github 仓库](https://github.com/ollama/ollama)

:::

::: tip 提示

- `ollama`命令行工具的使用很类似`docker`命令，通过 `olloma -h` 可查看帮助
- 推荐阅读：[博客文章](https://mp.weixin.qq.com/s?__biz=MzUyODk0Njc1NQ==&mid=2247486353&idx=1&sn=b590181589be96cf9e016b39cc4cdbf7&chksm=fb64f3917f0dfa282b943c03352c06a6adfe4a4043805be7440cc3ff45f77c16841a1cb15c11&scene=27)

:::

## 列出你电脑上所有模型

```bash
$ ollama list
```

## 创建模型

> `ollama create`用于从 Modelfile 创建模型

```bash
$ ollama create mymodel -f ./Modelfile
```

## 拉取模型

> 拉取本地已经存在的模型会自动比较两者差异进行更新

```bash
$ ollama pull llama3.2
```

## 删除模型

```bash
$ ollama rm llama3.2
```

## 复制模型

```bash
$ ollama cp llama3.2 my-model
```

## 显示模型信息

```bash
$ ollama show llama3.2
```

## 列出当前加载的模型

```bash
$ ollama ps
```

## 停止当前正在运行的模型

```bash
$ ollama stop llama3.2
```

## 命令行启动 Ollama

```bash
$ ollama serve
```

## 多行输入

```bash
>>>"""Hello,
...world!
...

..."""
回车之后表示确认输入完成，人功能就会给出答案了

```

## 多模态模型

> 表示既可以文字聊天还可以同时拥有其他功能，比如可以在聊天中用图片向机器人提问

```bash
$ ollama run llava "What's in this image? /Users/jmorgan/Desktop/smile.png"
The image features a yellow smiley face, which is likely the central focus of the picture.
```

## 将提示作为参数传递

```bash
$ ollama run llama3.2 "Summarize this file: $(cat README.md)"
 Ollama is a lightweight, extensible framework for building and running language models on the local machine. It provides a simple API for creating, running, and managing models, as well as a library of pre-built models that can be easily used in a variety of applications.
```

## 如何利用 API 构建应用程序？

::: tip 提示

- 详细介绍：[传送门](https://github.com/ollama/ollama/blob/main/docs/api.md)

:::
