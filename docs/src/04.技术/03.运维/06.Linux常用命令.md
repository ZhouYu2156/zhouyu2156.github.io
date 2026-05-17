# Linux 常用命令

## echo

> 直接打印输出内容到终端。

### 命令参数表

| 参数 |               作用               |
| :--: | :------------------------------: |
| `-e` |    启用转义符 `\t` `\n` `\b`     |
| `-n` |            不换行输出            |
| `>`  |   重定向输出管道（覆盖原内容）   |
| `>>` | 重定向输出（在文件末尾追加内容） |

## tr

::: info 说明
tr = translate / 删除字符

只能处理`字符级`替换、去重、删除，不能处理行、列。
:::

### 命令参数表

| 参数 |             作用             |
| :--: | :--------------------------: |
| `-d` |           删除字符           |
| `-s` | 去除连续重复的字符，保留一个 |

### 核心语法

```bash
$ tr [选项]  字符集1  字符集2
```

- 小写转大写

```bash
echo "hello" | tr 'a-z' 'A-Z'
```

- 大写转小写

```bash
echo "HELLO" | tr 'A-Z' 'a-z'
```

- 替换字符（`:` 换成 `-`）

```bash
echo "a:b:c" | tr ':' '-'
```

- 删除指定字符（`-d`）

```bash
echo "hello123world" | tr -d '0-9'
```

- 去重连续字符（`-s`）

```bash
echo "aaabbbccc" | tr -s 'a-z'
```

- 删除换行符（拼成一行）

```bash
cat file.txt | tr -d '\n'
```

### 注意事项

::: warning 注意事项

- 只能处理流，不能直接读文件

  ❌️ tr a-z A-Z file.txt

  ✔ cat file.txt | tr a-z A-Z

- 只能单个字符映射，不能字符串替换

  tr 不能替换 hello → hi

- 不支持正则（只有字符集）

:::

## awk

::: info 说明
awk = 按行、按列处理文本

能取列、过滤、计算、判断、循环，日志分析神器。

:::

### 核心语法

```bash
$ awk '条件 {动作}' 文件名
```

### 内置变量

- $0 整行（所有行）
- $1 第 1 列
- $2 第 2 列
- NF 总列数
- NR 行号

### 常用操作

- 打印第 1 列、第 2 列

```bash
$ awk '{print $1, $2}' file.txt
```

- 过滤包含关键字的行

```bash
$ awk "/keyword/" file.txt
```

- 过滤不包含关键字的行

```bash
$ awk "!/keyword/" file.txt
```

- 打印带行号的所有行内容

```bash
$ awk '{print NR, $0}' file.txt
```

- 打印最后一列

```bash
$ awk '{print $NF}' file.txt
```

- 统计行数

```bash
$ awk 'END {print NR}' file.txt
```

- 获取最后一列最后一项

```bash
$ awk 'END {print $NF}' file.txt
```

## printf

::: info 说明
比 echo 更强大、更规范、格式更漂亮的输出命令

- 不会自动换行

- 可以控制对齐、宽度、小数、进制

- 脚本输出表格、日志必备

:::

### 核心语法

```bash
$ printf "格式化字符串" 参数1 参数2 ...
```

### 常用格式符

| 格式符 |   作用   |
| :----: | :------: |
|  `%s`  |  字符串  |
|  `%d`  |   整数   |
|  `%f`  |  浮点数  |
|  `%x`  | 十六进制 |
|  `\n`  |   换行   |
|  `\t`  |  制表符  |

### 常用操作

- 输出字符串（手动加 \n 才换行）

```bash
$ printf "Hello world\n"
```

- 格式化输出姓名、年龄

```bash
$ printf "name: %s, age: %d\n" "张三" 30
```

- 左对齐、宽度 10（表格专用）

```bash
$ printf "%-10s %-5d\n" "张三" 28 李四 30
```

- 保留 2 位小数

```bash
$ printf "%.2f\n" 3.1415926535
```

- 输出进制

```bash
$ printf "%d %x\n" 100 100
```

- 输出颜色

```bash
$ printf "\033[32m%s\033[0m\n" "张三偷吃西瓜"
```

## sed

