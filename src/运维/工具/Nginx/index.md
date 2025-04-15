# 前置条件

## 配置静态 IP

```bash
# 一键配置 静态IP地址 并 启用
nmcli c add type ethernet con-name "static_conn" ifname ens160 ipv4.addresses 192.168.232.20/24 gw4 192.168.232.2 ipv4.dns "8.8.8.8 114.114.114.114" ipv4.method manual autoconnect yes && nmcli c up static_conn
```

## 关闭防火墙

```bash
$ systemctl stop firewalld      # 本次开机关闭防火墙（重新开机防火墙又会启动）
$ systemctl disable firewalld   # 永久禁用防火墙（以后不会再自动启动了）

$ systemctl enable firewalld    # 开机自启（解开禁止启用）
$ systemctl start firewalld     # 本次立即启动防火墙
```

## 关闭 SELinux 安全策略

```bash
$ setenforce 0      # 临时关闭安全策略
$ getenforce        # 查看当前 selinux 状态(enforcing 表示防御状态，Permission表示允许，disabled 表示关闭状态)
$ sed -i 's/^SELINUX=enforcing$/SELINUX=disabled/' /etc/selinux/config      # 永久关闭安全策略
```

## 网络配置

> - 路径: `/etc/sysconfig/network-scripts/ifcfg-ens33`
> - 使用上面的`一键配置静态IP`的方式更方便

```txt
TYPE=Ethernet       # 网卡类型，指明该配置对应的是以太网接口
PROXY_METHOD=none   # 代理方法设置，none 表示不使用代理
BROWSER_ONLY=no     # 是否仅为浏览器配置网络，no 表示否，对所有应用生效
BOOTPROTO=static    # IP地址分配方式，static表示使用静态IP地址，其他可选值包括dhcp（动态分配）和none
DEFROUTE=yes        # 是否作为默认路由，默认yes，意味着此设备可用作到达其他网络的路由
IPV4_FAILURE_FATAL=yes # IPv4配置失败是否致命，yes表示是，即IPv4配置失败会导致网络服务启动失败
IPV6INIT=yes         # 是否启用IPv6初始化，yes表示启用
IPV6_AUTOCONF=yes   # 是否启用IPv6自动配置，yes表示启用
IPV6_DEFROUTE=yes    # 是否将该设备作为IPv6默认路由，默认yes
IPV6_FAILURE_FATAL=no # IPv6配置失败是否致命，no表示否，即使IPv6配置失败也不会阻止网络服务启动
IPV6_ADDR_GEN_MODE=stable-privacy # IPv6地址生成模式，stable-privacy表示生成稳定且具有隐私保护的地址
NAME=ens33          # 网络接口名称
UUID=10ac735e-0b8f-4b19-9747-ff28b58a1547 # 唯一标识符，用于唯一标示该网络接口配置
DEVICE=ens33        # 指定物理设备名称，与NAME字段相同，进一步确认配置的设备
ONBOOT=yes           # 系统启动时是否激活此网络接口，yes表示系统启动时自动启用该网卡
IPADDR=192.168.232.20 # 指定了使用静态IP后，就要在这里指定该字段自己分配一个静态IP地址
NETMASK=255.255.255.0 # 指定子网掩码
GATEWAY=192.168.232.2 # 指定网关
DNS1=8.8.8.8        # 指定DNS服务器
```

> - 编辑完成并保存后, 使用命令`systemctl restart network`重启网络服务

## Nginx 服务器配置

:::tip 推荐教程

