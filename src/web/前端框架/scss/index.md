# Scss 基础

> - 官方参考文档: [前往`Sass`官网](https://sass-lang.com/)
> - 中文文档: [前往`Sass`中文文档](https://www.sass.hk/)

## 环境搭建
::: tip 环境搭建

> - 前提需要安装VSCode插件`Live Sass Compiler`，之后就可以在下面的状态栏启动运行了。该插件会实时根据scss文件变化进行编译生成css文件。
> - `.scss`文件名前面加`_`下划线，不会被编译成对应的`css`文件。比如`vars.scss`文件，你应该取名为`_vars.scss`，那么就不会编译出对应的单个`vars.css`文件了。记住：导入`_vars.scss`模块的时候，导入文件名不需要加`_`下划线，直接就写成你的`scss`存放路径加`不带下划线和后缀的文件名`，比如`@import 'vars';` 即可！！！

::: details
::: code-group
```json [settings.json]
{       
    /** other settings... */
    "liveSassCompile.settings.formats": [
        {
            /*
                nested: 嵌套格式
                expanded: 展开格式
                compact: 紧凑格式
                compressed: 压缩格式
            */
            "format": "expanded",       // 编译的css格式
            "extensionName": ".css",    // 扩展名
            "savePath": "/dist",    // 保存路径(null 的话, 保存到和源文件同一目录。 ~、/标识当前VSCode打开的项目根目录)
        },
    ],
    /* 排除目录 */
    "liveSassCompile.settings.excludeList": [
        "/**/node_modules/**",
        "/.vscode/**"
    ],
    /*包含编译的文件*/
    "liveSassCompile.settings.includeItems": [
        "/src/**/**.scss",     // 有哪些目录下的scss文件需要编译，就包括在这里来
    ],
    /* 是否生成对应的 map 文件*/
    "liveSassCompile.settings.generateMap": false,  // 是否生成对应的 map 文件
    /* 是否添加浏览器兼容前缀 */
    "liveSassCompile.settings.autoprefix": false,  // 是否添加浏览器兼容前缀, 设置为false，那么不管浏览器兼容问题，只生成标准的css
    /*"liveSassCompile.settings.autoprefix": [
        "> 1%", // 兼容最新的浏览器版本
        "last 2 versions",  // 兼容最新两个版本
    ]*/
}
```

:::

## 注释
```scss
// 单行注释

/**
多行注释内容

*/
```

## sass 数据类型
```scss
// 空值
$var1: null;
// 数字
$var2: 520;
$var3: 520px;
// 字符串
$var4: "*";
// 颜色
$var5: red;
$var6: #0f0;
$var7: rgb(0, 0, 255);
// 布尔值
$var8: true;
// list数组
$var9: 1px, 2px, 3px; // 逗号的方式定义数组
$var10: 4px 5px 6px; // 空格的方式定义数组
// map对象
$var11: (
    name: "zy",
    age: 18
);

```

## 定义变量
::: info
> - 遵循先定义后使用的规则。
> - 变量命名要求：以`$`开头，中间由数字、大小写字母、`_`、`-`组成，不能以数字开头。
> - 在选择器中改写全局变量可以通过 `!global`
> - 通过 `!default` 定义变量默认值，如果后面重新赋值，则采用新的值。

:::

```scss
// 赋予默认值
$a: red !default;
$a: blue;   // 可以修改默认值

// 定义变量
$sidebar-width: 100px;
// 改写变量
.header {
    //不加 !global 就表示创建了一个同名的局部变量，对变量的任何操作都不会影响外部变量的值
    $sidebar-width: 200px !global; // 已经被修改, 后面再使用就会受到影响
    width: $sidebar-width;
}
.main {
    width: $sidebar-width;
}
```

## 使用变量
```scss
$var: 5px 10px 20px;
$var1: red;
$var2: (
    name: "zy",
    age: 18
);

.header::after {
    margin: $var; // 使用数组的所有值
    padding: nth($list: $var, $n: 1);   // 通过 nth 函数来获取数组里面具体某一项的值
    // 对象通过 map-get 函数获取值, 如果键不存在则返回 null, null会被忽略
    content: map-get($map: $var2, $key: "name");
    color: $var1;
}
```

## 导入
::: tip 说明
> - 通过 `@import url('xxx.css')` 可以导入`css`模块和请求远程css资源，但是不能用来导入`scss`模块。
> - 通过`@import` 可以导入`scss`模块，在导入`scss`模块时，不需要加`.scss`文件名后缀。

:::

- 导入`css`资源
```scss
@import './custom.css';
@import url('xxx.css');
@import url('https://xxx.com/custom.css');
```

## 嵌套

::: details
```scss
body {
    @include size(100px, 160px);
    // (1)子孙选择器
    .container {
        @include size(100vw, 100vh);
        background-color: #eee;
    }
    // (2)直接选择器(子代选择器)
    > .row {
        width: 100%;
    }
    // (3)伪元素选择器
    &::after {
        content: "";
        display: block;
        background-color: #f00;
    }
    // (4)兄弟选择器, 也可以在前面加 &, 标识父级元素与其拼接成的选择器
    + .row {
        margin-top: 20px;
    }
    // (5)选择除该元素外其他后面平级的兄弟元素
    div ~ .col {
        color: black;
    }
    // (6)选中具有符合条件的所有元素
    &::has(+ input[data-required])::after {
        content: "*";
        color: red;
    }
    // (7) 选中具有多个类名的元素
    .base {
        &.second {
            color: red;
        }
    }
}
```
:::

## 继承

::: code-group
```scss [基础的]
.alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 12px;
}

.alert-info {
    @extend .alert;
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
}

```

```css [编译后的结果]
.alert, .alert-info {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px;
}

.alert-info {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
```

```scss [其他]
// 占位(.btn 与 %base 之间空格表示的意思就不一样了)
// .btn%base 是一个元素同时具有两个类名，.btn %base是一个具有 .btn 类名的元素，其子孙元素身上具有 .btn-default
.btn%base {
    width: 100px;
    height: 50px;
}
// 样式继承
.btn-default {
    @extend %base;
}
```
```css [%base前没有空格的编译结果]
.btn.btn-default {
  width: 100px;
  height: 50px;
}
```
```css [%base前有空格的编译结果]
.btn .btn-default {
  width: 100px;
  height: 50px;
}
```
:::

## 占位符
::: info 说明
> 你可能发现被继承的css父类并没有被实际应用，也就是说html代码中没有使用该类，它的唯一目的就是扩展其他选择器。
>
> 对于该类，可能不希望被编译输出到最终的css文件中，它只会增加css文件的大小，永远不会被使用。
>
> 这就是占位符选择器的作用。
>
> 占位符选择器类似于类选择器，但是，它们不是以句点`(.)`开头，而是以百分号`(%)`开头。
>
> 当在Sass文件中使用占位符选择器时，它可以用于扩展其他选择器，但不会被编译成最终的CSS。

:::
::: code-group

```scss [源代码示例]
%alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 12px;
}

.alert-info {
    @extend %alert;
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
}
```
```scss [编译后的结果]
.alert-info {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px;
}

.alert-info {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
```
:::

## 各种运算符
- 等号运算符

| 运算符 |       功能描述       |
| :----: | :------------------: |
|   ==   |  判断两个值是否相等  |
|   !=   | 判断两个值是否不相等 |

- 关系运算符

| 运算符 | 功能描述 |
| :----: | :------: |
|   <    |   小于   |
|   >    |   大于   |
|   <=   | 小于等于 |
|   >=   | 大于等于 |

- 逻辑运算符

| 运算符 | 功能描述 |
| :----: | :------: |
|  and   |  逻辑与  |
|   or   |  逻辑或  |
|  not   |  逻辑非  |

- 数字操作符

| 运算符 | 功能描述 |
| :----: | :------: |
|   +    |    加    |
|   -    |    减    |
|   *    |    乘    |
|   /    |    除    |
|   %    |   取模   |

::: info 除法运算说明
> 以下三种情况`/`将被视为除法运算符号：
> - 如果值或值的一部分，是变量或者函数的返回值
> - 如果值被圆括号包裹
> - 如果值是算术表达式的一部分
> - 相同单位相除，单位会被抵消掉。
:::

:::info `%`百分比单位运算细节
> `%`只能与同单位的相加减，不能与其他单位相加减。因为不能确定这个百分比具体是多少`px`。而像`pt`这种系统固定单位，就可以与`px`单位进行运算。

> `*`乘法不能用于两个都带单位的值运算，否则单位也会被连接起来。
:::

- 字符串运算

- 插值语句
> - 通过`#{变量}`的方式将值插入到这个位置。

::: code-group
```scss [源代码]
$font-size: 12px;
$line-height: 30px;
p {
    font: $font-size/$line-height Helvetica;
}
```
```css [编译后不符合预期的结果]
/**显然不是我们想要的结果 */
p {
  font: 0.4 Helvetica;
}
```
```scss
/**通过 #{变量} 方式将值插入到这里来 */
$font-size: 12px;
$line-height: 30px;
p {
    font: #{$font-size}/#{$line-height} Helvetica;
}
```
```scss [编译后的正确结果]
p {
  font: 12px/30px Helvetica;
}
```
```scss [示例二]
$class-name: danger;
$attr: color;
p.#{$class-name} {
    border-#{$attr}: #f00;
}
```
```css [编译后的结果]
p.danger {
  border-color: #f00;
}
```
:::


## 判断
> 判断语句使用`@if`、`@else if`、`@else`指令组合进行控制。

```scss
$theme: "light";
.container {
    @if $theme == "light" {
        background: #fff;
    } @else if $theme == "dark" {
        background: #000;
    } @else {
        background: white;
    }
}
```

## 内置函数
|   函数名称    |                 功能描述                 |
| :-----------: | :--------------------------------------: |
|    darken     |  返回对颜色值按调暗百分比计算后的颜色值  |
|    lighten    | 返回对颜色值进行调亮百分比计算后的颜色值 |
|    opacify    |    返回对颜色值按透明度叠加后的颜色值    |
|     quote     |              向文本添加引号              |
|    unquote    |             将字符串引号去掉             |
|  str-length   |              获取字符串长度              |
| string-insert |         将内容插入字符串指定位置         |
|  percentage   |        将无单位的数值转换为百分比        |
|     round     |       将数字四舍五入为最接近的整数       |
|      min      |           获取几个数字中最小值           |
|      max      |           获取几个数字中最大值           |
|    random     |              返回一个随机数              |

- 颜色函数

::: code-group
```scss [源代码]
p {
    color: lighten(#f00, 20%);               // 计算调亮后的颜色
    background-color: darken(#fff, 20%);    // 计算调暗后的颜色
    border-color: opacify($color: rgba(255, 0, 0, 0.1), $amount: 0.6);  // 会进行叠加，且amount不能为负数
}
```
```css [编译后的结果]
p {
  color: #ff6666;
  background-color: #cccccc;
  border-color: rgba(255, 0, 0, 0.7);
}
```
:::


## 混合
::: tip
> 混合指令可以将各种代码写到一块，通过 `@include` 指令将这一块的代码引入到需要的地方。

> - `mixin`是可以重复使用的一组`css声明`。
> - `mixin`有助有减少重复代码，只需声明一次，就可以在文件中引用。
> - 混合指令可以包含所有的`css规则`，绝大部分`Sass规则`，甚至可以通过参数功能引入变量，输出多样化的样式。
> - 使用参数时建议加上默认值。

:::

- (1)无参数可以使用不带括号的方式定义混合
```scss
@mixin block {
    /* 可以写所有的css代码，还可以写部分scss代码 */
    width: 100vw;
    height: 100vh;
    border-radius: 50%;
    border: 1px solid red;
}
.container {
    @include block;
}
```

- (2)无参数也可以使用括号的方式定义混合
```scss
@mixin block() {
    width: 100vw;
    height: 100vh;
}
.container {
    @include block();
}
```

- (3)mixin参数: 定义必选参数
```scss
@mixin block($wdith, $height) {
    width: $wdith;
    height: $height;
}
.container {
    @include block(100vw, 100vh);
}
```

- (4)mixin参数: 指定参数默认值
```scss
@mixin block($width: 100vw, $height: 100vh) {
    width: $width;
    height: $height;
}
.container {
    /**不指定给某个参数传值，那么就按照原来参数的顺序依次传入 */
    @include block(100px, 200px);
}
.container {
    /**参数有默认值的情况下，可以指定给某一个参数传值 */
    @include block($height: 100px);
}
```

- (5)剩余参数
> 剩余参数：通过 `...` 符号来定义剩余参数，剩余参数可以接收任意个参数，并且也可以指定默认值。比如下面的`arr`。

```scss
@mixin block($wdith, $arr...) {
    width: $wdith;
    padding: $arr;
}
.container {
    @include block(100vw, 10px, 20px, 30px, 40px);
}
```