::: info 说明
不打开文件，直接在命令行修改、替换、删除、新增文本

- 不修改原文件（默认）
- 支持正则
- 日志替换、配置文件修改神器

:::

### 核心语法

```bash
$ sed [选项] '命令' 文件
```

### 常用选项

| 参数 |                作用                |
| :--: | :--------------------------------: |
| `-n` | 只打印匹配的行（取消默认输出全部） |
| `-i` |     直接修改文件（危险但常用）     |
| `-e` |             多条件编辑             |
| `-r` |            支持扩展正则            |

### 核心命令

|    参数     |       作用       |
| :---------: | :--------------: |
| `s/旧/新/g` | 替换（最常用！） |
|     `p`     |      打印行      |
|     `d`     |      删除行      |
|     `a`     |      追加行      |
|     `i`     |      插入行      |
|     `c`     |     替换整行     |

### 常用操作

- 替换字符串

```bash
$ sed 's/old/new/g' file.txt
```

- 直接修改文件（`-i`）

```bash
$ sed -i 's/old/new/g' file.txt
```

- 只打印第 3 行

```bash
$ sed -n '3p' file.txt
# 默认打印所有行
$ sed -n 'p' test.txt
```

- 打印 2-5 行

```bash
$ sed -n '2,5p' test.txt
```

- 删除包含 `xxx` 的行

```bash
$ sed '/error/d' file.txt
```

- 某一行后面追加内容（a）

```bash
$ sed '2a 第二行后面追加内容' test.txt
```

- 某一行前面插入内容（i）

```bash
$ sed '3i 第三行前面插入内容' test.txt
```

- 替换整行内容

```bash
$ sed -i '/蟠桃/c 我替换这一整行内容' test.txt
```

- 多个匹配条件

```bash
$ sed -e 's/a/A/g' -e 's/b/B/g' file.txt
```

- 忽略大小写替换

```bash
$ sed 's/hello/hi/gi' file.txt
```

- 只替换匹配行的内容

```bash
# 将蟠桃所在行里的猕猴桃，替换为水蜜桃
$ sed -i '/蟠桃/s/猕猴桃/水蜜桃/g' test.txt
```

## shuf

::: info 说明
shuf 是 Linux 中用于随机打乱输入内容的命令，可对文本行、数字范围等进行随机排序 / 抽样，常用于生成随机序列、随机选值等场景。
:::

### 命令参数表

|    参数     |                                  作用                                  |
| :---------: | :--------------------------------------------------------------------: |
|  -e/--echo  |         把空格分隔的每个参数当作一行输入，直接随机打乱这些参数         |
|  -i LO-HI   | 生成 LO-HI 之间的整数序列，再随机打乱（如 -i 1-10 生成 1-10 随机序列） |
|  -n COUNT   |              只输出前 COUNT 行（随机抽样，而非全部输出）               |
|   -o FILE   |                      将结果写入文件，而非终端输出                      |
| -r/--repeat |                 允许重复输出同一行（可超出原输入行数）                 |
|     -z      |             用 NUL 字符分隔行（而非换行符，适配脚本处理）              |

- 测试文件 `test.txt`

```md
苹果 橘子 香蕉
草莓 猕猴桃 桃子
西瓜 芒果
火龙果
```

### 基础命令

- `shuf`

> 随机打乱文件内容

```bash
$ shuf test.txt
```

- 打乱后写入新文件（替代终端输出）

```bash
$ shuf test.txt -o shuffled_test.txt
```

- `-e`

> 随机打乱指定的参数（直接输入值）

```bash
$ shuf -e 苹果 香蕉 橙子
```

- `-i`

> 生成随机数字序列（指定范围）

```bash
$ shuf -i 1-10
```

- `-n`

> 指定多少个随机抽样

```bash
$ shuf -i 1-10 -n 5
```

- `-r`

> 允许重复抽样，最好配合指定次数 `-n`，否则会无限抽样输出内容，如果输出到文件几秒钟文件就变成几个G的大小！

```bash
$ shuf -i 1-20 -n 5 -r
```

### 应用场景

- 随机抽取 3 个用户（从用户列表中）

```bash
# 假设 users.txt 每行一个用户名，随机选3个
$ shuf -n 3 users.txt

# 输出示例：
# zhangsan
# lisi
# wangwu
```

