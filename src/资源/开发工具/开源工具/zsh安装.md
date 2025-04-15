# `WSL2`安装 & `ZSH` 安装

## `WSL2` 安装

### 确保你的 Windows 版本支持 WSL2

> `win + R`输入`winver`, 或者在`cmd`终端窗口输入`winver`会弹出一个窗口显示你的 Windows 版本信息。

```bash
$ winver
```

### 启用 WSL 功能<Badge type="tip" text="required" />

> 管理员身份打开`PowerShell`(如果这个运行不了)或者打开`cmd`运行下面的命令:

```bash
$ wsl --install
```

### 设置 WSL 版本为 WSL2<Badge type="tip" text="required" />

> 设置默认 WSL 版本为 2

```bash
$ wsl --set-default-version 2
```

### 查看在线的 Linux 发行版<Badge type="tip" text="required" />
```bash
$ wsl --list --online
```

![Linux发行版](/pictures/Win/使用wsl查看现有的Linux发行版.png)

### 查看已安装的 Linux 发行版
```bash
$ wsl --list
# 或者简写
$ wsl -l
```

### 安装子系统<Badge type="tip" text="required" />
```bash
$ wsl --install -d Ubuntu
```

### 启动和设置 Linux 发行版<Badge type="tip" text="required" />
1. 启动安装的 Linux 发行版：
> 在开始菜单中找到你安装的 Linux 发行版，点击启动。

![wsl-ubuntu](/pictures/Win/wsl-ubuntu.png)

2. 初次设置：
> 按照提示创建用户和密码。

![wsl-ubuntu启用](/pictures/Win/wsl2-ubuntu启用.png)

### 命令行启动指定的系统<Badge type="tip" text="required" />
> 默认登录用户就是刚刚创建的用户

```bash
$ wsl -d Ubuntu
```

### 登录root用户
> 默认创建系统的时候, root用户是没有设置密码的, 可以在 `cmd` 窗口通过下面的命令直接登录 root 用户, 如果 root 用户设置了密码, 下面的命令也可以直接登录 root 用户。设置 `root` 密码只在`wsl`系统中切换用户才会使用到。

```bash
$ wsl -d Ubuntu --user root
```

### 更改普通用户的密码
> 通过上面的命令登录 root 用户后, 执行下面的命令`passwd 普通用户名`即可直接修改新密码

```bash
$ passwd zhouyu
```

### 更改 root 用户密码
> 正常打开 Ubuntu 系统, 然后执行下面的命令

```bash
$ su root
# 或者
$ su -
```

![登录root用户的方式](/pictures/Win/登录root用户的方式.png)


### 查看 WSL 版本
```bash
$ wsl --list --verbose
# 或者简写
$ wsl -l -v
```

### 两个系统环境隔离
::: tip 提示
- 安装完 `WSL` 系统后, 就可以把 Windows 当成 `Linux` 使用了, 但是需要注意的是 `WSL` 是一个隔离的系统环境，与 `Windows` 的文件系统是隔离的。
- <Badge text="注意:" type="warning" /> `Windows`系统中设置的环境变量以及安装的工具在`WSL`环境中无法使用。`WSL`是一个全新的隔离的系统，需要在`WSL`系统中重新安装环境！比如你的windows上安装了 `nodejs` 环境或者 `python` 环境等，但是在 `WSL` 中无法使用这些工具，(1)要么给这个系统重新安装环境，(2)要么通过 `/mnt/` 下的磁盘去找到该环境启动。推荐使用第 `(1)` 种方式吧。隔离的系统，就应该真正做到环境隔离！

:::

### 如何访问其他磁盘?
::: info 说明
- `WSL` 会自动将 Windows 文件系统的各个磁盘挂载到 `/mnt/` 目录下。使用 cd 命令访问各个磁盘及其目录，享受 Linux 环境与 Windows 系统文件的无缝集成。

:::


![查看启用的linux系统](/pictures/Win/查看启用的linux系统.png)

> `*` 标识的表示当前正在使用的版本。

### 检查 WSL 的整体版本
```bash
$ wsl --status
```

## 配置`WSL`的`SSH`连接

### 安装 SSH 服务
> 如果你还没有安装 SSH 服务，请使用以下命令进行安装：

