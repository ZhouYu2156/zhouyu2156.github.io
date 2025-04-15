# 实用辅助工具

## WinRar 解压缩工具
::: tip 推荐：

> Windows & Mac & Linux 系统的 `免费解压缩工具`：

- 推荐：[访问官网](https://www.win-rar.com/)

> 下载好对应版本之后，进入 `WinRAR.exe` 软件，找到 `选项` => `压缩` => `创建默认配置` => `压缩文件格式` 配置成自己想要的 `ZIP` 或者 `RAR` 格式即可.

:::

## Win11 去掉快捷图标的箭头
::: tip 提示

推荐：[参考](http://m.pcxitongcheng.com/xtjc/win11/2023-09-13/38609.html)

:::


## Win11 右键菜单还原成 Win10

- 按住`Shift + 右键`可以使用Win10风格的右键菜单

::: tip 提示
- 一键还原`win10右键菜单`工具：[点我下载](/assets/Win11系统右键菜单还原工具.zip)
- 参考来源：[来自Win11系统右键菜单还原工具](https://yunyingmenghai.feishu.cn/wiki/MjBZwPw7BiiRlekiwLjcF0Ctn1V?view=vew8jTRKbz&table=tblCKq0uVrsY6QdN)

:::


## windows 本地安装人工智能
::: tip 教程

> 官网：[去看看](https://ollama.com/)

> Github 网址：[大语言模型运行工具下载](https://github.com/ollama/ollama)

> 参考本站另一篇文章： [如何使用ollama本地安装人工智能](/后端/人工智能/Ollama)

:::


## 谷歌浏览器插件推荐
::: tip 下载
- 推荐1：[谷歌应用商店（国外）](https://chromewebstore.google.com/)
- 推荐2：[极简插件（国内）](https://chrome.zzzmh.cn/#/index)
- JSON可视化：[jsoncrack](https://jsoncrack.com/)
:::

| 插件名称 |             插件功能描述             |
| :------: | :----------------------------------: |
| JSONView | 美化JSON格式，可以折叠、展开对象层级 |
|  XPath   |         测试Xpath语法解析DOM         |


## `CMD`的使用

|          快捷键          |                          功能                          |
| :----------------------: | :----------------------------------------------------: |
|         特殊功能         |                                                        |
|          `F11`           |                        切换全屏                        |
|      `Alt + Enter`       |         切换全屏<Badge text="*" type="tip" />          |
|    `Ctrl + Shift + P`    |                      切换命令面板                      |
|         窗口控制         |                                                        |
|    `Ctrl + Shift + N`    |                        新建窗口                        |
|    `Ctrl + Shift + D`    |                       复制标签页                       |
|    `Ctrl + Shift + T`    |                       新建标签页                       |
|    `Ctrl + Shift + W`    |     关闭当前活动面板<Badge text="*" type="tip" />      |
|        `Alt + F4`        |                     退出`CMD`窗口                      |
|       `Ctrl + F4`        |                        退出终端                        |
|       `Ctrl + Tab`       |                       切换选项卡                       |
|         面板控制         |                                                        |
| `Ctrl + Alt + 方向箭头`  |     面板在方向上拆分<Badge text="*" type="tip" />      |
| `Alt + Shift + 方向箭头` | 面板在方向上扩展/缩小空间<Badge text="*" type="tip" /> |
|     `Alt + 方向箭头`     |                      切换活动面板                      |
|           字体           |                                                        |
|        `Ctrl + 0`        |                    恢复字号初始大小                    |
|        `Ctrl + +`        |                        增大字号                        |
|        `Ctrl + -`        |                        减小字号                        |
|    `Ctrl + 鼠标滚轮`     |                        缩放字号                        |
|    `Ctrl + Shift + B`    |         广播命令<Badge text="*" type="tip" />          |

### 我的`cmd`个性化配置
::: details 详情
```json
{
    "$help": "https://aka.ms/terminal-documentation",
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": 
    [
        {
            "command": "toggleBroadcastInput",
            "keys": "ctrl+shift+b"
        },
        {
            "command": 
            {
                "action": "splitPane",
                "split": "up"
            },
            "keys": "ctrl+alt+up"
        },
        {
            "command": 
            {
                "action": "splitPane",
                "split": "down"
            },
            "keys": "ctrl+alt+down"
        },
        {
            "command": "unbound",
            "keys": "alt+shift+minus"
        },
        {
            "command": "unbound",
            "keys": "alt+shift+plus"
        },
        {
            "command": "unbound",
            "keys": "ctrl+shift+down"
        },
        {
            "command": "unbound",
            "keys": "ctrl+shift+right"
        },
        {
            "command": 
            {
                "action": "copy",
                "singleLine": false
            },
            "keys": "ctrl+c"
        },
        {
            "command": "paste",
            "keys": "ctrl+v"
        },
        {
            "command": 
            {
                "action": "splitPane",
                "split": "auto",
                "splitMode": "duplicate"
            },
            "keys": "alt+shift+d"
        },
        {
            "command": "find",
            "keys": "ctrl+shift+f"
        },
        {
            "command": 
            {
                "action": "splitPane",
                "split": "right"
            },
            "keys": "ctrl+alt+right"
        },
        {
            "command": 
            {
                "action": "splitPane",
                "split": "left"
            },
            "keys": "ctrl+alt+left"
        },
        {
            "command": 
            {
                "action": "swapPane",
                "direction": "right"
            },
            "keys": "shift+right"
        },
        {
            "command": 
            {
                "action": "swapPane",
                "direction": "down"
            },
            "keys": "shift+down"
        },
        {
            "command": 
            {
                "action": "swapPane",
                "direction": "left"
            },
            "keys": "shift+left"
        },
        {
            "command": 
            {
                "action": "swapPane",
                "direction": "up"
            },
            "keys": "shift+up"
        },
        {
            "command": "quit",
            "keys": "ctrl+f4"
        }
    ],
    "defaultProfile": "{0caa0dad-35be-5f56-a8ff-afceeeaa6511}",
    "initialPosition": ",",
    "language": "zh-Hans",
    "profiles": 
    {
        "defaults": {},
        "list": 
        [
            {
                "commandline": "D:\\Program Files\\Git\\bin\\bash.exe --login -i",
                "font": 
                {
                    "face": "Consolas",
                    "size": 12.0
                },
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6511}",
                "hidden": false,
		"icon": "D:\\Program Files\\Git\\mingw64\\share\\git\\git-for-windows.ico",
                "name": "Git Bash"
            },
            // ...
        ]
    }
}
```
:::

