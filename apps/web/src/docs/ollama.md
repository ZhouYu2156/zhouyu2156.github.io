# Ollama 开源大模型

::: info 文档

Ollama 是一个开源的大型语言模型（LLM）服务工具，它允许用户在本地机器上运行和部署大型语言模型。

- 推荐 1：[Ollama 官网](https://ollama.com/)
- 推荐 2：[Ollama Github 仓库](https://github.com/ollama/ollama)

:::

::: tip 提示

- `ollama`命令行工具的使用很类似`docker`命令，通过 `olloma -h` 可查看帮助
- 推荐阅读：[博客文章](https://mp.weixin.qq.com/s?__biz=MzUyODk0Njc1NQ==&mid=2247486353&idx=1&sn=b590181589be96cf9e016b39cc4cdbf7&chksm=fb64f3917f0dfa282b943c03352c06a6adfe4a4043805be7440cc3ff45f77c16841a1cb15c11&scene=27)

:::

## 列出已有模型

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

## ollama 开发接口

下文根据 [Ollama 官方仓库 `docs/api.md`](https://github.com/ollama/ollama/blob/main/docs/api.md) 整理，按「先总览、后分接口」的方式写成中文导读，方便日常查阅。官方也在将 API 文档迁往 [docs.ollama.com/api](https://docs.ollama.com/api)，以线上版本为准。下面默认服务根地址为 `http://localhost:11434`。

### 接口一览

| 分类 | 方法     | 路径                 | 说明                                       |
| ---- | -------- | -------------------- | ------------------------------------------ |
| 补全 | `POST`   | `/api/generate`      | 单轮提示补全（流式为主）                   |
| 对话 | `POST`   | `/api/chat`          | 多轮对话、工具调用等                       |
| 模型 | `POST`   | `/api/create`        | 从已有模型 / GGUF / Safetensors 等创建模型 |
| 模型 | `HEAD`   | `/api/blobs/:digest` | 检查 Blob 是否已在服务端                   |
| 模型 | `POST`   | `/api/blobs/:digest` | 上传文件生成 Blob                          |
| 模型 | `GET`    | `/api/tags`          | 列出本机已有模型                           |
| 模型 | `POST`   | `/api/show`          | 查看模型详情、Modelfile、模板等            |
| 模型 | `POST`   | `/api/copy`          | 复制模型到新名称                           |
| 模型 | `DELETE` | `/api/delete`        | 删除模型                                   |
| 模型 | `POST`   | `/api/pull`          | 从库中拉取模型                             |
| 模型 | `POST`   | `/api/push`          | 推送到模型库（需账号与公钥）               |
| 向量 | `POST`   | `/api/embed`         | 生成向量（推荐）                           |
| 向量 | `POST`   | `/api/embeddings`    | 旧版向量接口（已被 `/api/embed` 取代）     |
| 状态 | `GET`    | `/api/ps`            | 当前加载在内存中的模型                     |
| 状态 | `GET`    | `/api/version`       | Ollama 版本号                              |

---

### 通用约定

**模型名称**

- 形如 `模型名:标签`，也可带命名空间，例如 `example/model:tag`。
- 标签可省略，省略时等价于 `latest`。
- 示例：`orca-mini:3b-q8_0`、`llama3:70b`。

**时间字段**

- 接口返回的「时长」类字段单位为**纳秒**（nanoseconds）。

**流式响应**

- 多数接口默认以 **NDJSON 流**形式多次返回 JSON 对象。
- 在请求体中加入 `"stream": false` 可改为**单次完整 JSON 响应**。

---

### 生成补全：`POST /api/generate`

根据提示词与指定模型生成文本；默认**流式**，最后一帧会带上统计信息。

**常用请求字段**

| 字段         | 说明                                                                       |
| ------------ | -------------------------------------------------------------------------- |
| `model`      | **必填**，模型名                                                           |
| `prompt`     | 提示词；留空配合下文「加载 / 卸载」用法                                    |
| `suffix`     | 模型输出**之后**要接的文本（适合代码续写等）                               |
| `images`     | 可选，Base64 图片列表，多模态模型（如 `llava`）使用                        |
| `think`      | 思考型模型：是否在回答前先「思考」                                         |
| `format`     | `json` 或 JSON Schema，用于结构化输出                                      |
| `options`    | 采样等参数，与 Modelfile 中一致（如 `temperature`）                        |
| `system`     | 覆盖 Modelfile 中的系统提示                                                |
| `template`   | 覆盖 Modelfile 中的模板                                                    |
| `stream`     | `false` 时整段返回                                                         |
| `raw`        | `true` 时不做模板格式化；此时通常自行提供完整提示词                        |
| `keep_alive` | 请求结束后模型在内存中保留多久，默认 `5m`；设为 `0` 可配合空 `prompt` 卸载 |
| `context`    | **已弃用**：此前用于跨请求维持简短对话记忆                                 |

**实验性（仅图像生成模型）**：`width`、`height`、`steps` 等为扩散步数与尺寸，将来可能变更。

**结构化输出**：在 `format` 里传 JSON Schema，模型输出需符合模式。

**JSON 模式**：`format` 设为 `"json"` 时，应在 **`prompt` 里明确要求用 JSON 回答**，否则容易产出大量空白或格式不稳。

**性能**：最后一包里若有 `eval_count`、`eval_duration`（纳秒），每秒约 tokens 可估算为  
`eval_count / eval_duration * 10^9`。

**加载模型**：只传 `model`，`prompt` 为空字符串或不强调生成内容时，会将模型载入内存。

**卸载模型**：`prompt` 为空且 `keep_alive` 为 `0` 时卸载，`done_reason` 可为 `unload`。

::: details 示例：流式请求

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Why is the sky blue?"
}'
```

返回多条 JSON，每条一段 `response`，最后一帧 `done: true` 并带耗时等统计。

:::

::: details 示例：关闭流式

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Why is the sky blue?",
  "stream": false
}'
```

:::

::: details 示例：后缀补全（代码）

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "codellama:code",
  "prompt": "def compute_gcd(a, b):",
  "suffix": "    return result",
  "options": { "temperature": 0 },
  "stream": false
}'
```

:::

::: details 示例：多模态（图片为 Base64 字符串数组）

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llava",
  "prompt": "What is in this picture?",
  "stream": false,
  "images": ["<BASE64_IMAGE_DATA>"]
}'
```

将本地图片先转为 Base64 再填入数组即可。

:::

::: details 示例：Raw 模式（完整自建模板）

`raw: true` 时不走内置模板；通常也不返回 `context`。

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "mistral",
  "prompt": "[INST] why is the sky blue? [/INST]",
  "raw": true,
  "stream": false
}'
```

:::

::: details 示例：可复现输出

在 `options` 里设置 `seed`（与其它采样参数一起传入）。

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "mistral",
  "prompt": "Why is the sky blue?",
  "options": { "seed": 123 }
}'
```

:::

---

### 对话：`POST /api/chat`

按消息列表生成**下一条**助手回复；默认流式，`stream: false` 可一次返回。

**常用请求字段**

| 字段         | 说明                                       |
| ------------ | ------------------------------------------ |
| `model`      | **必填**                                   |
| `messages`   | 对话消息数组，用于多轮上下文               |
| `tools`      | 工具定义（JSON），模型支持时可触发工具调用 |
| `think`      | 思考型模型                                 |
| `format`     | 与 generate 类似，支持 JSON / Schema       |
| `options`    | 运行时模型参数                             |
| `stream`     | `false` 关闭流式                           |
| `keep_alive` | 默认 `5m`                                  |

**单条 `message` 常用字段**

| 字段         | 说明                                                    |
| ------------ | ------------------------------------------------------- |
| `role`       | `system` \| `user` \| `assistant` \| `tool`             |
| `content`    | 文本内容                                                |
| `thinking`   | 思考型模型：思考过程                                    |
| `images`     | 可选，多模态时附 Base64 图片列表                        |
| `tool_calls` | 模型希望调用的工具                                      |
| `tool_name`  | `role` 为 `tool` 时标明被执行的工具名，便于模型理解结果 |

**工具调用**：在请求里提供 `tools`；流式与非流式下均可返回 `tool_calls`。需要把工具执行结果再以 `role: "tool"` 写回 `messages` 继续对话。支持工具调用的模型可在 [Ollama 搜索](https://ollama.com/search?c=tool) 筛选。

**加载模型**：`messages` 为空数组时，可将模型载入内存（响应里可见 `done_reason: "load"` 等）。

**卸载模型**：`messages` 为空且 `keep_alive: 0` 时卸载。

::: details 示例：流式对话

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    { "role": "user", "content": "why is the sky blue?" }
  ]
}'
```

:::

::: details 示例：带历史的多轮

把上一轮 `user` / `assistant` 消息按顺序放入 `messages` 即可。

:::

---

### 创建模型：`POST /api/create`

可从**已有模型**、**GGUF 文件**或 **Safetensors 目录**创建新模型。若基于 GGUF / Safetensors，需先为每个文件按下文「上传 Blob」推送二进制，再在 `files` 里写「文件名 → SHA256」映射。

**主要字段**：`model`、`from`、`files`、`adapters`（LoRA）、`template`、`license`、`system`、`parameters`、`messages`、`stream`、`quantize`（对非量化模型做量化）等。量化类型常见 `q4_K_M`、`q4_K_S`、`q8_0` 等，官方示例中 `q4_K_M` 与 `q8_0` 标为常用。

---

### 检查 Blob：`HEAD /api/blobs/:digest`

根据 SHA256 摘要检查文件是否已在**当前 Ollama 服务**上（不是 ollama.com）。存在返回 `200`，不存在返回 `404`。

```bash
curl -I http://localhost:11434/api/blobs/sha256:29fdb92e57cf0827ded04ae6461b5931d01fa595843f55d36f5b275a52087dd2
```

---

### 上传 Blob：`POST /api/blobs/:digest`

向服务端推送原始文件，摘要需与内容一致。成功常返回 `201`；摘要不匹配可能返回 `400`。

```bash
curl -T model.gguf -X POST http://localhost:11434/api/blobs/sha256:29fdb92e57cf0827ded04ae6461b5931d01fa595843f55d36f5b275a52087dd2
```

---

### 列出本机模型：`GET /api/tags`

返回本地已下载的模型列表（名称、修改时间、体积、`digest`、`details` 等）。

```bash
curl http://localhost:11434/api/tags
```

---

### 模型详情：`POST /api/show`

查看 Modelfile、模板、参数、许可、系统提示等。`verbose: true` 时部分字段（如分词表）更完整。

```bash
curl http://localhost:11434/api/show -d '{ "model": "llava" }'
```

---

### 复制模型：`POST /api/copy`

```bash
curl http://localhost:11434/api/copy -d '{
  "source": "llama3.2",
  "destination": "llama3-backup"
}'
```

成功 `200`；源不存在则 `404`。

---

### 删除模型：`DELETE /api/delete`

```bash
curl -X DELETE http://localhost:11434/api/delete -d '{
  "model": "llama3:13b"
}'
```

---

### 拉取模型：`POST /api/pull`

从 Ollama 模型库下载；中断后可续传，多次调用会共享进度。`stream: false` 时返回单个 JSON（如 `status: success`）。流式时会先后出现 manifest、各层下载进度、校验与写入等状态对象。

**参数**：`model`；可选 `insecure`（仅开发环境拉自定义库）、`stream`。

---

### 推送模型：`POST /api/push`

将模型推到模型库；需在 ollama.ai 注册并配置公钥。模型名形如 `<命名空间>/<模型>:<标签>`。响应多为流式状态，结束时 `success`。

---

### 向量：`POST /api/embed`

从指定模型生成向量。`input` 可为**字符串**或**字符串数组**。可选：`truncate`（默认截断以适配上下文）、`options`、`keep_alive`、`dimensions`（向量维度）。

```bash
curl http://localhost:11434/api/embed -d '{
  "model": "all-minilm",
  "input": "Why is the sky blue?"
}'
```

---

### 运行中的模型：`GET /api/ps`

列出当前占用内存的模型，含过期时间、VRAM 占用等。

```bash
curl http://localhost:11434/api/ps
```

---

### 旧版向量：`POST /api/embeddings`

已被 **`/api/embed` 替代**，新项目请优先使用 `/api/embed`。参数以往为 `model` + `prompt` 等。

---

### 版本：`GET /api/version`

```bash
curl http://localhost:11434/api/version
```

返回形如 `{ "version": "0.5.1" }`。

---

### 实验特性：文生图（图像生成模型）

::: warning 实验性质

接口与参数未来可能变化；仅在使用**图像生成类模型**时生效。

:::

通过 **`POST /api/generate`** 调用图像模型即可；`width`、`height`、`steps` 等参数见上文「生成补全」中的实验性说明。流式过程中可能返回进度（如 `completed` / `total`），完成后响应中含 Base64 图片字段 `image`。

---

以上内容便于与命令行章节对照使用；若与最新发行版行为不一致，请以本地 `ollama` 版本及 [官方文档](https://docs.ollama.com/api) 为准。
