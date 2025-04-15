# 支付宝沙箱支付详细使用教程

详细介绍支付宝沙箱支付的全流程配置最新教程，通俗易懂，图文并茂，手把手教你一步步实现完整沙箱支付功能。亲测可用，文章撰写非常用心，包你学会！



## 一、前言

由于支付宝官方对Java等语言的文档说明支持较好，在Python方面相对较弱，而且依赖包还安装不了等Bug，所以接下来我将分享《在Python Web开发中如何集成支付宝沙箱支付》的详细教程，如果这篇文章有帮助到你，请记得关注我的公众号，我会定期分享实用的技术教程。如果没有帮到你，也可以留个免费的关注，以后或许会有你感兴趣的教程，而且文章质量都超高哦！

在个人平常（或准备后续对接支付宝正式支付环境）的项目中，使用沙箱支付来测试支付功能显得很有必要；如果是在校大学生的话，在你的项目中集成支付宝的沙箱支付，也能让你的项目档次极大地拔高，狠狠地装一波。哈哈😄

话不多说，接下来我带你从零配置 Python 最简单的沙箱支付环境。这里只是举例引导在 Python Web 开发中如何去集成沙箱支付，你也可以与其他框架集成配合的，比如 `Django`、`FastAPI`、`Tornado`等。希望你能根据这个最简小精悍的配置，举一反三，搞明白沙箱支付的原理和流程，遇到其他框架时，也能够灵活配置来应对沙箱支付的业务功能。

## 二、前置条件