- 生成 6 位随机数字密码（无重复）

```bash
shuf -i 0-9 -n 6 | tr -d '\n'  # tr -d 去掉换行符，合并为一行
# 输出示例：859274
```

- 随机打乱并覆盖原文件（注意：先输出到临时文件，再替换）

```bash
shuf test.txt -o temp.txt && mv temp.txt test.txt
```

### 注意事项

::: warning 注意事项（避坑）

- 覆盖原文件的坑：不要直接 shuf test.txt -o test.txt，会先清空 test.txt 再写入，导致文件为空；
- 参数顺序：-n/-o 等参数需放在输入源（文件 / 范围）之后；
- 空输入处理：若输入文件为空 / 范围无效（如 -i 10-5），shuf 会直接退出，无输出；
- 兼容性：shuf 是 GNU coreutils 工具，Linux 系统默认自带，macOS 需安装 coreutils（brew install coreutils，使用 gshuf 替代）。
  :::

## curl

::: info 介绍

`curl` 是什么？

可以这样说，`curl` 就是命令行里的浏览器，或接口调试工具。

不用打开浏览器、不用 Postman，直接在终端就能发 HTTP 请求。

:::

### 命令参数表

|        参数         |                 作用                 |
| :-----------------: | :----------------------------------: |
|        `-X`         |             指定请求方式             |
|        `-H`         |      请求头参数，键值对方式添加      |
|        `-I`         |            只看响应头信息            |
|        `-L`         |   跟随重定向（301/302），自动跳转    |
|        `-O`         | 下载文件，使用网络文件本身的名字保存 |
|   `-o` `file.txt`   |          保存响应到指定文件          |
|        `-i`         |          显示响应头和响应体          |
|        `-v`         |       显示详细请求过程（调试）       |
|        `-x`         |          使用代理服务器请求          |
|        `-m`         |        设置超时时间（单位秒）        |
| `--connect-timeout` |      设置连接超时时间（单位秒）      |
|  `-u` `user:pass`   |               基础认证               |
|  `-b` `"key=val"`   |              带 Cookie               |

- `-X` 定方法
- `-H` 加请求头
- `-d` 发数据
- `-L` 跟跳转
- `-v` 看详情
- `-O/-o` 下文件
- `-F` 传文件
- `-b/-c` 玩 Cookie

### 基础命令

- 发送 GET 请求直接获取内容

```bash
$ curl https://www.baidu.com
```

- 只看响应头（不看内容）

```bash
$ curl -I https://www.baidu.com
```

- 带请求头（比如 token、Content-Type）

```bash
$ curl -H "Authorization: Bearer 123456" -H "Content-Type: application/json" https://api.com
```

- POST 请求携带参数

```bash
# 这种方式属于 application/x-www-form-urlencoded
$ curl -X POST -d "username=admin&password=123456" https://www.baidu.com
# 或者把参数指令和POST合起来写 curl -XPOST -d "username=admin&password=123456" https://www.baidu.com
```

- POST 发送 JSON 数据

```bash
$ curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "123456"}'
# 从文件读取 JSON，使用 json 文件数据发送
$ curl -X POST -H "Content-Type: application/json" -d @temp.json https://www.baidu.com
```

- 下载文件

```bash
$ curl -O http://localhost:5173/jike/global.png
# 断点续传
$ curl -C - -O https://example.com/bigfile.zip
```

- 跟随重定向（301/302）

```bash
$ curl -L https://baidu.com
```

- 上传文件（multipart/form-data）

```bash
$ curl -F "avatar=@/path/me.jpg" example.com/upload
```

- Cookie

```bash
# 发送 Cookie
$ curl -b "session=abc123; uid=1000" example.com

# 保存响应 Cookie 到文件
$ curl -c cookies.txt example.com

# 从文件加载 Cookie
$ curl -b cookies.txt example.com
```

- 代理与超时

```bash
# 使用代理的方式请求百度
$ curl -x http://localhost:7890 www.baidu.com
# 设置请求超时时间为 0.5 秒
$ curl -m 0.5 -x http://localhost:7891 www.baidu.com
```