```bash
$ sudo apt update
$ sudo apt install openssh-server
```

### 配置SSH服务允许root登录

> 有时，SSH 默认会禁用 root 登录。你可以编辑 SSH 配置文件来允许 root 登录：

```bash
$ vim /etc/ssh/sshd_config
# 找到下面这行内容
# PermitRootLogin prohibit-password
# 修改为, 保存并退出
PermitRootLogin yes
```

### 启动 `SSH` 服务
> 进行配置更改后，重启 SSH 服务以应用更改：

```bash
$ sudo service ssh start
```


### 通过`ssh`方式连接`WSL`

::: tip 提示 
- `VSCode`中按快捷键`Ctrl + Shift + P` 打开命令行窗口, 搜索`打开SSH`就可以选择`SSH-Remote`插件的配置文件进行配置`SSH`连接

:::

![打开SSH-Remote配置文件](/pictures/Win/打开SSH-Remote配置文件.png)

安装VSCode的`SSH-Remote`插件，配置`ip`和用户名进行登录, 在连接的时候会提示输入密码。

```md
Host 192.168.83.64
  HostName 192.168.83.64
  User root

# 这是我的另一台云服务器, 通过私钥文件免密登录的方式, 没有私钥文件提供就通过密码的方式登录即可
Host 47.120.28.25
  HostName 47.120.28.25
  User root
  IdentityFile ~/.ssh/aliyunserverkey.pem
```

- 推荐: 通过`秘钥`的方式进行连接(自动加载, 以后无需重复输入密码连接)

1. 本地生成秘钥

```bash
$ ssh-keygen -t rsa -b 2048
```

2. 复制公钥放到服务器
```bash
$ cat ~/.ssh/id_ed25519.pub
```

3. 将公钥复制到服务器的`authorized_keys`文件中
```bash
$ vim ~/.ssh/authorized_keys
# 把公钥复制到这里,保存退出
```

4. 本地`SSH-Remote`的连接配置
```md
Host 192.168.83.64
  HostName 192.168.83.64
  User root
  IdentityFile ~/.ssh/id_ed25519
```

### 使用秘钥登录的原理介绍

::: tip 说明
- 使用 SSH 密钥登录的原理是基于公钥密码学（也称为非对称加密），它提供了一种安全的身份验证方式，比传统的密码登录更加安全。

:::


- SSH 密钥登录的基本概念

1. 公钥和私钥：

::: info 提示
- 公钥：可以公开分享的密钥，放在服务器上。
- 私钥：保存在客户端（用户本地计算机）上的密钥，必须保密。
:::

2. 密钥对
> 密钥对：SSH 密钥是成对生成的，包括一个公钥和一个私钥。用户可以使用 ssh-keygen 命令生成一对密钥。

- SSH 密钥登录的过程

::: details 详情

1. 密钥对生成：

> 用户在本地计算机上生成一对密钥，公钥和私钥。这通常通过命令 ssh-keygen 实现。

2. 安装公钥：

> 将生成的公钥复制到远程服务器的 ~/.ssh/authorized_keys 文件中。这可以通过命令 ssh-copy-id 或手动方式完成。

3. 建立连接：

> 用户使用 SSH 客户端尝试连接到远程服务器，SSH 客户端会发送一条请求到服务器。

4. 服务器验证：

> 服务器查找连接用户的公钥是否在 ~/.ssh/authorized_keys 文件中。如果找到了，服务器会生成一个随机数（挑战）并用该公钥加密这个随机数，然后将其发送给客户端。

5. 客户端响应：

> 客户端使用其私钥解密这个随机数，得到明文的挑战，然后将这个明文返回给服务器。

6. 服务器验证响应：

> 服务器检查客户端返回的明文挑战是否正确。如果正确，服务器认为身份验证成功，允许连接。

7. 安全会话建立：

> 一旦身份验证成功，SSH 协议将建立一个加密的会话，确保数据在传输过程中是安全的。

:::

- 优势

::: info 说明
- 安全性：即使公钥被盗，攻击者也无法访问服务器，因为没有对应的私钥。
- 方便性：用户不需要每次输入密码，可以使用 SSH 密钥轻松登录。
- 抵御暴力破解：使用密钥的方式可以避免传统密码被暴力破解的风险。
:::

