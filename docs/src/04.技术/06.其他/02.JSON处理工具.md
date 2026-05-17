# JSON大数据处理工具

::: info 来源
- 推荐: [前往github官网](https://github.com/jqlang/jq)
- 推荐: [jq官方文档](https://jqlang.github.io/jq/)
- 推荐: [jq教程篇](https://jqlang.github.io/jq/tutorial/)
:::

## 安装

::: tip 步骤
由于我是`win11`系统的，接下来我以`win11`的安装配置为例，介绍`jq`的配置与使用。
- 安装：`jq`官网下载对应的`.exe`的可执行程序。
- 配置：`cmd`使用的话，将`jq.exe`文件所在目录添加到系统环境变量；`git bash`使用的话，为`jq.exe`添加软链接符号到`/bin`环境中。

```bash
$ ln -s -f e:/cli/jq.exe /bin
$ ls /bin | grep jq
```
:::

## 基础使用

::: details 基本数据
```json
[
	{
		"name": "张三",
		"age": 20,
		"address": {
			"privence": "广东省",
			"city": "广州市"
		},
		"hobby": ["读书", "听音乐"]
	},
	{
		"name": "李四",
		"age": 25,
		"address": {
			"privence": "浙江省",
			"city": "杭州市"
		},
		"hobby": ["唱跳rap", "游泳"]
	},
	{
		"name": "小青",
		"age": 18,
		"address": {
			"privence": "河南省",
			"city": "开封市"
		},
		"hobby": ["旅游", "爬山"]
	}
]
```
:::

### 格式化输出
```bash
$ cat data.json | jq .
```

### 提取数组元素
```bash
$ cat data.json | jq '.[0]'
```

::: details 显示结果
```json 结果
{
  "name": "张三",
  "age": 20,
  "address": {
    "privence": "广东省",
    "city": "广州市"
  },
  "hobby": [
    "读书",
    "听音乐"
  ]
}
```
:::


## 进阶使用

::: warning 注意
接下来的命令中，我们将省去展示数据输入的前缀命令`cat data.json | `或者远程方式请求的数据输入例如`curl'https://api.github.com/repos/jqlang/jq/commits?per_page=5' |`，因为它是不变的，这样避免命令过长。
:::

### 获取所有对象
> `jq '.'` 和 `jq '.[]'`的输出结果不一样，前者输出是所有对象的数组，后者输出数组中的每个对象。

```bash
$ jq '.[]'
```

::: details 显示结果
```json
{
  "name": "张三",
  "age": 20,
  "address": {
    "privence": "广东省",
    "city": "广州市"
  },
  "hobby": [
    "读书",
    "听音乐"
  ]
}
{
  "name": "李四",
  "age": 25,
  "address": {
    "privence": "浙江省",
    "city": "杭州市"
  },
  "hobby": [
    "唱跳rap",
    "游泳"
  ]
}
{
  "name": "小青",
  "age": 18,
  "address": {
    "privence": "河南省",
    "city": "开封市"
  },
  "hobby": [
    "旅游",
    "爬山"
  ]
}
```
:::


### 自定义格式化输出

```bash
$ jq '.[] | { name: .name , age: .age }'
```

::: details 显示结果
```json
{
  "name": "张三",
  "age": 20
}
{
  "name": "李四",
  "age": 25
}
{
  "name": "小青",
  "age": 18
}
```
:::

> `.[]`返回的数组的每个元素，每次一个，这些元素都被输入到后面的过滤器安装 `{ name: .name, age: .age}` 进行格式化处理。

### 组装数据

> 将过滤器括在方括号`[]`中来告诉`jq`收集所有结果。

```bash
$ jq '[.[] | { name: .name , age: .age }]'
```

::: details 显示结果
```json
[
  {
    "name": "张三",
    "age": 20
  },
  {
    "name": "李四",
    "age": 25
  },
  {
    "name": "小青",
    "age": 18
  }
]
```
:::


### 嵌套提取
```bash
$ jq '[.[] | { name: .name, addresses: [.address.privence]}]'
$ jq '[.[] | { name: .name, addresses: [.address | .privence], hobby: .hobby[0]}]'
```

::: details 显示结果

```json
[
  {
    "name": "张三",
    "addresses": [
      "广东省"
    ]
  },
  {
    "name": "李四",
    "addresses": [
      "浙江省"
    ]
  },
  {
    "name": "小青",
    "addresses": [
      "河南省"
    ]
  }
]
```
:::


### 数组切片

```bash
# 起始索引是0可以省略, 两者等价
$ jq '[.[] | { name: .name, addresses: [.address | .privence], hobby: .hobby[0:2]}]'
$ jq '[.[] | { name: .name, addresses: [.address | .privence], hobby: .hobby[:2]}]'
```

## 语法基础

### 
```bash
$ jq '.[] | .name, .age'
```

::: details 显示代码
```bash
"张三"
20
"李四"
25
"小青"
18
```
:::


### 语法总结

::: tip 归纳
- `.[]`(当前值本身就是数组)表示遍历数组，如果`.fieldname[]`表示将对象中某个字段的数组进行遍历。
- 外层包`[]`表示收集元素放到一个列表里。
- `.[index]`获取数组中具体索引的元素，索引从`0`开始。`.[]`表示返回数组中的所有元素。
- 管道`|`表示将上一个值传递给后面的过滤器。
- `.foo?`表示获取对象中`foo`字段的值，如果对象中不存在`foo`字段，则返回`null`，不会引起报错。
- `.[]?`表示尝试遍历数组，但如果 不是数组或对象，则不会输出任何错误。
- 如果两个过滤器用逗号分隔，则相同的输入将被输入到这两个过滤器中，并且两个过滤器的输出值流将按顺序连接：首先是左侧表达式产生的所有输出，然后是右侧表达式产生的所有输出。
:::



