# Git版本控制系统

::: tip 概述

`Git`是一个免费的、开源的分布式版本控制系统，可以快速高效地处理从小型到大型的各种项目。

`Git`易于学习，内存占用小，性能极快。它具有廉价的本地库，方便的暂存区域和多个工作流分支等特性。

`Git工具下载`：推荐[前往官网](https://git-scm.com/)

:::



## Git本地管理

### 设置签名

```bash
$ git config --global user.name "用户名"		# 设置用户签名
$ git config --global user.email "邮箱"		 # 设置邮箱签名
```

### 查看特定级别的配置信息

#### 查看全局配置

> 这将列出全局级别的 Git 配置信息，通常位于用户主目录下的 `.gitconfig` 文件中。

```bash
$ git config --global --list
```



#### 查看特定配置项的值

```bash
$ git config --global user.email
```





### 初始化本地仓库

```bash
$ git init
```



### 查看本地库状态

```bash
$ git status
```



### 添加到暂存区

```bash
$ git add .			# 添加当前目录下的所有文件到暂存区
$ git add 文件名	  # 添加某一个文件到暂存区
```



### 删除暂存区的文件

```bash
$ git rm --cached <file>...			# 初次添加到暂存区后清除暂存区的提示信息
$ git restore --staged <file>...	# 提交一次后就变成这样清除暂存区的提示了
```



### 提交到本地库

```bash
$ git commit -m "日志信息"
```



### 查看历史提交记录

```bash
$ git reflog
```



### 查看详细版本提交日志

```bash
$ git log
```





### 切换版本

```bash
$ git reflog					# 查看历史版本号，通过版本号来定位需要切换的版本
$ git reset --hard 版本号
```



### 分支操作

| 命令名称                            | 功能                         |
| ----------------------------------- | ---------------------------- |
| git branch 分支名                   | 创建分支                     |
| git branch -v                       | 查看分支                     |
| git checkout 分支名                 | 切换分支                     |
| git merge 分支名                    | 把指定的分支合并到当前分支上 |
| git branch -d 分支名                | 删除分支                     |
| git push 远程仓库名 --delete 分支名 | 删除远程仓库分支             |



## Git远程仓库管理

::: tip 前提

[前往github](https://github.com/)注册账号并创建仓库。

:::



### 创建远程仓库别名

```bash
$ git remote add 仓库别名 远程仓库地址
$ git remote -v		# 查看当前所有远程仓库别名和对应的仓库地址
```



### 推送本地分支到远程仓库

```bash
$ git pull 仓库别名 分支名		# 会自动合并到当前分支并提交到本地仓库
$ git push 仓库别名 分支名		# 推送到远程仓库的分支上
```



### 克隆

::: info 说明

克隆会做如下操作：

- 拉取代码
- 初始化本地仓库
- 创建仓库别名

:::



```bash
$ git clone 远程仓库地址
```



### `SSH`免密登录

- 生成`ssh秘钥`

```bash
$ ssh-keygen -t rsa -C "邮箱"		# -t 指定加密算法，-C 指定描述内容。之后敲三次回车
```

- 登录`github`账号，复制`生成的公钥`到账号`settings`的`SSH and GPG keys`中