- 具体步骤如下:

```bash
# # 生成密钥对
$ ssh-keygen -t ed25519 -C "your_email@example.com"
# 复制公钥内容放到服务器的 ~/.ssh/authorized_keys
$ cat ~/.ssh/id_ed25519.pub
# 本地配置连接时要用来解密的私钥文件
# ...
```

## `MSYS2`环境安装 `zsh` 工具

::: tip 前言
可以这样认为，这个工具提供了类`Unix`环境，将`windows`环境与该环境隔离，所以在`MSYS2`环境外部是无法访问`windows`上配置好的环境变量的。在该环境中，建议直接当一台微型版的`Linux`系统来使用。常用的`Linux`命令在该环境中都默认提供了，比如`ls`、`pwd`、`df`等等。没有的话，可以尝试搜索一下`MSYS2`的仓库中是否有提供。常用的都有，比如`git`、`gcc`、`zsh`、`tmux`(终端分屏工具)等。

`windows`上安装的`git bash`终端工具不能使用`tmux`终端分屏工具，所以特意安装`MSYS2`这个集成终端工具来玩的。
:::

::: info 资源官网
- [MSYS2官网](https://www.msys2.org/)
- [ohmyzsh仓库](https://github.com/ohmyzsh/ohmyzsh)

:::

### 安装`MSYS2`工具

> 按照官网的安装步骤操作即可

### 

### 安装`zsh`工具

::: info 示例
`MSYS2`官网默认提供了很多开源工具，可以通过`pacman -S 工具名称`搜索，例如`pacman -S zsh`
:::

```bash
$ pacman -S zsh   # 打开MSYS2终端界面，安装zsh
```

### 安装`vim`和`git`工具

```bash
$ pacman -S vim git -y
```

### 安装`oh-my-zsh`

::: tip 说明
上面安装了`git`工具后，就可以通过`oh-my-zsh`仓库说明文档里的安装说明进行安装了，在安装过程中需要使用`git`工具进行将仓库代码克隆到本地，这样不需要自己去`github`上手动下载了，所以一定要给`MSYS2`安装`git`扩展工具。
:::

```bash
# 安装命令
$ sh -c "$(curl -fsSL https://install.ohmyz.sh/)"
```

![ohmyzsh安装完成](/pictures/Win/ohmyzsh安装完成.png)

> 安装完成后，在刚才`MSYS2`默认安装的根目录下的`home > 用户名`子目录中，会看到一个`.oh-my-zsh`文件夹，里面就是`oh-my-zsh`的配置文件。包含主题、插件、更新工具等。

### 配置`MSYS2`到系统环境变量

> 这样方便在`windows`系统环境变量可用的终端中执行启动`MSYS2`终端工具的命令。

![配置MSYS2到系统环境变量](/pictures/Win/配置MSYS2到系统环境变量.png)

### 配置`MSYS2`终端主题

::: info 提示
- 类似于`windows`的`cmd`窗口，可以配置背景色、前景色等，`MSYS2`工具也支持在线配置主题并导出主题文件来设置本地的主题。下面的配置链接可以在`MSYS2`终端窗口顶部右击配置主题时获得。
- 推荐：[官方提供的主题配置](https://ciembor.github.io/4bit/#)
:::

![MSYS2配置选项](/pictures/Win/MSYS2配置选项.png)

### 配置`MSYS2`中文语言

![设置MSYS2配置界面为中文](/pictures/Win/设置MSYS2配置界面为中文.png)

> 设置为中文语言后，不止`MSYS2`终端的界面变成中文了，连`命令帮助文档`都是中文的了

![中文界面](/pictures/Win/中文界面.png)

### 设置`MSYS2`终端到`cmd`个性化配置

![配置终端个性化](/pictures/Win/配置终端个性化端配置文件.png)

```json
{
  // ...
  	"profiles": {
		"defaults": {},
		"list": [
        {
          "guid": "{17da3cac-b318-431e-8a3e-7fcdefe6d114}",
          "name": "MSYS / zsh",
          "commandline": "C:/msys64/msys2_shell.cmd -defterm -here -no-start -ucrt64 -shell zsh",
          "startingDirectory": "C:/msys64/home/%USERNAME%",
          "icon": "C:/msys64/msys2.ico",
          "font": {
            "face": "Lucida Console",
            "size": 16
          }
        },
        {
          "guid": "{71160544-14d8-4194-af25-d05feeac7233}",
          "name": "MSYS / MSYS2",
          "commandline": "C:/msys64/msys2_shell.cmd -defterm -here -no-start -msys",
          "startingDirectory": "C:/msys64/home/%USERNAME%",
          "icon": "C:/msys64/msys2.ico",
          "font": {
            "face": "Lucida Console",
            "size": 12
          }
        }
        // ...
      ]
    }
}
```

::: warning 温馨提醒
建议还是不要单独安装`MSYS2`了吧，因为`windows`终端也自带有分屏的功能。因为环境隔离，使用起来还是有点不方便。要集成到`VSCode`里面做终端还要做很多配置，有点麻烦。算了算了。
:::

## `Git Bash`安装 `zsh` 工具

::: info 推荐
- 前往： [git官网](https://git-scm.com/)
- 前往： [zsh安装包下载官网](https://packages.msys2.org/packages/zsh?repo=msys&variant=x86_64)

:::

### 安装`Git`工具
> 前往: [官网](https://git-scm.com/), 下载之后点击下一步下一步安装即可。

### 配置`git`到环境变量

![配置git到环境变量](/pictures/Win/配置git到环境变量.png)

### 下载安装包

::: tip 步骤
下载`zsh`工具的安装包放到`git`安装的根目录。
:::

![zsh初始界面](/pictures/Win/下载zsh安装包压缩文件.png)

### 解压安装包

::: info 步骤
在`git`根目录将`zsh`的安装包`解压到当前文件夹`，解压之后，安装包压缩文件中的文件与`git`具有相同同名的文件夹会自动进行合并，其中`zsh`的工具`zsh.sh`就放到了`git`根目录下的`bin`目录中。所以当我们在使用`bash`终端时，输入`zsh`就可以找到`zsh.sh`这个脚本文件执行。
:::

```bash
$ ls /bin | grep zsh
```

![zsh的脚本文件](/pictures/Win/zsh的脚本文件.png)

### 初始化 zsh 配置文件
> 打开`cmd`窗口，进入`Git`安装的根目录，执行`zsh`命令，初次执行会弹出初始化提示的界面，按`0`结束弹窗。之后会自动在`Windows`的用户目录下创建了一个`.zshrc`配置文件。

![zsh初始界面](/pictures/Win/zsh初始界面.png)

![zsh配置文件](/pictures/Win/zsh配置文件.png)

### 设置`git`终端默认使用`zsh`工具

打开`bash`的配置文件

```bash
$ vim ~/.bashrc
```

输入下面的代码，然后按`:wq`保存退出

```sh
if [ -t 1 ]; then
  exec zsh
fi
```

![配置bashrc默认使用zsh](/pictures/Win/配置bashrc默认使用zsh.png)


### 安装扩展`zsh`终端主题的`on my zsh`工具

::: tip 目录文件
- `lib`： 提供了核心功能的脚本库
- `tools`： 提供安装、升级等功能的快捷工具
- `plugins`： 自带插件的存在放位置
- `templates`： 自带模板的存在放位置
- `themes`：  自带主题文件的存在放位置
- `custom`： 个性化配置目录，自安装的插件和主题可放这里
:::


- 在线安装

::: warning 注意
在线安装可能由于网络原因会出现不稳定中断的故障，但是可以多尝试两次执行下面的命令，后面下载时会利用前面的缓存接着下载，这样就可能成功，我就是这样操作的。
:::

```bash
$ sh -c "$(curl -fsSL https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh)"
```

![克隆安装oh-my-zsh](/pictures/Win/克隆安装oh-my-zsh.png)

- 离线安装

::: warning 注意
如果在线安装总是有问题，那就前往`Oh-My-Zsh`仓库下载安装包。放到用户下，同`AppData`同级，重命名为`.oh-my-zsh`。

在下面的截图中也可以看到，我刚刚通过`在线安装`方式获取到的安装脚本`install.sh`，安装脚本执行后其实也是下载`oh-my-zsh`仓库中的文件放到了用户目录下的`.oh-my-zsh`的文件夹中。

下载的解压之后，得到的`.oh-my-zsh`文件夹，里面有一个`tools`子文件夹，在这个目录中有`install.sh`安装脚本，在命令行通过`sh install.sh`执行这个脚本即可完成安装。

> 推荐：[前往Oh-My-Zsh仓库](https://github.com/ohmyzsh/ohmyzsh) <Badge type="tip" text="github" />

> 推荐：[前往Oh-My-Zsh仓库](https://gitee.com/mirrors/oh-my-zsh) <Badge type="tip" text="gitee" />

:::

![oh-my-zsh文件夹放置位置](/pictures/Win/oh-my-zsh文件夹放置位置.png)

![oh-my-zsh的install脚本位置](/pictures/Win/oh-my-zsh的install脚本位置.png)

- 成功安装

> 红色的警告信息不用管，那是因为你在家目录下还没有对`bash`做配置文件`.bashrc`或者其他相关的个性化配置文件等。可以看到，成功安装后，左边的提示命令符变成`箭头图标`了。

![oh-my-zsh安装成功界面](/pictures/Win/oh-my-zsh安装成功界面.png)

### 配置`Oh-My-Zsh`主题

::: tip 提示
通过上面的安装，已经获得了`Oh-My-Zsh`提供的所有主题以及插件等。接下来可以自由选择性地配置自己想要的主题了。

只需要在`.zshrc`配置文件的`ZSH_THEME`字段指定`.oh-my-zsh`目录下的`themes`文件夹中的`主题文件名称`即可启用指定的内部扩展主题。

关于主题名称和示例，请看这里：[内部扩展主题示例](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)，想要安装更多外部主题请看这里: [外部扩展主题](https://github.com/ohmyzsh/ohmyzsh/wiki/External-themes)，每个外部扩展主题示例下面有对应存储仓库的链接，点击链接进入该主题的存储仓库，会有相应的安装教程！
:::

- 打开`zsh`的配置文件

```bash
$ vim ~/.zshrc
```

![配置zsh主题](/pictures/Win/配置zsh主题.png)


- 安装外部扩展主题

> 克隆(github下载)主题仓库到本地，或者**直接下载主题仓库中提供的 xxx.zsh-theme**这个文件，免得浪费时间下载一个仓库大半天，然后将`*.zsh-theme`的主题文件，放到`.oh-my-zsh`目录下的`themes`文件夹中，文件名(不含后缀)作为主题名称配置到`~/.zshrc`文件中的`ZSH_THEME`字段即可。


![安装外部扩展zsh主题](/pictures/Win/安装外部扩展zsh主题.png)


> 在`~/.zshrc`配置文件中配置了`ZSH_THEME`主题的字段后，要使用命令 `source ~/.zshrc` 重新加载一下配置文件。


### 配置插件
::: info 说明
- `Oh-My-Zsh`提供了两种插件，一种是内置提供的插件，放在 `~/.oh-my-zsh/plugins` 目录中；第二种是自定义或第三方扩展插件，应该放在 `~/.oh-my-zsh/custom/plugins` 目录中。

- `Oh-My-Zsh`提供了全局环境变量`$ZSH_CUSTOM` 表示 `自定义插件放置路径`，即`~/.oh-my-zsh/custom`。

- 插件可以配置多个，在`plugins`的列表里面里面添加，以`空格`分隔开就行了。

- 注意：插件的名称是`插件所在目录的名称`，如下图所示！

下面通过两个例子来演示如何安装`第三方扩展插件`。
:::

> 插件配置只需要填写`插件所在目录`即可，默认约定`插件目录名称`就是插件名称，实际的插件名称应该以`.plguin.zsh`结尾。

![插件配置须知](/pictures/Win/插件配置须知.png)

- 内置插件配置

> 找到 `~/.oh-my-zsh/plugins`中的插件名称，添加到 `~/.zshrc`中的 `plugins` 字段进行配置即可。
> 
> `z`和`git`都是内置的，`z`用于直达之前`cd`过的目录。

![zsh配置内置插件](/pictures/Win/zsh配置内置插件.png)

- 第三方自定义插件配置
> 可以通过`git`克隆到自定义插件目录中，也可以到github上面去手动下载后，解压缩之后将资源放在自定义插件目录中。

```bash
# zsh-syntax-highlighting
$ git clone https://gitee.com/mirrors/zsh-syntax-highlighting.git ${ZSH_CUSTOM}/plugins/zsh-syntax-highlighting
# zsh-autosuggestions
$ git clone https://gitee.com/mirrors/zsh-autosuggestions.git ${ZSH_CUSTOM}/plugins/zsh-autosuggestions
```

> `zsh-autosuggestions`(提示插件)，会自动提示之前输入过的
> 
> `zsh-syntax-highlighting`(语法高亮)，如果输入指令是正确的会高亮提示，这两个需要安装。(上图已先配置)

::: tip 提示
- `.oh-my-zsh`目录下的`plugins`和`themes`是`oh-my-zsh`自带提供的所有配套插件和主题，可以选择性地配置才能启用。

- `.oh-my-zsh`目录下的`custom`文件中的`plugins`和`themes`是第三方自定义插件和主题的存放目录。

- 在`~/.zshrc`中配置的插件和主题，会优先从内置插件和主题从寻找，没有的话再找自定义插件，找不到的话会提示没有配置。
:::


### 设置自动随机应用主题

::: tip 提示
- 参考来源: [前往官网查看](https://github.com/ohmyzsh/ohmyzsh?tab=readme-ov-file#selecting-a-theme)

- 在开启一个`zsh`终端实例的时候，会随机从主题资源中应用一个主题样式。只需要配置`~/.zshrc`文件中的`ZSH_THEME="random"`即可。

:::


### 本地化(正常显示中文)
> 通过 `vim ~/.zshrc` 添加下面的配置

```sh
export LANG=zh_CN.UTF-8
export LC_ALL=zh_CN.UTF-8
```
> 重新加载一下配置文件: `source ~/.zshrc`

![设置地区和语言](/pictures/Win/设置地区和语言.png)

> 如果再不显示中文, 就设置终端的 `外观 > 语言 & 字体`


## 配置 git 关联 `github` 仓库


### 配置 Git 用户信息
> 在使用 Git 之前，需要配置你的用户名和邮箱地址。这些信息会与每次提交的记录绑定。

```bash
$ git config --global user.name "你的用户名"
$ git config --global user.email "你的邮箱"
```

> `--global` 表示这两个设置将应用于你所有的 Git 仓库。如果你想为某个特定仓库使用不同的用户名或邮箱，可以在仓库目录下不加 --global 进行设置。

> 可以通过以下命令查看当前的配置：

```bash
$ git config --list
```

### 创建 `GitHub` 仓库

> 仓库创建完成后，复制仓库的`ssh`地址。

### 本地初始化仓库
```bash
$ git init
```

### 添加远程仓库
```bash
$ git remote add githubware 仓库的ssh连接地址
$ git remote -v
```

### 配置 `ssh` 认证方式
> 可以通过 `HTTP` 的方式连接提交，但是每次都需要认证填写密码，这就很不方便。`ssh`只需要配置好秘钥，每次即可直接提交。

1. 生成和配置密钥对（如果尚未生成）
> 如果已经生成过密钥对，则将`~/.ssh/*.pub`【公钥】文件内容复制到`github`的个人设置中配置秘钥即可。【私钥】是本地用来跟服务器建立安全连接时验证【秘钥对】使用的，不能反过来。

> 配置秘钥有两种签名算法，一种是`ed25519`<Badge type="warning" text="旧" />，一种是`rsa`<Badge type="success" text="新" />，任选一种，最终都可以生成一个公钥和私钥。

```bash
$ ssh-keygen -t rsa -b 4096 -C "你的github电子邮箱"
$ cat ~/.ssh/xxx.pub    # 复制这个文件的内容添加到github的个人配置中
```

2. 测试 `ssh` 连接
![测试ssh配置](/pictures/Win/测试ssh配置.png)

> 如果连接成功，你会看到 GitHub 的欢迎信息。

3. 添加文件并提交
```bash
$ echo "Hello world" > README.md
$ git add .
$ git commit -m "initial repo"
$ git push githubware main
# 如果失败，可以看一下本地仓库的分支是否不对
$ git reflog
# 不对的话，可以切换到正确的分支
$ git branch -m master main
$ git pull githubware main --allow-unrelated-histories    # 合并无关历史
```

> 至此就完成了`git`关联`github`仓库的配置。

