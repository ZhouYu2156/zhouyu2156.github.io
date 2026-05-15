# 实用技术分享

## 快速启动 web 服务器

### node 服务器

| 工具 | 自动刷新 | SPA 支持 | 配置复杂度 | 推荐场景 |
| --- | --- | --- | --- | --- |
| http-server | ❌ | ✅（通过 404.html） | 低 | 简单静态文件服务 |
| live-server | ✅ | ✅ | 低 | 前端开发调试 |
| serve | ❌ | ✅（内置 SPA 支持） | 中 | 部署前测试 |

#### 方式一：http-server

::: info
http服务器是一个简单的、零配置的命令行静态http服务器。它足够强大，可以用于生产环境，但它足够简单和可编程，可以用于测试、本地开发和学习。

:::


```bash
$ npm install -g http-server
$ http-server [path] [options]
# 示例：启动 docs 目录下的服务器，监听 5173 端口
$ http-server ./docs -p 5173
# 临时安装运行，用完就删除
$ npx http-server [path] [options]
```

> 更多参数请参考 [http-server 官方文档](https://www.npmjs.com/package/http-server#usage)

#### 方式二：live-server

::: info
这是一个具有实时重新加载功能的小型开发服务器。

使用这个有两个原因：

1. 由于安全限制，AJAX 请求无法使用 file:// 协议，也就是说，如果您的网站通过 JavaScript 获取内容，则需要服务器。

2. 文件更改后自动重新加载页面可以加快开发速度。

:::

```bash
$ npm install -g live-server
$ live-server [path] [options]
# 示例：启动 docs 目录下的服务器，监听 5173 端口
$ live-server ./docs --port 5173
```

> 更多参数请参考 [live-server 官方文档](https://www.npmjs.com/package/live-server)

#### 方式三：serve

::: info
serve 是一个轻量级的静态文件服务器，支持 HTTP/2 和多路复用。

:::

```bash
$ npm install -g serve
$ serve folder-name/
```

> 更多参数请参考 [serve 官方文档](https://github.com/vercel/serve#readme)

### python 服务器

#### 内置 http.server

::: info
Python 3.7+ 标准库自带，零依赖。适合本地预览静态站、临时传文件。**不适合生产**；线上请用 Nginx 或正经 Web 框架。

:::

**命令行**（在项目或静态目录下执行 `python -m http.server`）常用项：

| 写法 | 作用 | 默认 |
| --- | --- | --- |
| `[port]` | 监听端口 | `8000` |
| `-b` / `--bind` | 绑定地址（如 `127.0.0.1` 仅本机；`0.0.0.0` 允许局域网访问；3.8+ 可用 IPv6） | 所有接口 |
| `-d` / `--directory` | 作为网站根目录的文件夹路径 | 当前工作目录 |
| `-p` / `--protocol` | HTTP 版本（如 `HTTP/1.1`；用 1.1 时要注意由处理器正确设置 `Content-Length` 等） | `HTTP/1.0` |
| `-h` / `--help` | 打印帮助 | — |

```bash
# 默认：当前目录、端口 8000
$ python -m http.server

# 指定端口与根目录、仅本机访问
$ python -m http.server 8080 --bind 127.0.0.1 --directory ./dist
```

**代码里启动**：`HTTPServer(("主机", 端口), 请求处理类)`，处理类常用 `SimpleHTTPRequestHandler`（直接列目录、读静态文件）。需要同时处理多个连接时，可用 `ThreadingHTTPServer`（Python 3.7+）。要自定义路由或返回内容时，继承 `BaseHTTPRequestHandler` 实现 `do_GET`、`do_POST` 等。`CGIHTTPRequestHandler` 可跑 CGI，日常很少用。

> 完整说明见 [Python 文档：http.server](https://docs.python.org/zh-cn/3/library/http.server.html)