在 [进入沙箱支付应用配置](https://open.alipay.com/develop/manage) 这个界面中，点击 `开发工具推荐 > 沙箱` 进入沙箱应用界面。

![沙箱配置起始界面](./images/沙箱配置起始界面.png)

进入后的界面如下，有两个关键的地方 🛡️ `APPID`和 🔑 `密钥`，之后需要配置到我们的项目中：

![沙箱应用信息](./images/沙箱应用信息.png)

如果已经熟悉了原理的话，直接启用`系统默认秘钥`也行。针对还不熟悉的朋友，这里就带大家使用密钥工具一步步生成密钥，以便让你理解密钥的使用，密钥生成工具的下载可以访问 [密钥工具下载](https://opendocs.alipay.com/common/02kipk)。选择对应系统的应用下载即可。

![密钥工具下载](./images/密钥工具下载.png)

下载完成后，打开密钥生成工具，点击`生成秘钥`。

![](./images/密钥生成界面.png)

密钥生成后，会显示在密钥工具的界面中，也会将密钥信息保存到文件中，界面中显示的密钥内容和文件中的内容都是一样的。

![秘钥生成结果](./images/秘钥生成结果.png)

此时我们可以复制`应用公钥`内容去配置网页中的`沙箱应用`界面的`自定义密钥`。将`应用公钥`复制到`填写应用公钥`的输入框中，点击保存，会自动生成`支付宝公钥`，这就是我们在项目中需要用到的公钥配置信息！

![](./images/应用公钥填写.png)

我在这里展示一下`支付宝公钥`生成结果界面是个什么样子哈~，:warning: 请注意沙箱支付使用的是 `支付宝公钥` 配置信息，不是`应用公钥`哦！

![](./images/支付宝公钥生成结果.png)

### 准备密钥

然后我们就可以在项目下创建一个`keys`目录，来存放密钥相关的文件。密钥需要两个，`应用私钥`  和 `支付宝公钥`。我们在 `keys` 目录下分别创建 `public.key` 和 `private.key` 来保存 `支付宝公钥` 和 `应用私钥` 吧，之后我们会在项目中配置读取这两个文件的内容。:warning: 必须按照下面的格式配置你的密钥信息哦，前后两头都的内容是格式要求，中间是对应的密钥信息，要顶格书写，也就是不要空格，直接将你的秘钥信息复制过来，粘贴在中间即可！

- 支付宝公钥

```txt
-----BEGIN PUBLIC KEY-----
你的支付宝公钥内容
-----END PUBLIC KEY-----
```

- 应用私钥

```txt
-----BEGIN RSA PRIVATE KEY-----
你的应用私钥内容
-----END RSA PRIVATE KEY-----
```

### 设置配置信息

创建一个存放配置信息的`config.py`文件，将下面的配置模板复制到`config.py`文件中。然后在网页 `沙箱应用` 页面，复制你的 `APPID` 的账号，填写在下方的 `ALIPAY_APP_ID` 字段。


```python
# config.py
# 支付宝支付相关配置
import os

BASE_DIR = os.path.dirname(__file__)

ALIPAY_SETTING = {
    'ALIPAY_APP_ID': "9021000133847947",  # APPID(上线之后需要改成，真实应用的appid)
    'APLIPAY_APP_NOTIFY_URL': None,  # 应用回调地址[支付成功以后,支付宝返回结果到哪一个地址下面] 一般这里不写，用下面的回调地址即可
    'ALIPAY_DEBUG': False,
    # APIPAY_GATEWAY="https://openapi.alipay.com/gateway.do"   # 上线后的真实网关
    'APIPAY_GATEWAY': "https://openapi.alipaydev.com/gateway.do",  # 沙盒环境的网关(上线需要进行修改)
    'ALIPAY_RETURN_URL': "http://127.0.0.1:5000/alipay/result/",  # 同步回调地址，用于前端,支付成功之后回调
    'ALIPAY_NOTIFY_URL': "http://127.0.0.1:5000/alipay/result/",  # 异步回调网址，后端使用，post请求，网站未上线，post无法接收到响应内容，付成功之后回调
    'APP_PRIVATE_KEY_STRING': os.path.join(BASE_DIR, 'keys/private.key'),  # 自己生成的私钥，这个就是路径拼接，配置好了，试试能不能点进去
    # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,********
    'ALIPAY_PUBLIC_KEY_STRING': os.path.join(BASE_DIR, 'keys/public.key'),  # 一定要注意，是支付宝给你的公钥，不是你自己生成的那个
    'SIGN_TYPE': "RSA2",  # RSA 或者 RSA2  现在基本上都是用RSA2
}
```

`同步回调地址` 和 `异步回调地址` 改成自己想要支付成功后，支付宝的支付成功界面在网页跳转的地址和支付成功后支付宝向后端服务地址发来的请求。`同步回调地址` 你可以理解为当支付成功了，支付宝的支付页面会在网页上自动跳转到你指定的网页地址。`异步回调地址`你可以理解为在支付成功后，支付宝的服务端会向你指定的你的项目的服务端地址发起`POST`请求，以便触发你的后续业务逻辑处理，在该请求的`url`查询字符串参数中会携带订单处理的相关信息，比如订单号、签名、金额等。

为什么推荐要再做一个`异步回调`验证操作？因为前端回调地址`url`中的查询参数可以被修改，所以不安全。因此最好是在服务端再做一个接收支付成功后支付宝向`异步回调地址`发来的`POST`请求的处理逻辑，支付宝会间隔性地向这个`异步回调地址`发送`8次`请求，直到响应返回了`success`字符串为止。~~~ :warning: 异步回调地址只有在项目上线后才能使用，也就是支付宝需要向你的公网IP发请求，而你本地普通的开发环境网络是无法连接上的。 ~~~

创建一个专门构造支付对象的工具函数，姑且就存放在与`config.py`同级的`utils.py`文件中吧。

```python
# utils.py
from . import config
from alipay import AliPay, DCAliPay, ISVAliPay
from alipay.utils import AliPayConfig
import uuid
from datetime import datetime


# 生成支付alipay对象，以供调用
def create_alipay():
    alipay = AliPay(
        appid=config.ALIPAY_SETTING.get('ALIPAY_APP_ID'),
        app_notify_url=None,  # 默认回调 url
        app_private_key_string=open(config.ALIPAY_SETTING.get('APP_PRIVATE_KEY_STRING')).read(),
        # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
        alipay_public_key_string=open(config.ALIPAY_SETTING.get('ALIPAY_PUBLIC_KEY_STRING')).read(),
        sign_type=config.ALIPAY_SETTING.get('SIGN_TYPE'),  # RSA 或者 RSA2
        debug=config.ALIPAY_SETTING.get('ALIPAY_DEBUG'),  # 默认 False
        verbose=False,  # 输出调试数据
        # config=AliPayConfig(timeout=50)  # 可选，请求超时时间
    )
    return alipay

# 生成唯一订单号
def generate_order_number():
    # 获取当前时间并转换为指定格式的字符串
    current_time = datetime.now().strftime("%Y%m%d%H%M%S")
    # 生成 UUID 并转换为字符串
    unique_id = str(uuid.uuid4().hex)
    # 拼接时间字符串和 UUID 生成订单号
    order_number = f"{current_time}{unique_id}"
    return order_number

```



### 安装依赖

```bash
$ pip3 install python-alipay-sdk --upgrade -i https://pypi.douban.com/simple/
```

### 项目结构

```bash
.
│  app.py
│  config.py
│  utils.py
│  __init__.py
├─keys
│  ├─private.key
│  ├─public.key
└─templates
   ├─order.html
   ├─result.html
```



## 三、Flask 集成沙箱支付

### 视图和业务逻辑

为了演示方便，这里我将业务处理的代码都放在一个文件中了，注释非常详细，希望你能理解。

- `app.py` 业务处理代码

```python
from datetime import datetime
from flask import Flask, render_template, request

from .config import ALIPAY_SETTING
from .utils import create_alipay, generate_order_number

app = Flask(__name__)


@app.route('/order/', methods=['GET', 'POST'])
def create_order():
    # 如果是 GET 请求，返回商品展示页面
    if request.method == 'GET':
        return render_template('order.html')
    # 如果是 POST 请求，那么生成支付路由, 让前端页面来打开生成的支付链接 url
    # 电脑网站支付，需要跳转到：https://openapi.alipay.com/gateway.do? + order_string
    alipay = create_alipay()
    order_string = alipay.api_alipay_trade_page_pay(
        # 这下面的数据，都应该是你数据库的数据，但是我这里做测试，就简单的直接写了
        out_trade_no=generate_order_number(),   # 商品订单号  唯一的
        total_amount=135,                       # 商品价格
        subject='开通季度会员',                    # 商品的名称
        return_url=ALIPAY_SETTING.get('ALIPAY_RETURN_URL'),  # 同步回调网址--用于前端，付成功之后回调
        notify_url=ALIPAY_SETTING.get('ALIPAY_NOTIFY_URL')   # 异步回调网址---后端使用，post请求，网站未上线，post无法接收到响应内容
    )
    # 我这里大概讲一下为什么要有同步/异步，因为同步是前端跳转的地址
    # 如果前端出现页面崩了，那么校验有后端完成
    # 而且在实际开发中，后端一定要校验，因为前端的校验，可被修改
    url = f'https://openapi-sandbox.dl.alipaydev.com/gateway.do?{order_string}'
    return {'url': url, 'status': 1}


@app.route('/alipay/result/')
def payment():
    # 进行校验，因为支付成功之后，后端是不知道是否成功的，所以需要校验一下
    alipay = create_alipay()
    data = request.args.to_dict()  # 把get请求的参数转换成字典
    signature = data.pop("sign")  # 把sign pop出去
    # 验证数据和签名是否有效
    success = alipay.verify(data, signature)  # success是布尔值
    if request.method == "GET":
        if success:
            # 如果成功支付了，这个success是True
            # 接着写逻辑了，比如修改当前订单的状态
            print('支付成功，后台已经校验过了，金币+1', success, data)
            return render_template('result.html', success=success, data=data)
        return '支付失败提示！'
    if success and data["trade_status"] in ("TRADE_SUCCESS", "TRADE_FINISHED"):
        # 支付宝向你指定的后端服务地址发送 POST 请求进行异步回调校验，最后一定要返回一个success
        print('支付成功，后台已经校验过了，金币+1')
        return 'success'    # 返回一个success
    return '支付失败啦！'


if __name__ == '__main__':
    app.run(debug=True)
```



### 页面模板

- `order.html` 模板代码

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>购买商品模拟 - 沙箱支付</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
<div class="goods">
    <img src="https://img0.baidu.com/it/u=2685198448,3471487942&fm=253&fmt=auto?w=1200&h=800" alt="商品">
    <button id="buy">
        去购买
    </button>
</div>

<script>
    $(function () {
        $("#buy").click(function () {
            $.ajax({
                url: '/order/',
                type: 'POST',
                dataType: 'JSON',
                success: function (res) {
                    if (res.status === 1) {
                        // 跳转到后端支付宝返回的支付链接页面
                        location.href = res.url
                    } else {
                        // 前端页面处理失败逻辑
                    }
                }
            })
        })
    })
</script>
</body>
</html>
```

- `result.html`模板代码

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>支付成功页面</title>
</head>
<body>
{% if success %}
    <h1>支付成功页面展示</h1>
    <ul>
        {% for item in data %}
        	<li>{{ item }}: {{ data[item] }}</li>
        {% endfor %}
    </ul>
{% endif %}
</body>
</html>
```



启动服务，流程开始，首先我们访问`http://localhost:5000/order/`会进入到商品展示页面。

![商品购买展示](./images/商品购买展示.png)

点击去购买，此时前端发送`POST`请求给我们的后端接口，进入路由`/order/`的`POST`请求业务逻辑处理，返回构造好的支付页面链接，在前端通过获取响应结果，通过`location.href`打开这个支付页面链接。

![支付宝返回的支付界面](./images/支付宝返回的支付界面.png)

### 扫码支付 or 买家账号密码支付

此时就可以通过支付宝扫码支付，不要担心，这是沙箱支付，与你的支付宝账号的真实支付不是同一个操作，不用担心扣款。你可以理解为沙箱支付的余额就是给你拿来测试玩的，而且还给了你 100 万的余额呢！😂这里你可以选择扫码支付，也可以去支付宝开放平台查看沙箱账号，将`买家账号`填入上方的支付界面的`账户名`输入框中，第二个是提示你输入支付密码，不是登录密码哦。

![查看买家账号](./images/查看买家账号.png)

上一步完成后，此时进入收银台再次输入`支付密码`确认支付，即可完成付款操作。

![支付确认付款界面](./images/支付确认付款界面.png)

付款完成后，界面效果如下。

![支付成功界面](./images/支付成功界面.png)

注意看，支付成功之后，下面它的跳转地址是我们配置的`同步回调地址`，我们在前面说，`同步回调地址`是前端的，现在证实了。另外注意一下，它的参数，你可以在前端页面中做处理，但是不能完全轻信，所以要做 `异步回调地址` 来进一步校验。

**到此，支付全部完成。**

![后端返回的支付成功页面](./images/后端返回的支付成功页面.png)

:warning: 注意事项，`同步回调地址`和`异步回调地址`的配置要与你的路由（或者叫控制器）保持一致，不然无法进行后续的校验处理了。异步回调：当你前端页面崩了以后，支付宝会向该路由，发送`POST`请求，这个是间隔发8次，直到返回`success`字符串为止。在当前示例的 `同步回调地址` 和 `异步回调地址` 我用同一个路由了，当然，你也可以选择用不同的路由，但是必须配置异步回调的路由。

### 真实应用支付配置

1.  修改支付网关，带`dev`的是测试网关

- 修改支付成功拼接的基地址(无dev)

```python
# 电脑网站支付，需要跳转到：https://openapi.alipay.com/gateway.do? + order_string
```


- 修改`settings`配置的支付网关

```python
APIPAY_GATEWAY="https://openapi.alipay.com/gateway.do"   # 使用真实支付网关，这个是需要和支付宝签约的
```


2. 修改`APPID`，修改为真实应用的`APPID`即可

## 四、参考：
- 参考博客：[支付宝支付(沙箱环境&真实支付)使用详解](https://blog.csdn.net/qq_52385631/article/details/122902877)

- SDK说明：[文档地址](https://gitee.com/yqmc/alipay)

- 支付宝开放平台：[官网地址](https://open.alipay.com/develop/manage)


> 🙏 项目搭建测试和内容整理撰写，花费不少时间，创作不易，转载请注明出处，谢谢！