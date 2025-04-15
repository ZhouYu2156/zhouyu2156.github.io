# Tornado 框架

::: info 介绍
Tornado 是一个Python Web框架和异步网络库，起初由FriendFeed开发。通过使用非阻塞网络I/O，Tornado可以支撑上万级的连接，处理长连接、WebSockets和其他需要与每个用户保持长久连接的应用。

- 推荐1: [英文官网](https://www.tornadoweb.org/en/stable/index.html)
- 推荐2: [中文文档](https://tornado-zh.readthedocs.io/zh/latest/)

:::


## 概述

::: info 说明
Tornado是使用Python编写的一个强大的、可扩展的Web服务器。它在处理庞大的网络流量时表现得足够强健，同时在创建和编写时有着足够的轻量级，并能够被用在大量的应用和工具中。

Tornado起初是由FriendFeed开发的网络服务框架，当FriendFeed被Facebook收购后得以开源。Tornado在设计之初就考虑到了性能因素，旨在解决C10K问题，这样的设计使得其成为一个拥有高性能的框架。此外，它还具有处理安全性、用户验证、社交网络以及与外部服务（如数据库和网站API）进行异步交互的特性。

> C10K问题指的是优化网络套接字来处理客户端的请求时产生的问题。之所以被称为 C10K，是为了描述并发地处理 10k 数量级的连接数。

:::


Tornado 大体上可以被分为 4 个主要部分：
- Web框架，包括创建Web应用的RequestHandler类，还有很多其他支持的类。
- HTTP (HTTPServer 和 AsyncHTTPClient) 的客户端和服务端实现。
- 异步网络库 (IOLoop 和 IOStream)， 为 HTTP 组件提供构建模块，也可以用来实现其他协议。
- 协程库 (tornado.gen)，允许以比链式回调更直接的方式编写异步代码。


## 安装 Tornado

::: warning 注意
这里演示的 tornado 使用的版本是: `5.0.2`
:::

```bash
$ pip install tornado==5.0.2
```


## 第一个 Tornado 程序

```python
from tornado import ioloop, web

# 请求处理器
class MainHandler(web.RequestHandler):
    def get(self):
        self.write('Hello world!')


# 创建应用
def make_app():
    return web.Application([
            (r"/", MainHandler),    # 设置路由 和 路由对应的处理器
        ]
    )


if __name__ == '__main__':
    app = make_app()    # 获取 web 应用实例
    app.listen(8888)    # 绑定监听端口
    print('server is running at http://localhost:8888/')
    ioloop.IOLoop.current().start()     # 开始事件循环: 启动服务
```

## HTTP 方法

::: info 介绍
Tornado 框架提供了常见的 HTTP 方法，封装在 RequestHandler 类当中，当我们在编写对应处理器时，就可以重写这些方法来响应不同的请求。只要匹配对应的路由进入对应的处理器，处理器内部会自动根据请求方式分发给对应的请求函数去响应。

:::

Tornado 提供的 HTTP 方法如下：

- `RequestHandler.options(*args, **kwargs)`
- `RequestHandler.head(*args, **kwargs)`
- `RequestHandler.get(*args, **kwargs)`
- `RequestHandler.post(*args, **kwargs)`
- `RequestHandler.delete(*args, **kwargs)`
- `RequestHandler.put(*args, **kwargs)`
- `RequestHandler.patch(*args, **kwargs)`

> 示例

```python
from tornado import ioloop, web
import os


class MainHandler(web.RequestHandler):
    def get(self):
        self.write('Hello world!')

# 处理不同的请求
class LoginHandler(web.RequestHandler):
    # GET 请求
    def get(self):
        self.write("this is login page!")

    # POST 请求
    def post(self):
        username = self.get_argument('username', '')
        password = self.get_argument('password', '')
        self.write(f'{username} {password}')


def make_app():
    return web.Application([
        (r"/", MainHandler),
        ('/login', LoginHandler)
    ],
    )


if __name__ == '__main__':
    app = make_app()
    app.listen(8888)
    print('server running at http://localhost:8888/')
    ioloop.IOLoop.current().start()


# 浏览器直接访问, 走 GET 请求: http://127.0.0.1:8888/login
# cmd 中通过这个命令也可以发起一个POST请求：
#        curl -d "username=mrsoft&password=123456" http://127.0.0.1:8888/login
```



## 模板、静态资源

::: info 说明
Flask 和 Django框架有模板，Tornado自身也提供了一个轻量级、快速切灵活地模板语言在 tornado.template 模块中。使用模板可以简化 web 页面，并且提高代码的可读性。

:::

- 在 `Application` 中可以设置如下参数:
    - `handlers=[(r'/', SomeHandler), ...]`, 设置路由和对应的处理器
    - `debug=True`, 开启调试模式
    - `template_path="xxx"`, 设置模板路径
    - `static_path="xxx"`, 设置静态资源路径

> 设置了模板路径之后，就可以通过 `self.render('xxx.html')` 方法来渲染模板了，返回的 `xxx.html` 就是 `template目录` 下的模板文件。

> 设置了静态资源路径之后，就可以在模板文件中通过 `<script src="{\{ static_url('index.js') \}}"></script>` 这样的语法来引用 `static目录` 下的静态资源了，最终页面返回给前端渲染出来的路径是 `/static/index.js` 。(上面的 `\` 用来转义 vue 语法，不然被默认为双花括号为插值语法了)


### 模板语法

::: info 介绍
Tornado的模板语法和 `flask` 的 `jinja2` 模板语法相似，拥有控制语句和表达式。

- 控制语句被包在 `{%` 和 `%}` 中间, 例如 `{% if len(items) > 2 %} {% endif %}`, 其中 `items` 通过 `RequestHandler` 的处理方法中的 `self.render('xx.html', items=[])` 这种方式传递给模板。

- 表达式被包在 `{\{ 和 \}}` 之间, 例如 `{\{ items[0] \}}`

- 模板中可以使用的内置对象

详情参见: [戳我看官方说明](https://tornado-zh.readthedocs.io/zh/latest/guide/templates.html#)

:::


## 异步与协程

### 阻塞

::: info 概念
程序未得到所需计算资源时被挂起的状态称之为阻塞。

程序在等待某个操作完成期间，自身无法继续干别的事情，则称该程序在该操作上是阻塞的。常见的阻塞形式有网络 I/O 阻塞、磁盘 I/O 阻塞、用户输入阻塞等。

阻塞是无处不在的，包括CPU切换上下文时，所有的进程都无法真正干事情，它们也会被阻塞。

:::

### 非阻塞

::: info 概念
程序在等待某操作过程中，自身不被阻塞，可以继续运行干别的事情，则称该程序在该操作上是非阻塞的。

非阻塞并不是在任何程序级别、任何情况下都可以存在的。仅当程序封装的级别可以囊括独立的子程序单元时，它才可能存在非阻塞状态。非阻塞的存在是因为阻塞的存在，正因为某个操作阻塞导致的耗时和效率低下，我们才要把它变成非阻塞的。
:::














































