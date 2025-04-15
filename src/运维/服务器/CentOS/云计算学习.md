# 云计算

## 一、Linux 下载与安装

::: tip 推荐：

> `RHEL 下载`：[登陆红帽官网后, 访问该网址跳转到下载镜像界面](https://access.redhat.com/downloads/content/rhel)

> `RHEL8 安装` 参考博客：[教程](https://blog.csdn.net/low5252/article/details/101035853)

:::

## 二、包管理器配置

### RHEL 注册

::: info

> [去官网注册](https://developers.redhat.com/)

:::

### 配置 `yum 官方仓库源`

```bash
# 终端登录红帽子账号
$ subscription-manager register --username=账户名称 --password='账户对应的密码' --auto-attach
# 查看仓库名称
$ yum repolist
# 配置好仓库后，下载安装这个软件，便于后面Linux服务器和本地window电脑进行上传和下载
$ yum install -y lrzsz
```

## 三、远程登录工具

::: info 推荐：

> `XShell`：[去官网下载](https://www.xshell.com/zh/xshell/)

> `Tabby`：[去官网](https://tabby.sh/)

> `WindTerm`(推荐 ⭐)：[去官网下载](https://kingtoolbox.github.io/)

> `Github`(备用 🍭)：[去 github](https://github.com/KingToolBox/WindTerm)

:::

## 四、网络配置

### Linux 三种网络配置的区别

::: tip 提示：

> 参考博客：[NAT 是什么意思？](https://baijiahao.baidu.com/s?id=1726792174464807810)

:::

> - NAT 模式：虚拟机借助物理机转换 IP 地址接入网络
> - 桥接模式：虚拟机直接连接路由器，与物理机是对等地位
> - 仅主机模式：不能联网，只能 ping 通物理机

::: info 说明：

1. 桥接模式相当于把虚拟机变成一台完全独立的计算机，会占用局域网本网段的一个 IP 地址，并且可以和网段内其他终端进行通信，相互访问。（`虚拟机要连接打印机，请使用桥接模式！`）
2. NAT 模式与外界通话需要经过物理机(的 NAT 转换)，不会多占一个局域网 IP，默认情况下外部终端也无法直接访问虚拟机。
3. 仅主机模式不能上网，互联网和局域网都不行，只能与物理机对话。

:::

### 配置网卡的 4 种方式

::: warning 网络故障检查：

> 检查网络管理服务配置和状态：`systemctl status NetworkManager`

:::

> 1. 网卡配置文件（每个人最后的文件的文件名可能有所不同）：`/etc/sysconfig/network-scripts/ifcfg-ens160`
> 2. 图形化配置工具：和 window 一样点击 Linux 桌面窗口上的图标就能进行操作，很简单
> 3. nmtui 伪图形配置工具（依赖 NetworkManager 服务）：`该命令会进入伪图形界面` > `然后选择编辑 Edit xxx 的选项` > `选择 Ethernet`
> 4. nmcli 命令行

### 市面提供的 DNS 服务器

::: info 信息：

> 1. 阿里 DNS 解析服务器：`223.5.5.5`、`223.6.6.6`
> 2. 电信 DNS：`114.114.144.114`
> 3. GoogleDNS：`8.8.8.8`、`8.8.4.4`
> 4. OpenDNS：`208.67.222.222`、`208.67.220.220`
> 5. 激活 web 控制台：`Ctrl + Alt + F4`

:::

### \*命令行的方式配置网络

```bash
$ nmcli device(简写d) help	        # 查看该工具的命令帮助
$ nmcli connection(简写c) help
```

### 网卡配置操作

> :warning: 网卡配置前提：（一定要勾选上，再重启一下）

![](/pictures/linux云计算/网卡配置前置准备.png)

```bash
$ systemctl status NetworkManager		# 查网络管理服务状态
$ systemctl start NetworkManager		# 如果没有启动，就启动它
$ nmcli n on							# 打开网络管理服务开关
$ nmcli d status	# 网卡状态列表
$ nmcli d show		# 显示网卡详情
$ nmcli d show ens160	# 筛选查看具体网卡详情
$ nmcli d disconnect ens160	# 断开网卡连接
$ nmcli d connect ens160	# 连接网卡
```

### 网卡连接的操作

```bash
$ nmcli c show          # 展示连接对象详情
$ nmcli c up ens160	    # 激活网卡连接
$ nmcli c add type ethernet con-name ens160_c1 ifname ens160 ipv4.method auto	# 添加连接
# 添加 类型为ethernet 连接名是ens160_c1	设备是ens160	ipv4连接方式为自动
$ nmcli c up ens160_c1	# 激活连接
$ nmcli d show ens160_c1	# 显示连接详情
# 修改ip地址和子网掩码才能和windows上的255.255.255.0的子网掩码相匹配，XShell中才能连接上
$ nmcli c modify ens160_c1 ipv4.address 192.168.132.20/24
```

### 通过命令修改连接的配置文件

```bash
$ nmcli c edit ens160_c1		 # 进入网络连接配置文件进行编辑配置
$ nmcli>goto address			 # 跳到属性字段
$ nmcli ipv4.address>back		 # 用于返回上一层级
$ nmcli>print					# 打印该层级或字段包含的内容
$ nmcli>?						# 查看nmcli编辑器有哪些命令
```

### `nmcli` 配置静态 IP

```bash
# 一键配置 静态IP地址 并 启用
$ nmcli c add type ethernet con-name "static_conn" ifname ens160 ipv4.addresses 192.168.232.20/24 gw4 192.168.232.2 ipv4.dns "8.8.8.8 114.114.114.114" ipv4.method manual autoconnect yes && nmcli c up static_conn
```

## 五、软件安装

### 软件包分类

::: info 小结：

- 源码包（如 C 语言源码文件）
- 二进制包（如 RPM 包、系统默认包这种已经经过编译的源码包）
- Linux 三种常见软件包的格式：`rpm`、`deb`、`tar.gz`
- 软件包搜索和下载网站：https://www.rpmfind.net/

:::

### rpm 的使用

::: warning 注意：

> 需要自己独立安装并解决依赖问题（有些时候可能比较繁琐）

:::

| 命令          | 解释        |
| ------------- | ----------- |
| rpm -ivh 包名 | 安装 rpm 包 |
| rpm -e 包名   | 卸载 rpm 包 |

> ① 首先查看自己的系统版本

```bash
$ uname -a
```

> ② 下载并安装软件包

```bash
$ rpm -ivh 软件包的下载地址
```

> ③ 查询

```bash
$ rpm -qa | grep 软件包名
```

> ④ 卸载

```bash
$ rpm -e 软件包名
```

### yum 的使用

::: tip 方便：

> yum 自动从指定的服务器下载并自动解决依赖问题（比较方便，只要配置好，后面就一劳永逸很方便）

> yum 仓库（源）配置文件路径：/etc/yum.repos.d/ .repo 结尾

:::

### yum 常用命令和功能解释

| 命令                | 解释                                                        |
| ------------------- | ----------------------------------------------------------- |
| yum install -y 包名 | 下载安装过程中需要询问『yes/no』 的全部问题均自动回答为 yes |
| yum install 包名    | 下载安装过程中，可以手动回复 『yes/no』的咨询               |
| yum remove 包名     | 移除包                                                      |
| yum repolist        | 查看可用的仓库                                              |
| yum localinstall    | 本地 rpm 包安装                                             |
| yum search 软件包名 | 搜索软件包                                                  |
| yum clean all       | 清除 YUM 缓存                                               |
| yum makecache       | 更新 YUM 缓存源                                             |

### 备份镜像源

::: warning 注意：

> 执行仓库源配置之前，推荐备份 YUM 仓库源的所有配置文件，以免后续操作失误可以恢复

> ```bash
> $ mkdir /etc/yum.repos.d/backup		# 先创建一个备份目录
> $ cp /etc/yum.repos.d/*	/etc/yum.repos.d/backup		# 将仓库源配置文件都复制一份到该备份目录中
> ```

:::

### 配置仓库源

> 路径切换到 `/etc/yum.repo.d/` 目录下，然后去官网镜像源列表中找到对应的仓库源配置文件，按照官方的说明下载即可。

::: tip 第三方仓库源：

> 推荐 1：[阿里官方源](https://developer.aliyun.com/mirror/)

:::

::: info 另外：

> 配置完 `阿里官方源` 之后，可以再到阿里云的镜像源列表中找到`epel`下载一个额外提供的 `第三方工具包` 的 `额外仓库源`：EPEL(Extra Packages for Enterprise Linux), 是由 Fedora Special Interest Group 维护的 Enterprise Linux（RHEL、CentOS）中经常用到的包。
>
> ```bash
> $ yum install -y https://mirrors.aliyun.com/epel/epel-release-latest-8.noarch.rpm
> $ yum repolist
> ```

:::

> 手动配置仓库源文件（四步骤）

```bash
$ vim /etc/yum.repo.d/local.repo			# 手动编辑自定义配置仓库源文件
$ yum clean all						# 清除原来的缓存
$ yum makecache						# 制造新的配置缓存
$ yum repolist						# 重新加载仓库列表
```

### 开胃菜

> 上面两个基本的仓库源配置好了之后，就可以下载下面的两个工具来测试一下是否能下载安装包了。

::: code-group

```bash [小火车]
$ yum install -y sl
$ sl                            # 屏幕上会出现一个小火车
```

```bash [黑客代码雨]
$ mkdir /opt/src	# 创建该目录，之后我们将把文件下载到这个目录里
$ cd /opt/src		# 进入该目录
$ pwd				# 查看一下当前路径
$ wget https://jaist.dl.sourceforge.net/project/cmatrix/cmatrix/1.2a/cmatrix-1.2a.tar.gz	# 下载『黑客帝国雨』代码压缩包
$ tar -xzvf cmatrix-1.2a.tar.gz 	# 解压该压缩包
$ ll							  # 可以查看一下当前目录拥有哪些文件
$ cd cmatrix-1.2a/					# 进入该目录
$ ll			   				    # 查看一下有哪些文件
$ vim cmatrix.c						 # 可以打开查看一下该文件内容
$ yum -y install gcc automake autoconf libtool make		# 安装 C语言编译环境
$ yum -y install ncurses-devel		   # 安装依赖
$ ./configure --prefix=/opt/cmatrix		# 有了编译环境之后，对配置文件 configure 指定编译后生成的文件存放的位置，类似于 windows 上指定文件要存放的位置一样
$ make	# 编译
$ make install	# 安装
$ ll /opt/cmatrix/		# 可以看到有个 bin 目录，即我们的编译生成的 可执行文件存放的位置
$ /opt/cmatrix/bin/cmatrix	# 直接运行该可执行文件
```

:::

## 六、Web 应用

### URI 和 URL 的概念

::: info Tip：

- URI 即统一资源定位符（Uniform Resource Identifier）
- URL 即统一资源定位系统（Uniform Resource Locator）

:::

::: tip 两点说明：

1. `URI 范围` > `URL 范围`

   > `URI` 表示的可以是本地资源，比如 C 盘下的某文件的绝对路径，这也叫 `URI`
   >
   > ```bash
   > # 例如下面这种也是囊括在 URI 范围中的
   > file:///E:/Desktop/index.html
   > ```

2. `URL` 一般用于描述浏览器上的网址
   > `[协议类型]://[主机地址]:[端口号]/[资源层级 Unix 文件路径]/[文件名]?[查询字符串]`
   >
   > ```bash
   > # 例如	?表示要 url 中要提交的参数，用 & 连接多个查询参数
   > # 另外，在 http 协议中，默认 80 是主机的端口，URL 写到 主机地址 就表示 80 端口了
   > # 	  在 https 协议中，默认 443 是主机的端口，URL 写到 主机地址 就表示 443 端口了
   > http://127.0.0.1:80/login.html?username=zy&password=123456
   >
   > ```

:::

### 主流 Web 服务器

::: tip 官网列表：

1. `Apache` ：[官网](https://httpd.apache.org/)
2. `Tomcat` ：[官网](https://tomcat.apache.org/)
3. `Nginx` ：[官网](http://nginx.org/)

:::

::: info 说明：

> Apache：世界使用排名第一的 Web 服务器，简单、速度快、性能稳定

> Tomcat：支持最新的 Servlet 2.4 和 JSP 2.0 规范，技术先进、性能稳定，免费，Java 常用

> Nginx：稳定（7 天\*24 小时）、性能高、可用作反向代理服务器

:::

### 安装 Web 服务器

> 以安装 `Nginx` 服务器为例

::: code-group

```bash [nginx 安装]
$ yum install -y nginx		# 安装 Nginx 服务器
$ systemctl status nginx	# 查看 Nginx 服务状态，此时显示未启动的状态
$ systemctl start nginx		# 启动 Nginx 服务
$ systemctl stop firewalld	# 需要关闭防火墙
$                           # 关闭 selinux
$                               # 安全模式：DAC(自主访问控制): 用户权限
$                               # 		  MAC(强制访问控制)：进程权限
$                               # 	临时关闭：setenforce 0
$                               # 	永久关闭：vim /etc/selinux/config
$ ip a					   # 查看本机 ip 地址，然后就可以去浏览器上输入 该ipv4地址 查看该服务器提供的资源了
$ cd /usr/share/nginx/html/		# Nginx 默认的向外提供访问资源的文件目录
$ ll						# 查看一下该目录下有哪些文件
$ rz						# 在 XShell 中，我们可以通过 rz 命令就可以选择上传 windows 上的资源到该目录下，这样我们的windows上开发好的项目就可以部署到本地服务器啦，当然也就可以在 windows 电脑上的浏览器去访问啦
```

:::

### 设置`本地域名 - ip地址解析`

::: info 科普：

> 不知道屏幕前的你是否玩过英雄联盟，如果你玩过英雄联盟，你就知道这种在本地设置『域名 - ip 地址』的技术其实就类似于『英雄联盟皮肤盒子』的效果，只能在本机上用该域名访问，在实际去访问的时候，本地会先对这个访问的域名做一个解析从而得到 IP 地址，再去访问并获得地址对应的资源。下面就介绍怎么配置 『域名 - ip 地址』的映射关系。

:::

::: tip 配置过程：

> （1）在 windows 电脑上，打开 『我的电脑』，找到如下文件：
>
> ```bash
> C:\\Windows\\System32\\drivers\\etc\\hosts
> ```

> （2）因为 windows 不允许直接修改 hosts 文件，所以我们可以先将 hosts 文件复制到桌面上，然后对这个复制出来的文件进行修改，之后再把它粘贴到原来所在的位置进行覆盖即可，这样就间接修改掉这个 hosts 文件啦！
>
> ```bash
> # 在 hosts 文件的最后添加如下内容
>
> # 中间是 windows 本机自己的内容，不用管！！！
>
> # ---------云计算系统管理测试域名解析------------
> # 在最后添加自己 Linux 上用 ip a 命令查看到的 ipv4 地址，后面是自己自定义的域名
> # 配置好『ip地址 - 域名』的映射关系后，就可以保存该文件，然后把它粘贴覆盖到原来所在的位置
> # 在浏览器输入该域名也可以和访问这个 IP 地址一样的效果
> 192.168.232.128     www.zhouyu.com
>
> ```

:::

## 七、服务器配置

### 购买域名

::: warning 提醒：

- 域名 映射 ip
- 域名有一个即可，可创建出一级域名、二级域名
- 这里演示的是 `本地配置`，可以跳过购买公网的域名，等下自定义一个即可

:::

### 本地域名解析配置

#### 作用

::: tip 作用：

> （1）本地解析更快

> （2）节省[DNS]()服务器压力

> （3）自己『本地 Linux 服务器』的 [ip]() 还可以自定义域名来访问！！！

:::

#### 前置配置

::: tip 操作步骤：

```bash
$ systemctl status	nginx	# 查看 nginx 服务的状态
$ systemctl start nginx		# 如果是失活『dead』状态的话，启动 nginx 服务
$ systemctl stop firewalld		# 本次开机中临时关闭防火墙
$ systemctl disable firewalld	# 永久禁用防火墙（下次开机就不用再关闭防火墙服务啦）
$ setenforce 0 		# 临时关闭 selinux 安全模式（SELinux 安全策略在某些时候会限制或阻止外来访问）
$ vim /etc/selinux/config	# 编辑该文件，永久关闭 selinux 安全模式，下次重启时也生效啦
                                # SELINUX=enforcing 修改为 SELINUX=disabled
                                    # SELINUX=disabled——selinux关闭
                                    # SELINUX=enforcing ——selinux开启并设定为强制状态
                                    # SELINUX=permissive ——selinux开启并设定为警告状态
                                    # 注意： selinux开启或关闭需要重启系统才能使设定生效
$ ip a		# 查看一下配置的静态 IP，要是不会配置静态，可以查看前面的『网络配置』章节（把它记下来，等会儿配置宿主主机 windows 上的本地域名需要用到）

```

:::

### 宿主机配置`ip - 域名`映射

::: info 详情：
[去阅读本地`ip-域名`配置](#设置本地域名-ip地址解析)
:::

### Nginx 的`Master-Worker`模式

::: info 扩展：

- 主进程：
  - 管理工作进程
  - 加载配置文件
- 工作进程：[怎么进行数据的交互？（课堂问题）]()
  - 处理具体的请求
  - 互不影响
  - 工作进程退出不影响主进程

:::

### `nginx配置文件`说明

#### 重要命令

```bash
$ tail -f /var/log/nginx/error.log		# 实时刷新文件内容，查看最新日志
$ vim /etc/nginx/nginx.conf				# 配置 nginx 的配置文件
$ ps -ef | grep nginx					# 查看 nginx 进程
$ kill -9								# 杀死进程

$ nginx -t								# 修改完配置文件记得测试一下配置文件是否有『语法或配置错误』
$ nginx -s reload						# 重新加载配置文件

$ mkdir /www && mkdir /www/web			# 这里演示以 /www/web 作为对外资源访问的根路径，当然配置文件配置好了，别忘记创建这个文件目录
$ cp /usr/share/nginx/html/* /www/web	# 配置好之后，可以尝试将原来的 nginx 服务器根路径下的资源全部复制到当前根路径层级下面

```

#### 配置文件内容

::: details 展开代码：

::: code-group

```bash [nginx.conf]
   # 该文件中配置了 『全局块 - 全局参数』
   # -------------------------------------

  user nginx;		# 运行进程使用的用户
  worker_processes auto;	# 工作进程数	推荐和CPU核数一致	auto-自动根据核数适应
  # 错误日志，可以通过后面的命令实时刷新错误日志，查看最新的文件信息 tail -f /var/log/nginx/error.log
  error_log /var/log/nginx/error.log;
  pid /run/nginx.pid;		# 进程ID

  # 引入动态模块
  # Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

  # events 块	网络参数
  events {
      # 连接数
      worker_connections 1024;
}

  # http 块
  http {
      log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
      '$status $body_bytes_sent "$http_referer" '
      '"$http_user_agent" "$http_x_forwarded_for"';

      access_log  /var/log/nginx/access.log  main;

      sendfile            on;
      tcp_nopush          on;
      tcp_nodelay         on;
      keepalive_timeout   65;
      types_hash_max_size 2048;

      include             /etc/nginx/mime.types;
      default_type        application/octet-stream;

      # Load modular configuration files from the /etc/nginx/conf.d directory.
      # See http://nginx.org/en/docs/ngx_core_module.html#include
      # for more information.
      include /etc/nginx/conf.d/*.conf;
      # 定义虚拟主机
      server {
          listen       80 default_server;				# 定义监听的端口号
          # listen       [::]:80 default_server;		# ipv6的端口配置

          # server_name  _;							# 域名	_ 表示所有
          server_name www.zhangsan.com;				# 自己写一个

          # 网站根路径,这下面的资源对外暴露，可以访问。默认访问根路径，服务器提供的就是 index.html 文件
          # root         /usr/share/nginx/html;
          root			/www/web;

          # Load configuration files for the default server block.
          include /etc/nginx/default.d/*.conf;

          location / {
          }

          error_page 404 /404.html;
              location = /40x.html {
          }

          error_page 500 502 503 504 /50x.html;
              location = /50x.html {
          }
      }
      # 定义第二个虚拟主机
      server{
          listen 80;
          server_name www.lisi.com;
          root /www/web2;
      }
      # ...
  }

```

:::

### 状态码说明

::: warning 提醒：

1. 状态码：<code style="color:orange">404</code>: 找不到文件

2. 状态码：<code style="color:orange">403</code>:

   - 访问的是一个目录，目录下没有任何文件

   - selinux 未关闭（未配置）

     DAC（自主访问控制）：用户权限

     MAC（强制访问控制）：进程权限，对 `普通或root` 用户都一视同仁，都需要配置权限才能访问

:::

### 查找配置文件

> 如果不记得配置文件在哪里了，可以用下面的命令去查找

```bash
# 从根目录层级开始去查找名称为 nginx.conf 的文件
$ find / -name nginx.conf
```

### 服务器域名及子域名配置

::: code-group

```bash [nginx.conf]
# /etc/nginx/nginx.conf
server {
    listen 80;
    server_name "~^www\.\w{1,10}\.com$";		# 正则表达式中有使用到花括号{}，需要在外层用双引号""包裹
    root /www/web4;
}

```

:::

::: warning 注意事项：

- 优先级：精确匹配 > 通配符

- 正则：

  ​ 1、必须以 ~ 开头标识这是一个正则表达式

  ​ 2、正则表达式以 ^ 开始，$ 结束

  ​ 3、域名中 . 要使用反斜杠 \ 转义

  ​ 4、正则表达式中有花括号的话，必须要用双引号引起来

:::

### location 配置项

| 匹配符 | 匹配规则                     | 优先级 |
| ------ | ---------------------------- | ------ |
| =      | 精确匹配                     | 1      |
| ^~     | 以某个字符串开头             | 2      |
| ~      | 区分大小写的正则匹配         | 3      |
| ~\*    | 不区分大小写的正则匹配       | 4      |
| !~     | 区分大小写不匹配的正则       | 5      |
| !~\*   | 不区分大小写不匹配的正则     | 6      |
| /      | 通用匹配，任何请求都会匹配到 | 7      |

::: details location 拥有的属性

::: code-group

```bash [nginx.conf]
server {
        listen 80;
        server_name     www.zhaoliu.com;
        root            /www;
        location = /hello/ {
                #root   /www/zhaoliu/2023/11/20;    # 访问该路径时跳转索要资源的根路径
                #alias /www/zhaoliu/2023/11/20/;	# 把匹配路径更换别名
                #index my.html;						# 指定默认访问路径
        }
    }
```

:::

### 访问有误排错

```bash
# 配置 /etc/nginx/nginx.conf
$ nginx -t					# 测试配置文件是否正确
$ nginx -s reload			# 保存并重新加载配置文件
$ systemctl restart nginx	# 重启nginx服务

# 新开一个窗口，看日志文件
$ tail -f /var/log/nginx/error.log

```

## 八、LNMP 实训

### 一键配置静态 IP

> 提示: 先查看一下自己虚拟机的网段，然后将下面的网关和 IP 地址改成自己的就行了

::: code-group

```bash [nginx]
# 配置第一台服务器的静态IP：该服务安装 Nginx
$ nmcli c add type ethernet con-name "static_conn" ifname ens160 ipv4.addresses 192.168.232.30/24 gw4 192.168.232.2 ipv4.dns "8.8.8.8 114.114.114.114" ipv4.method manual autoconnect yes && nmcli c up static_conn
```

```bash [python]
# 配置第二台服务器的静态IP：该服务器安装 Python
$ nmcli c add type ethernet con-name "static_conn" ifname ens160 ipv4.addresses 192.168.232.40/24 gw4 192.168.232.2 ipv4.dns "8.8.8.8 114.114.114.114" ipv4.method manual autoconnect yes && nmcli c up static_conn
```

```bash [mysql]
# 配置第三台服务器的静态IP：该服务器安装 MySQL
$ nmcli c add type ethernet con-name "static_conn" ifname ens160 ipv4.addresses 192.168.232.50/24 gw4 192.168.232.2 ipv4.dns "8.8.8.8 114.114.114.114" ipv4.method manual autoconnect yes && nmcli c up static_conn
```

:::

### `Nginx` 安装

```bash
$ yum install -y nginx					# 安装 nginx 服务
$ systemctl status nginx				# 查看 nginx 状态：是否启动
$ systemctl start nginx					# 启动 nginx
$ setenforce 0							# 临时关闭 selinux 安全模式
$ getenforce							# 查看 selinux 是否关闭：Enforcing 防御状态，未关闭；Permissive 开放状态，说明关闭安全模式了
$ systemctl stop firewalld				# 临时关闭防火墙
$ systemctl disable --now firewalld		# 永久禁用防火墙，立即生效
$ ls /usr/share/nginx/html/				# 初次安装的 nginx 服务器，资源的默认共享位置是该目录
$ vim /etc/nginx/nginx.conf				# 修改配置文件，进行更加具体的一些设置

$ sudo lsof -i :80						# 查看占用 80 端口的进程
$ sudo kill -9 [PID]							# -9 表示强制杀死该进程，把端口让出来
```

### 内网穿透

> 免费使用的临时的域名：[Ngrok 官网](https://ngrok.com/)，配置好之后，就可以将你的本机映射到公网上，之后就可以进行访问了。

::: code-group

```bash [内网穿透工具安装]
# 配置内网穿透
$ wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.tgz		# 下载并安装Ngrok
$ tar -xvf ngrok-stable-linux-amd64.tgz
$ ./ngrok authtoken YOUR_AUTH_TOKEN												# 设置Ngrok Authtoken，登录账号获取
$ ./ngrok http 80				# 运行Ngrok进行内网穿透，每次运行都是新的域名
# $ nohup ./ngrok http 80 &		# 允许后台持续运行
$ vim /etc/nginx/nginx.conf		# 设置代理服务器，将外网的请求转发到 pythonweb 服务器
# ...
# 配置 nginx.conf
# ...
$ systemctl -t												# 测试配置文件是否正确
$ systemctl -s reload										# 保存并重新加载
$ systemctl status nginx									# 查看 nginx 运行状态

```

```bash [nginx.conf]
server {
    listen  80;
    server_name     178d-42-49-200-209.ngrok-free.app;		# 接收访问的域名，每个人的域名是不同的
    location / {
    	proxy_pass       http://192.168.232.40;				# PythonWeb 服务器地址
    }
}
```

:::

- AuthoToken 获取

![AuthoToken](/pictures/linux云计算/authtoken.png)

### `PythonWeb` 安装

> `红帽 8` 自带 `3.6.x` 版本的解释器，看个人项目的需求是否需要安装更高版本的解释器，如果不是必要安装，可以跳过这一步，更新一下 `pip` 包管理工具就行了.

```bash
# 由于红帽8系统自带Linux的包管理工具，而 YUM 又使用Python开发的，所以可以看看系统的开发者是否内置了 python解释器 和 pip包管理工具
$ python3 --version							# 或 python3 -V 查看是否自带python解释器
$ pip3 --version							# 或 pip3 -V 查看一下系统是否自带
$ python3 -m pip install --upgrade pip		# 更新 pip 工具，从官方下载可能太慢，可以尝试本次使用下面的镜像源来安装
$ sudo python3 -m pip install --upgrade pip -i https://pypi.douban.com/simple/	-U --trusted-host pypi.douban.com	# 从豆瓣安装
$ pip install pip -i https://pypi.tuna.tsinghua.edu.cn/simple/ -U --trusted-host pypi.tuna.tsinghua.edu.cn			# 清华源

```

#### 设置镜像源

```bash
# 这种是修改 /root/.config/pip/pip.conf 文件
$ pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/			# 阿里云镜像
$ pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/			# 清华镜像源
$ pip config set global.index-url https://pypi.douban.com/simple/					# 豆瓣镜像源

# 这种修改的是 /usr/pip.conf 文件
$ pip config set global.index-url --site https://pypi.tuna.tsinghua.edu.cn/simple	# 永久性修改下载源-清华源
$ pip config list																	# 查看pip工具的镜像源

```

#### 下载包

```bash
$ sudo python3 -m pip install flask				# 前面加 sudo，授予 pip 工具 root 用户权限去安装，否则可能会提示说权限不够
$ find / -name "flask"							# 查询这个包在哪里，一般就自动安装在 pip 指定的路径下
$ export FLASK_ENV=development && export FLASK_APP=main.py		# 临时设置环境变量
$ flask run -h '0.0.0.0' -p 80 --reload --debugger				# 启动 flask 项目
$ ps -aux | grep flask 											# 如果不能启动的话，可以查看端口号是否被之前运行的flask项目所占用
$ ps -ef | grep nginx											# 查看属于nginx的进程详情
```

#### 编译安装解释器

::: info 说明：

> 红帽`CentOS8`操作系统自带了 Python 的解释器，可以查看上一章的方法进行查看，如果自带的版本不满足需求的话，那可以自己编译安装对应的 Python 解释器。

> `wget` 下载 python 源码包，源码包下载官网：https://www.python.org/ftp/python/ , 找到对应的源码包版本的目录，进去就有自己需要的版本，比如我们需要的是源码包，那就下载下面的这个 `.tar.xz` 的压缩包就行了, 鼠标放到这个链接上，然后右键复制压缩包的链接粘贴到`wget`命令后面进行下载就行了

:::

![](/pictures/linux云计算/index_of_python.png)

- 下载完成后，开始我们的编译安装吧~

```bash
# 安装过程 记住下面的命令
$ find / -name python		# 查找本地软件的位置
$ yum search python3		# 仓库中搜索该软件，可以接具体版本号

# 下面是正片
# 下载
$ su root					# 要使用 root 权限才可以进行哦，或者普通用户分配了相应的权限
$ openssl version			# 查看 openssl 版本号
$ cd /home/					# 进入该目录
$ yum install -y make gcc patch libffi-devel python3-devel zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel xz-devel		# 安装编译环境需要的依赖
#$ yum search python3 | grep interpreter				  # 查询一下仓库中关于python3的解释器版本
$ wget https://www.python.org/ftp/python/3.9.4/Python-3.9.4.tar.xz		# 下载源码包

# 解压
$ tar -xvf Python-3.9.4.tar.xz						# 解压
$ cd Python-3.9.4/									# 进入该安装包

# 编译、安装
$ mkdir /usr/local/python39						# 创建python-3.9.4版本解释器的安装目录
$ ./configure --prefix=/usr/local/python39 --enable-optimizations		# 设置安装目录、优化编译配置
$ make && make install							# 编译 & 安装
# Successfully installed pip-20.2.3 setuptools-49.2.1	# 提示安装完成

```

- 建立软链接 (方便大家去了解配置的过程)

> 类似于 window 中配置环境变量，方便我们在终端的任何地方直接调用 python 解释器执行相关命令。

```bash
# 配置软连接
$ cd /usr/local/python39/							# 进入解释器要安装的目录
$ ls												# 该目录下有对应的python解释器的目录、库的目录等
$ cd bin/											# 进入放置解释器启动的可执行文件的目录

# 如果系统自带了Python解释器的同学，可以看一下自己配置软链接之前的Python解释器版本和pip包管理工具的版本
$ python3 -V										# 查看 python解释器 版本
# Python 3.6.8
$ pip3 -V											# 查看 pip包管理工具 版本
# pip 21.3.1 from /usr/local/lib/python3.6/site-packages/pip (python 3.6)

$ ./python3.9 -V	# 再查看一下安装的解释器的版本，注意：我们现在在python安装目录的bin目录下才能以相对路径的方式查看，而不能直接使用 python3 这样的方式调用
# Python 3.9.4
$ ./pip3 -V
# pip 20.2.3 from /usr/local/python-3.9.4/lib/python3.9/site-packages/pip (python 3.9)

# 建立快捷方式-软链接之后，就可以在任何地方使用 python3 启动刚刚安装的python版本的解释器了，我们开始建立软链接吧~ Go~~~
$ rm -rf /usr/bin/python3							# 删除原来建立好的软链接
# -s 参数表示建立软链接，就和window桌面上的图标一样可以直接链接到安装目录中的那个 .exe 可执行文件，也就是window桌面的快捷启动图标
$ ln -s /usr/local/python39/bin/python3.9 /usr/bin/python3	# 为刚刚安装的解释器建立新的软链接，名字可以自定义。
$ python3 -V
# Python 3.9.4

$ rm -rf /usr/bin/pip3								# 删除 pip 的软链接
$ rm -rf /usr/local/bin/pip3						# 除了全局命令/usr/bin/中，本地/usr/local/bin 目录中还有一个 pip3 的软链接
$ find / -name pip3									# 查看 pip3 在哪些位置
$ ln -s /usr/local/python39/bin/pip3 /usr/local/bin/pip3	# 创建软链接
$ ln -s /usr/local/python39/bin/pip3 /usr/bin/pip3			# 再创建一个 /usr/bin/ 目录下的 pip3 的软链接
$ pip3 -V											# 建立完成 - 查看一下版本号，显示该pip工具对应的是python3.9那个解释器
# pip 20.2.3 from /usr/local/python-3.9.4/lib/python3.9/site-packages/pip (python 3.9)

```

- 一键完成软链接删除和建立（一步到位）

> 复制粘贴该命令运行，该命令将完成`删除python、pip的符合链接`，然后为新安装的 python 解释器和 pip 工具建立叫`python、pip`的软链接。

```bash
$ rm -rf /usr/bin/python /usr/bin/pip /usr/local/bin/pip && \
ln -s /usr/local/python39/bin/python3 /usr/bin/python && \
ln -s /usr/local/python39/bin/pip3 /usr/bin/pip && \
ln -s /usr/local/python39/bin/pip3 /usr/local/bin/pip

```

#### 更新 pip 包管理工具

> 看清楚自己为 pip 建立的软链接名称是 pip 还是 pip3，上面`建立软链接的过程中`我为`pip`建立的软链接叫`pip3`

```bash
$ mkdir ~/.pip				# 建立下载源配置文件放置的目录
$ vim ~/.pip/pip.conf		# 配置下载源
# 将下面的配置内容配置进去
[global]
# index-url =  http://mirrors.aliyun.com/pypi/simple/		# 阿里云镜像
index-url =  https://pypi.tuna.tsinghua.edu.cn/simple		# 清华源镜像
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn

$ python -m pip install --upgrade pip		# 更新包管理工具

```

#### 虚拟环境的下载和配置

```bash
$ pip install virtualenv virtualenvwrapper			# 虚拟环境安装包、虚拟环境管理工具
$ ln -s /usr/local/python39/bin/virtualenvwrapper.sh /usr/local/bin/virtualenvwrapper.sh	# 为管理器创建软链接快捷方式
$ ln -s /usr/local/python39/bin/virtualenv /usr/local/bin/virtualenv	# 为 virtualenv 虚拟环境安装工具创建软链接到本地命令文件中去

$ cd ~ && mkdir ~/.virtualenvs				# 进入主目录，并创建虚拟环境管理目录
$ vim ~/.bashrc								# 编辑该配置文件
# 添加如下命令
export WORKON_HOME=$HOME/.virtualenvs		# 定义环境变量和虚拟环境统一保存路径

export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python		# 项目启动，默认使用的解释器,这里我们已经设置过python是python3.9解释器的软链接了，当然也可以指向解释器所在的具体位置

source /usr/local/bin/virtualenvwrapper.sh	# 我们上面已经为它在/usr/local/bin/目录中创建了软链接，这里就可以直接激活虚拟环境管理工具

$ source ~/.bashrc										# 执行一下该脚本，让里面的配置生效
```

::: info 说明：

> 当我们使用 `mkvirtualenv -p python3.8 虚拟环境名称` 去创建虚拟环境时，虚拟环境管理器就会调用 bin 目录中的命令 `virtualenv` 虚拟环境安装工具去为我们创建虚拟环境，并且记录下它的位置，以后我们需要删除该虚拟环境的话，只需要调用 `rmvirtualenv 虚拟环境名称`

> `.bashrc`是 home 目录下的一个 shell 文件，用于储存用户的个性化设置。在 bash 每次启动时都会加载`.bashrc`文件中的内容，并根据内容定制当前 bash 的配置和环境。

- **补充**： `.bash_profile`和`.bashrc`的区别 ?

> 两者在登陆 bash 时都会被 bash 执行，但是`.bash_profile`只在会话开始时被读取，而`.bashrc`在每次打开新的终端时都会被读取。

​ 推荐：[参考文献](https://blog.csdn.net/Heyyellman/article/details/111565781)

:::

#### 虚拟环境管理工具用法

```bash
$ workon --help		# 查看虚拟环境管理工具的使用
$ workon			# 查看所有可用的虚拟环境
$ workon -p python3 虚拟环境名称	# 创建虚拟环境，-p 表示要选择的python解释器版本，虚拟环境名称是自己为虚拟环境定义的名称，python解释器必须是自己已经安装的
$ workon 虚拟环境名称		# 进入某个虚拟环境
$ deactivate			# 前提是已经进入了虚拟环境，执行该命令即可退出虚拟环境
```

#### 一键完成解释器安装配置

> 将下面的脚本复制到任意的 `custom.sh` 文件中，然后 `bash custom.sh` 执行它即可自动完成所有任务。

```sh
#! /bin/bash
cd /home/
yum install -y make gcc patch libffi-devel python3-devel zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel xz-devel
wget https://www.python.org/ftp/python/3.9.4/Python-3.9.4.tar.xz
tar -xvf Python-3.9.4.tar.xz
cd Python-3.9.4/
mkdir /usr/local/python39
./configure --prefix=/usr/local/python39 --enable-optimizations
make && make install
cd /usr/local/python39/bin/
rm -rf /usr/bin/python /usr/bin/pip /usr/local/bin/pip && \
ln -s /usr/local/python39/bin/python3 /usr/bin/python && \
ln -s /usr/local/python39/bin/pip3 /usr/bin/pip && \
ln -s /usr/local/python39/bin/pip3 /usr/local/bin/pip
mkdir ~/.pip
touch ~/.pip/pip.conf
echo "[global]" >> ~/.pip/pip.conf
echo "index-url = https://pypi.tuna.tsinghua.edu.cn/simple" >> ~/.pip/pip.conf
echo "[install]" >> ~/.pip/pip.conf
echo "trusted-host = pypi.tuna.tsinghua.edu.cn" >> ~/.pip/pip.conf
python -m pip install --upgrade pip
pip install virtualenv virtualenvwrapper
ln -s /usr/local/python39/bin/virtualenvwrapper.sh /usr/local/bin/virtualenvwrapper.sh
ln -s /usr/local/python39/bin/virtualenv /usr/local/bin/virtualenv
cd ~ && mkdir ~/.virtualenvs
echo 'export WORKON_HOME=$HOME/.virtualenvs' >> ~/.bashrc
echo 'export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python' >> ~/.bashrc
echo 'source /usr/local/bin/virtualenvwrapper.sh' >> ~/.bashrc
source ~/.bashrc
```

::: warning 提醒：

> 安装完成之后，用 `workon --help` 看是否能查询到帮助，能够查询用法，那说明就安装上了，此时就可以进行虚拟环境的创建了。并且，通过上面的安装，也帮你配置好了 python 和 pip 的指向为刚刚安装的 python 解释器和 pip 工具。

:::

### `MySQL` 安装

#### 下载 yum 源

```bash
$ cd /etc/yum.repos.d/
$ wget https://repo.mysql.com//mysql80-community-release-el8-1.noarch.rpm
```

#### 安装 yum 源

```bash
$ yum -y localinstall mysql80-community-release-el8-1.noarch.rpm
```

#### 安装 MySQL 服务

```bash
$ yum module list mysql					# 查看可用的 mysql 模块
$ yum module disable mysql -y			# 禁用掉模块匹配的检查工具，否则检查到与mysql版本不匹配就不能安装
$ yum install -y mysql-community-server --nogpgcheck	# 安装 mysql 服务，不要使用里面的秘钥检查
# 如果显示：GPG检查失败，执行下面的操作
# vim /etc/yum.repos.d/mysql-community.repo
# 修改 gpgcheck=0
```

#### 启动 MySQL

```bash
$ systemctl start mysqld	# 启动服务
```

#### 查看 MySQL 状态

```bash
$ systemctl status mysqld
```

#### 设置 MySQL 开机自启

```bash
$ systemctl enable --now mysqld			# 本次就要让它立即生效
$ systemctl daemon-reload				# 重新加载一下配置
```

#### 查看 MySQL 密码

```bash
$ grep "password" /var/log/mysqld.log			# 临时密码在 /var/log/mysqld.log 文件中
# 得到的临时密码就可以拿去登录 mysql 了
$ mysql -u root -p 临时密码
mysql>							# 此时进入了 mysql 命令行交互界面
```

#### 修改密码

> mysql 默认必须修改密码后才能操作数据库

```bash
# 修改密码（8.0 MySQL 对密码的强度非常严格，密码策略必须是：大小写字母搭配 + 特殊字符 + 不规则数字 [也就是不能是连续的数字：如123456什么的] 才可以设置成功！）
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'Zhou@yu123';
```

#### 查看密码

::: warning 注意：
密码是加密过的！看了也没意义，哈哈！查看不了原本的密码，我已经尝试过了，网上也看过各种教程，建议别死磕！自己设置的密码就牢记！
:::

```bash
mysql> use mysql;		# 使用这个数据库
mysql> SELECT user, host, CONVERT(authentication_string USING utf8) AS password FROM mysql.user WHERE user = 'root';
```

#### 查看密码策略

```bash
mysql> SHOW VARIABLES LIKE 'validate_password%';
```

#### 修改密码的设置策略

```bash
mysql> set global validate_password.policy=0;				# 将策略设置为 0，这样就可以设置简单密码了
mysql> set global validate_password.special_char_count=0;	# 指定字符数量不设置
mysql> set global validate_password.length=1;				# 设置密码允许的长度
```

#### 重新设置简单密码

```bash
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';		# 重新设置root在本地登入的密码
mysql> flush privileges;											# 刷新权限
```

#### 开放远程登录

- 设置

```bash
mysql> use mysql;
mysql> update user set host='%' where user='root';									# 设置 root 用户可以远程登录
mysql> alter user 'root'@'%' identified with mysql_native_password by '123456';		# 设置 root 远程登录密码
mysql> flush privileges;															# 刷新权限，使生效
mysql> select host,user from user;
```

![](/pictures/linux云计算/开放远程主机访问.png)

- 尝试远程登录

::: tip 提示：

> 自己设置的 IP 地址 + mysql 端口号 3306 + 用户名 + 密码

:::

#### 远程登录不了 ?

::: tip 提示：

> 1. 检查 mysql 服务是否运行
>
> ```bash
> $ ss -ntl							# 常实用、快速、有效的跟踪IP连接和sockets的新工具
> ```

- 效果如下：

![](/pictures/linux云计算/查看服务端口是否启动.png)

> 来源：[参考文献](https://baijiahao.baidu.com/s?id=1722457178512340315)

2. 检查防火墙 和 Linux 安全模式

```bash
$ systemctl stop firewalld						# 临时关闭防火墙
$ systemctl disable --now firewalld 			# 永久禁用防火墙，立即生效
$ systemctl status firewalld					# 查看防火墙服务是否关闭
# 接着下面的操作
$ setenforce 0									# 临时关闭 selinux 安全模式
$ getenforce									# 查看安全模式是否关闭
$ vim /etc/selinux/config						# 设置 SELINUX=disabled	永久禁用
```

![](/pictures/linux云计算/关闭防火墙和安全模式.png)

:::

#### 忘记密码 ?

> 密码是无法查看的，因为是加密过的，所以如果忘记了密码建议直接重新设置吧！

- 修改配置文件

```bash
$ systemctl stop mysqld		# 停止 mysql 服务
$ vim /etc/my.cnf			# 在末尾添加如下内容,就能跳过验证直接登录
# ...
skip-grant-tables

$ systemctl start mysql		# 启动 mysql 服务
$ mysql						# 直接就能登录数据库交互界面

```

- 查看 `mysql.user` 信息表

```bash
mysql> use mysql;												# 使用该数据库
mysql> select host, user, authentication_string from user;		# 查看用户信息
```

- 清空 root 用户的密码

```bash
mysql> update user set authentication_string='' where user='root';
```

- 刷新权限

```bash
mysql> flush privileges;
```

- 重置 root 用户密码

```bash
mysql> alter user 'root'@'%' identified by '123456';	# 设置远程登录的密码，下面的是设置本机上的登录密码
mysql> alter user 'root'@'localhost' identified by 'Zhou@yu123';	# mysql8.0 密码安全策略：需要大小写字母+特殊字符+不规则数字组合才能设置成功！
```

- 退出 MySQL, 使用设置好的密码重新登陆即可！

## 九、处理 `zip` 压缩资源

```bash
$ yum install -y zip unzip			# 安装解压 zip 压缩资源处理程序
# zip
$ zip -r filename.zip dirname		# 将某个目录打包成 zip 文件
$ zip -r filename.zip abc 123.txt	# 将 abc 目录和 123.txt 文件 一起打包成zip文件

# unzip
$ unzip filename.zip -d pathname	# 将当前的 zip 压缩文件解压到指定路径；不指定解压后资源放置的路径，默认放到当前目录
$ unzip -l filename.zip				# 列出zip文件中的内容列表，但不解压文件
$ unzip -o filename.zip				# 覆盖已存在的文件,默认解压到当前目录
$ unzip -q filename.zip				# 安静模式，不显示解压过程中的输出信息
```

## 学习资源

::: tip 资料：

> 推荐 1：[Linux 命令搜索](https://jaywcjlove.gitee.io/linux-command/)

> 推荐 2：[鸟哥的 Linux 私房菜](https://wizardforcel.gitbooks.io/vbird-linux-basic-4e/content/44.html)

:::

## 如何选择开源协议 ?

::: info 科普：

- 普通开发者

> 如果你是信仰开源大法的普通开发者，使用 MIT License 协议即可，它会保留你的版权信息，又允许他人进行修改。

- 用到了 GNU 的开发者

> 如果你用到了 GNU 的库，由于“传染性”，不允许更换协议，必须选择 GNU 相关的协议。

- 开源库开发者

> 推荐使用 GNU LGPL 相关协议。

- 无私奉献的雷锋

> 感谢你为世界作出的贡献，必选 The Unlicense。

- 不知道该选什么

> 选择默认的 None 即可，保留你的全部权利，后续再去决定要不要更换协议

:::