- 20 分钟搞懂`Nginx`核心知识：[技术蛋老师讲解 Nginx](https://www.bilibili.com/video/BV1TZ421b7SD/)
- 参考资料：[前往 Nginx 官方文档](https://docs.nginx.com/nginx/admin-guide/web-server/)
  :::

## `Nginx` 工作原理图

![工作原理图](/pictures/Web服务器/nginx服务工作原理.png)

## 安装

> 本机安装`nginx`基于`红帽 Centos 7.6` 版本

```bash
$ yum -y install nginx
```

## nginx 常用命令

```bash
$ systemctl start nginx     # 启动nginx
$ systemctl status nginx    # 查看nginx状态
$ systemctl restart nginx   # 重启nginx
$ nginx -s stop             # 快速停止nginx
$ nginx -s quit             # 优雅关闭nginx，在退出前完成已经接收的连接请求
$ ngixn -t                  # 测试配置是否有效
$ nginx -s reload           # 重新加载配置文件
$ nginx -t && nginx -s reload # 每次对配置文件进行修改后，需要重新加载配置文件才能生效
```

## 查看 nginx 进程

```bash
$ ps -ef | grep nginx                           # 查看所有的nginx进程
$ ps -aux | grep "nginx: master process"        # 查看nginx主进程
$ kill -9 <pid>                                 # 强制杀死进程
$ systemctl start nginx                         # 等待半分钟后再启动，遇到的一些问题基本上就能解决
$ systemctl daemon-reload                       # 重新加载系统服务配置
```

## 配置文件

::: tip 说明：

- 通过 `yum install` 安装的 `nginx` 的默认配置如下：
- `nginx`配置文件路径: `/etc/nginx/nginx.conf`
- `nginx`默认配置的对外共享资源路径：`/usr/share/nginx/html/`
- `nginx错误请求日志文件`: `cat /var/log/nginx/error.log`
- `nginx成功请求日志文件`: `/var/log/nginx/access.log` 记录了所有成功的请求日志
- 通过`tail -f /var/log/nginx/error.log` 命令实时刷新查看错误日志文件

:::

## 本地域名解析

> 在 `C:\\Windows\\System32\\drivers\\etc\\hosts` 文件中追加自己想要解析的`IP地址`和`域名`关系。(也就是追加你本地的`ip 和 域名`对应关系，当在浏览器访问时，首先从本地看该域名是否有对应的`ip地址`，有的话就会想本地解析出来的`ip地址`发起资源访问。没有的话就向`DNS`服务器发起请求，请求到对应的`ip地址`，再向该`ip地址`发起资源访问。)

```txt
# other settings

192.168.40.20	nginx.zhouyu2156.com
```

## `DNS` 域名解析

> - 利用云解析`DNS服务器`的方式来解析我们本地的`服务器IP`也行，添加一条记录将`域名`指向我们的本地的`服务器IP`。

![dns解析本地服务器ip](/pictures/Web服务器/dns解析本地服务器ip.png)

## 核心配置

::: code-group

```md [nginx.conf]
events {

# event 是用来告诉 nginx 如何处理连接的，可以为空，但不能没有

}
http {

# 这个块记录 http 服务配置

include /etc/nginx/mime.types; # 引入 mime 类型配置文件(这个记录了告诉客户端每种后缀的资源解析(渲染)方式)

include /etc/nginx/conf.d/\*.conf; # 引入其他配置文件, 这里引入了我自定义的 default.conf 文件
}
```

```md [default.conf]
server {

# 这个块记录服务器配置

listen 80; # 监听外部访问的端口
server_name localhost; # 配置匹配外部请求时的域名

root /app/dist/; # 返回的静态资源根目录
index index.html; # 指定默认返回的首页文件, 可以是其他文件名
}
```

:::

::: warning 注意事项：

- 在`server`块下直接定义的`root`表示所有请求默认寻找资源的根路径。
- `location` 块中定义的`root`表示匹配某个特殊请求路径时寻找资源的根路径。
  :::

- 可以通过`server`块的`return`指令返回自定义内容

```md
server {
listen 80;
server_name localhost;

# 格式: return 状态码 消息;

return 200 "this is return directive message.\n";
}
```

## `server_name` 块配置

支持的配置方式

- 完整匹配

```md
server_name zhouyu2156.cn www.zhouyu2156.cn; # 支持配置多个，以空格分隔开每个域名
```

- 通配符匹配

```md
server_name \*.zhouyu2156.cn;
```

- 通配符结束匹配

```md
server_name zhouyu2156.\*;
```

- 正则匹配

```md
server_name ~^www\.zhouyu2156\.com$; # 使用正则表达式的语法来匹配符合规则的所有域名
```

## `location` 块配置

::: warning 注意事项：

- （1）请求方式一： `/path` 表示访问的是 `/path` 路径对应的文件，也就是访问路径末尾不带`/`表示访问的是一个具体的文件
- （2）请求方式二： `/path/` 表示访问的是 `/path/` 路径对应的默认返回文件，也就是访问路径末尾带`/`表示访问的是一个目录，而目录是不会直接返回给你的，只能返回一个默认的文件资源咯。

:::

- 🍍`(模糊匹配)`指定匹配具有某段字符开头的请求
  ::: tip
- 以路径模糊匹配的方式来访问资源，这个可以让我们在浏览器访问时，只要请求路径中的开头部分至少有了`location` 后面定义的一段开头字符，就会匹配成功。比如我们的`location`定义为`/app`，那么用户可以成功访问至少以`/app`字符开头的所有请求，比如`/apple/`、`/app/Programming`等，只要后面的资源路径能够与`root`指令中的路径拼接成功，都会返回资源。

:::

- 示例：
  ::: info 解释：

  > 下面这段代码，首先假设我们有个资源的路径资源`/app/apple/Prgramming/index.html`

- 当我们在浏览器访问`/apple/Programming`路径时，那么`location`模糊匹配到了`/app`开头的请求，因为请求路径是`/apple/Programming`嘛
- 接着会进入`location`块中，将`location`块的`root`指令中的资源路径与请求路径进行拼接，得到`/app/apple/Programming`，当发现末尾没有`/`结尾，说明是要返回一个文件资源，经过查找没有`Programming`这个文件资源，那么会尝试加一个`/`重定向一下找`/.../Programming/`资源，这是在请求一个`/xxx/Programming/`下的默认文件资源，没有设置默认返回文件资源的话，那么就是返回该目录下的`index.html`文件。
- 所以，模糊匹配是只要`请求路径`中具有我们`location`中写的一段开头的匹配字符，就会匹配成功进入`location`块中处理。
  :::

```md
server {
listen 80;
server_name localhost;

root /app/dist/;
index index.html;
location /app {
root /app/;
}
}
```

- 🍒`(绝对匹配)`指定完整路径匹配
  ::: tip 说明
- 只有`请求路径`**完全等于** `/Programming/` 时才能与`location`后面的路径匹配上，从而再拼接`location`块的`root`指令对应的路径获取资源返回给用户。
  :::

```md
server {
listen 80;
server_name localhost;

root /app/dist/;
index index.html;
location = /Programming/ {
root /app/;
}
}
```

- 🍊`(正则匹配)`使用正则表达式匹配请求路径
  ::: tip 说明
- 在`location`块后面使用`~`来启用正则表达匹配。
- 在`~`后面添加`*`表示忽略大小写。
  :::

- 示例：

```md
server { # ...
location ~\* /video/video[0-9].mp4 {
root /app/; # 返回 /app/video/video[0-9].mp4 所有资源。
}
}
```

## 匹配优先级表

- 总共分为四大类：`模糊匹配`、`精确匹配`、`优先前缀`、`正则匹配`

| 匹配符 |                匹配规则                | 优先级 |
| :----: | :------------------------------------: | :----: |
|  `=`   |                精确匹配                |   1    |
|  `^~`  |       以某个字符串开头(优先前缀)       |   2    |
|  `~`   |          区分大小写的正则匹配          |   3    |
|  `~*`  |         不区分大小写的正则匹配         |   4    |
|  `!~`  |         区分大小写不匹配的正则         |   5    |
| `!~*`  |        不区分大小写不匹配的正则        |   6    |
|  `/`   | 通用匹配(模糊匹配)，任何请求都会匹配到 |   7    |

## 重定向 `307`

- 将用户请求重定向到新的路径资源，但是这种重定向方式，用户是可以察觉的，也就是先将请求状态码和请求资源路径返回给客户端，然后客户端会自动进行新的跳转。

```md
server {

    # ...
    location /temp {
        return 307 /temp/tmp.html;  # 状态码 新的资源路径
    }

}
```

## 重写路径

- 通过`rewrite`指令可以更丝滑的重定向用户请求到新的路径资源。也就是在服务器端改写请求的资源获取路径。
- 改写后的资源路径会拼接上`location`块的`root`指令中的资源路径。如果没有，那么就以`loaction / {}`中定义的`root`为基础路径进行拼接。比如下面的配置，当我们访问`http://域名/tmp`最终就会返回`/app/Programming/index.html`资源

```md
server { # ...
rewrite /tmp /Programming/index.html;
location / {
root /app/;
}
}
```

## 使用`try_files`指令尝试匹配资源

```md
server {

# ...

location / {
add_header X-debug-uri "$uri"; # add_header 指令用于增加自定义响应首部
try_files $uri $uri/ =404; # 尝试匹配用户访问的路径资源，失败的话就再尝试匹配末尾加`/`目录下的资源，如果还是失败的话就返回 404。
}
}
```

## 返回自定义错误页面

- 通过 `error_page` 指令可以返回自定义的错误页面。

```md
server {

# ...

error_page 404 /app/dist/404.html;
}
```

## 反向代理

- 通过`proxy_pass`字段定义反向代理的服务器信息。

```md
server {

# ...

location / {
proxy_pass 192.168.40.20:3001; # 定义单个反向代理的服务器 # proxy_pass http://192.168.40.20:3001; # 两者都行，加不加 http 没有关系
}
}
```

## 定义多台反向代理的服务器

- 通过`upstream`指令定义反向代理的服务器集群。告诉`nginx`把客户端的请求流量导到指定的服务器集群，再通过负载均衡分配到集群里面的服务器。
- 因为现实中服务器的性能配置可能不太一样，因此我们就必须把更多的流量分配给高配置的服务器，低配的服务器则分担少一点的流量。此时我们就可以设置`weight`，并且自定义数值表示服务器的权重。`weight`数值相对越大，被分配到的次数就会相对越多。

```nginx
upstream backend-servers {
server localhost:3000 weight=2;
server localhost:3001 weight=6;

# 定义反向代理的服务器集群...

}

server {

# ...

location /serve {
    proxy_pass http://backend-servers; # 定义了 upstream 后，可以通过 upstream 名称来定义反向代理的服务器集群
  }
}
```
