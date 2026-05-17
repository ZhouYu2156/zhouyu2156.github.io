# Linux 安装运行环境

## 安装基础工具

```bash
$ yum install -y make gcc patch libffi-devel python3-devel zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel xz-devel lrzsz tree zip unzip
```

## 1、安装 nginx

### (1)安装 nginx

```bash
$ yum install -y nginx
```

### (2)配置 `/etc/nginx/nginx.conf`

- 开放静态资源
- 配置反向代理
- ...

### (3)验证配置有效性

```bash
$ nginx -t						# 修改完配置文件记得测试一下配置文件是否有『语法或配置错误』
$ nginx -s reload				# 重新加载配置
$ systemctl restart nginx		# 重启 nginx服务
```

## 2、安装 nodejs

> 推荐： [参考官网](https://nodejs.org/)

### (1)下载包管理工具

```bash
# installs NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

### (2)重新加载用户配置文件

```bash
[root@bestrivenna packages]# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 16555  100 16555    0     0  10653      0  0:00:01  0:00:01 --:--:-- 10646
=> Downloading nvm as script to '/root/.nvm'

=> Appending nvm source string to /root/.bashrc
=> Appending bash_completion source string to /root/.bashrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# 出现上面的提示信息后，表示安装完成，此时执行下面的命令，重新加载用户的配置文件, 我这里写个 $ 符号，表示后面的是一条命令
$ source /root/.bashrc
```

### (3)利用包管理工具安装 nodejs

```bash
# download and install Node.js
nvm install 20
```

### (4)查看版本，检查是否安装完成

```bash
# verifies the right Node.js version is in the environment
node -v # should print `v20.13.1`
```

### (5)检查 npm 包管理工具的版本

```bash
# verifies the right NPM version is in the environment
npm -v # should print `10.5.2`
```

## 3、安装 python

> `红帽 8` 自带 `3.6.x` 版本的解释器，看个人项目的需求是否需要安装更高版本的解释器，如果不是必要安装，可以跳过这一步，更新一下 `pip` 包管理工具就行了.

```bash
# 由于红帽8系统自带Linux的包管理工具，而 YUM 又使用Python开发的，所以可以看看系统的开发者是否内置了 python解释器 和 pip包管理工具
$ python3 --version							# 或 python3 -V 查看是否自带python解释器
$ pip3 --version							# 或 pip3 -V 查看一下系统是否自带
$ python3 -m pip install --upgrade pip		# 更新 pip 工具，从官方下载可能太慢，可以尝试本次使用下面的镜像源来安装
$ sudo python3 -m pip install --upgrade pip -i https://pypi.douban.com/simple/	-U --trusted-host pypi.douban.com	# 从豆瓣安装
$ pip install pip -i https://pypi.tuna.tsinghua.edu.cn/simple/ -U --trusted-host pypi.tuna.tsinghua.edu.cn			# 清华源

```

### 设置镜像源

```bash
# 这种是修改 /root/.config/pip/pip.conf 文件
$ pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/			# 阿里云镜像
$ pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/			# 清华镜像源
$ pip config set global.index-url https://pypi.douban.com/simple/					# 豆瓣镜像源

# 这种修改的是 /usr/pip.conf 文件
$ pip config set global.index-url --site https://pypi.tuna.tsinghua.edu.cn/simple	# 永久性修改下载源-清华源
$ pip config list																	# 查看pip工具的镜像源

```

### 下载包

```bash
$ sudo python3 -m pip install flask				# 前面加 sudo，授予 pip 工具 root 用户权限去安装，否则可能会提示说权限不够
$ find / -name "flask"							# 查询这个包在哪里，一般就自动安装在 pip 指定的路径下
$ export FLASK_ENV=development && export FLASK_APP=main.py		# 临时设置环境变量
$ flask run -h '0.0.0.0' -p 80 --reload --debugger				# 启动 flask 项目
$ ps -aux | grep flask 											# 如果不能启动的话，可以查看端口号是否被之前运行的flask项目所占用
$ ps -ef | grep nginx											# 查看属于nginx的进程详情
```

### 编译安装解释器

> 红帽`CentOS8`操作系统自带了 Python 的解释器，可以查看上一章的方法进行查看，如果自带的版本不满足需求的话，那可以自己编译安装对应的 Python 解释器。

> `wget` 下载 python 源码包，源码包下载官网：https://www.python.org/ftp/python/ , 找到对应的源码包版本的目录，进去就有自己需要的版本，比如我们需要的是源码包，那就下载下面的这个 `.tar.xz` 的压缩包就行了, 鼠标放到这个链接上，然后右键复制压缩包的链接粘贴到`wget`命令后面进行下载就行了

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

### 更新 pip 包管理工具

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

### 虚拟环境的下载和配置

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

> 当我们使用 `mkvirtualenv -p python3.8 虚拟环境名称` 去创建虚拟环境时，虚拟环境管理器就会调用 bin 目录中的命令 `virtualenv` 虚拟环境安装工具去为我们创建虚拟环境，并且记录下它的位置，以后我们需要删除该虚拟环境的话，只需要调用 `rmvirtualenv 虚拟环境名称`

> `.bashrc`是 home 目录下的一个 shell 文件，用于储存用户的个性化设置。在 bash 每次启动时都会加载`.bashrc`文件中的内容，并根据内容定制当前 bash 的配置和环境。

- **补充**： `.bash_profile`和`.bashrc`的区别 ?

> 两者在登陆 bash 时都会被 bash 执行，但是`.bash_profile`只在会话开始时被读取，而`.bashrc`在每次打开新的终端时都会被读取。

推荐：[参考文献](https://blog.csdn.net/Heyyellman/article/details/111565781)

### 虚拟环境管理工具用法

```bash
$ workon --help		# 查看虚拟环境管理工具的使用
$ workon			# 查看所有可用的虚拟环境
$ workon -p python3 虚拟环境名称	# 创建虚拟环境，-p 表示要选择的python解释器版本，虚拟环境名称是自己为虚拟环境定义的名称，python解释器必须是自己已经安装的
$ workon 虚拟环境名称		# 进入某个虚拟环境
$ deactivate			# 前提是已经进入了虚拟环境，执行该命令即可退出虚拟环境
```

### 一键完成解释器安装配置

> 将下面的脚本复制到任意的 `script.sh` 文件中，然后 `bash script.sh` 执行它即可自动完成所有任务。

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

> 安装完成之后，用 `workon --help` 看是否能查询到帮助，能够查询用法，那说明就安装上了，此时就可以进行虚拟环境的创建了。并且，通过上面的安装，也帮你配置好了 python 和 pip 的指向为刚刚安装的 python 解释器和 pip 工具。

## 4、安装 MySQL

### 下载 yum 源

```bash
$ cd /etc/yum.repos.d/
$ wget https://repo.mysql.com//mysql80-community-release-el8-1.noarch.rpm
```

### 安装 yum 源

```bash
$ yum -y localinstall mysql80-community-release-el8-1.noarch.rpm
```

### 安装 MySQL 服务

```bash
$ yum module list mysql					# 查看可用的 mysql 模块
$ yum module disable mysql -y			# 禁用掉模块匹配的检查工具，否则检查到与mysql版本不匹配就不能安装
$ yum install -y mysql-community-server --nogpgcheck	# 安装 mysql 服务，不要使用里面的秘钥检查
# 如果显示：GPG检查失败，执行下面的操作
# vim /etc/yum.repos.d/mysql-community.repo
# 修改 gpgcheck=0
```

### 启动 MySQL

```bash
$ systemctl start mysqld	# 启动服务
```

### 查看 MySQL 状态

```bash
$ systemctl status mysqld
```

### 设置 MySQL 开机自启

```bash
$ systemctl enable --now mysqld			# 本次就要让它立即生效
$ systemctl daemon-reload				# 重新加载一下配置
```

### 查看 MySQL 密码

```bash
$ grep "password" /var/log/mysqld.log			# 临时密码在 /var/log/mysqld.log 文件中
# 得到的临时密码就可以拿去登录 mysql 了
$ mysql -u root -p 临时密码
mysql>							# 此时进入了 mysql 命令行交互界面
```

### 修改密码

> mysql 默认必须修改密码后才能操作数据库

```bash
# 修改密码（8.0 MySQL 对密码的强度非常严格，密码策略必须是：大小写字母搭配 + 特殊字符 + 不规则数字 [也就是不能是连续的数字：如123456什么的] 才可以设置成功！）
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'Zhou@yu123';
```

### 查看密码

::: warning 注意：
密码是加密过的！看了也没意义，哈哈！查看不了原本的密码，我已经尝试过了，网上也看过各种教程，建议别死磕！自己设置的密码就牢记！
:::

```bash
mysql> use mysql;		# 使用这个数据库
mysql> SELECT user, host, CONVERT(authentication_string USING utf8) AS password FROM mysql.user WHERE user = 'root';
```

### 查看密码策略

```bash
mysql> SHOW VARIABLES LIKE 'validate_password%';
```

### 修改密码的设置策略

```bash
mysql> set global validate_password.policy=0;				# 将策略设置为 0，这样就可以设置简单密码了
mysql> set global validate_password.special_char_count=0;	# 指定字符数量不设置
mysql> set global validate_password.length=1;				# 设置密码允许的长度
```

### 重新设置简单密码

```bash
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';		# 重新设置root在本地登入的密码
mysql> flush privileges;											# 刷新权限
```

### 开放远程登录

- 设置

```bash
mysql> use mysql;
mysql> update user set host='%' where user='root';									# 设置 root 用户可以远程登录
mysql> alter user 'root'@'%' identified with mysql_native_password by '123456';		# 设置 root 远程登录密码
mysql> flush privileges;															# 刷新权限，使生效
mysql> select host,user from user;
```

- 尝试远程登录

> 自己设置的 IP 地址 + mysql 端口号 3306 + 用户名 + 密码

### 远程登录不了 ?

> 1. 检查 mysql 服务是否运行
>
> ```bash
> $ ss -ntl							# 常实用、快速、有效的跟踪IP连接和sockets的新工具
> ```

- 效果如下：

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

### 忘记密码 ?

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
