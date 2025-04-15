# JS 的使用技巧

## `var`、`let`、`const`区别

::: tip 详解

| 关键字  | 作用及注意事项                                                                                                                         |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `var`   | 定义`具有穿透作用域的`（全局）变量，不管在哪里定义，都会变成全局作用域的变量，定义后可以修改变量的值                                   |
| `let`   | 定义局部变量，纠正了`var`关键字定义变量所带来的作用域的副作用，`let`定义的变量是局部作用域的，不可被外部访问到，定义后可以修改变量的值 |
| `const` | 定义局部变量，定义的同时必须赋值，变量与值建立了不可断掉的引用关系                                                                     |

:::

## `==`和`===`的区别

- `==`（相等运算符）：在使用 `==` 进行比较时，JavaScript 会尝试进行类型转换，然后再比较两个值是否相等。
- `===`（严格相等运算符）：在使用 `===` 进行比较时，JavaScript 会先比较两个值的类型，只有在类型相同的情况下才会比较它们的值。

## `&&`、`||`、`!`、`&`、`|`、`^`的区别

- `&&`（逻辑与）：允许你把两个或多个表达式连在一起，只有所有的表达式都必须单独评估为 `true`，整个表达式才能返回 `true`。
- `||`（逻辑或）：允许你把两个或多个表达式连在一起，其中一个或多个表达式必须单独评估为 `true`，整个表达式才能返回 `true`。

- `!`（逻辑非）：对表达式的布尔值取反并返回。比如下面这些值布尔值取反的结果`!null = true`、`!undefined = true`、`!0 = true`。

- `&`（按位与）：对两个操作数的每一个位执行逻辑与操作。只有在两个对应位`都是`1 的情况下，结果位才是 1，否则为 0。

- `|`（按位或）：对两个操作数的每一个位执行逻辑或操作。只要两个对应位中`有一个`为 1，结果位就是 1，否则为 0。

- `^`（按位异或）：对两个操作数的每一个位执行逻辑异或操作。当两个对应位相同时，结果位为 0；当两个对应位不同时，结果位为 1。

## 三元表达式

::: info 备注

三元表达式中，第一个对象为条件，当条件为真时，返回表达式 1 的值，否则返回表达式 2 的值。

:::

```js
condition ? 表达式1 : 表达式2
```

## 扩展运算符

::: tip 说明：

> 同样适用于深层级的复杂对象, 展开哪个层级, 对应的层级就会被拆散成一个个子项目.

:::

:::code-group
<<< @/public/code/JavaScript/example.js#objectExpand [对象扩展]
<<< @/public/code/JavaScript/example.js#arrayExpand [数组扩展]
:::

## 对象和数组的解构赋值

> 将 `=` 右边对象里面的值解构赋值给左边, 如果是数组解构, 那么按位置对应赋值; 如果是对象解构, 则按键名对应赋值. `如果是深层级的复杂类型解构, 那么最终解构有效的只有最内层的变量. 外层的变量都算是层级查找, 并不会返回变量给用户使用.`

1. 简单解构

::: code-group
<<< @/public/code/JavaScript/example.js#objectSimpleDeconstruct [对象的简单解构]
<<< @/public/code/JavaScript/example.js#arraySimpleDeconstruct [数组的简单解构]
:::

2. 复杂解构

::: code-group
<<< @/public/code/JavaScript/example.js#objectComplexDeconstruct [复杂对象的解构]
<<< @/public/code/JavaScript/example.js#arrayComplexDeconstruct [复杂数组对象的解构]
:::

## 点链式可选操作符

::: tip 说明：

> 相较于传统地去判断对象里面有没有某个想要的属性, `点链式可选操作符` 的引入 ——> 这种方式显然进一步加快了我们的开发效率. `点链式可选操作符`的功能是先判断前者对象中是否拥有后面需要提取出来的属性, 如果有, 则返回该属性的值; 如果没有, 则返回 `undefined` 值, 而**不会产生因为前者没有需要提取的属性就报错的意外情况**.

:::

<<< @/public/code/JavaScript/example.js#dotchain

## 函数科里化

::: tip 提示：

> 在第二个函数中将 `调用第一个函数作为返回值` , 并传入相应的参数, 这样我们就能在第一个函数中获得外部的实参了. `函数科里化`（也称 `高阶函数`）在 `React`、`Vue` 项目中非常常见.

:::

<<< @/public/code/JavaScript/example.js#functionCoriolization

## 『与』『或』『非』功能

::: info 说明：

> `&&` （与）的特性：当 `&&` 前面的值为真（除 `0`、`null`、`false`、`undefined`、`NaN`、`''`、`""`、`document.all` 外，其他全为 `真`），则 `与路` 导通，`&&` 操作符返回后面的值. 否则返回 `假`. （`遇假则假`、`全真则真`）

> `||` （或）的特性：跟 `&&` 相反，当 `||` 前面的值为 `真` 就返回该值，不再看后面的值（也就不再执行后面的逻辑）；当前面的值为 `假` ，则看后面的值：如果后面的值为 `假` ，则返回 `假` ，如果后面的值为 `真` ，则返回后面的值（`真`）. （`遇真则真`、`全假则假`）

> `!` （非）的特性：将 `!` 后面的值的布尔值取反.

:::

::: code-group

<<< @/public/code/JavaScript/example.js#and [与]

<<< @/public/code/JavaScript/example.js#or [或]

<<< @/public/code/JavaScript/example.js#not [非]
:::

## 移位

<script setup>
import ShiftBit from './components/ShiftBit.vue'
</script>

::: tip 提示：

> `js` 这门编程语言中是有 `算术右移` 和 `逻辑右移` 之分的. 不管是 `算数左移` 还是 `逻辑左移` ，低位都是 `补 0` ，所以就没有 `逻辑左移` 的符号 （类似于 `<<<`）了.

> `算术右移` 的高位 `补符号位`，即如果是 `负数` 算术右移，那么高位补 `1`，如果是 `正数` 算术右移，高位补 `0`.

> `逻辑右移`的高位不管是正数或负数，都用 `0` 来补.

<ShiftBit />

:::

::: code-group

<<< @/public/code/JavaScript/example.js#shiftbit1 [算术右移]

<<< @/public/code/JavaScript/example.js#shiftbit2 [逻辑右移]

:::

## 异或操作

::: tip

> `异或运算` 是对两个值的补码形式进行运算, 相同位置上的 `位相同` 结果为 `0`，`位不相同` 结果为 `1`.

> 如下：2 ^ 3 = ? `(按 8 位来算)`

:::

<<< @/public/code/JavaScript/example.js#xor

## 函数参数

::: tip 细节

1. 顺序形参正常接收实参传入的对应位置的值，`...rest`将没有形参接收的所有实参值打包成数组给`rest`变量接收住。
2. `arguments`是内置的接收所有外部传入的实参的变量。
3. 传入对象类型的参数，那么形参可以进行解构

:::

```js
// rest 参数接收所有多余的实参
function printArguments(x, y, ...rest) {
  console.log(x, y, rest)
  console.log(arguments)
}
printArguments(1, 2, 5, 'hello')

// 形参对传入的实参进行解构赋值
function Vue({ el, data }) {
  console.log(el, data)
}
Vue({
  el: '#app',
  data: {
    person: {
      name: 'zs',
      age: 18,
    },
  },
})
```

![函数参数接收问题](/pictures/JavaScript/函数参数接收问题.png)

## 隐藏的中文编程

::: info 拓展

- JavaScript 借鉴了 Java 的大部分语法，但同时也受到 Awk、Perl 和 Python 的影响。
- JavaScript 是**区分大小写**的，并使用 **Unicode** 字符集。举个例子，可以将单词 Früh（在德语中意思是“早”）用作变量名。

:::

```js
function 打招呼() {
  let 早上好 = 'Good morning!'
  console.log(早上好)
}
打招呼()
// >>> Good morning!
```

## 七种基本数据类型、一个 Object 数据类型

| 类型                     | 数据                                                       |
| ------------------------ | ---------------------------------------------------------- |
| null                     | 表示 null 值的特殊关键字                                   |
| undefined                | 表示变量未赋值时的属性                                     |
| 数字（Number）           | 42, 63.1, 3.1415926                                        |
| 字符串（String）         | 'holly'                                                    |
| 布尔类型（Boolean）      | true 或 false                                              |
| 符号类型（Symbol）       | 一种实例是唯一且不可改变的数据类型                         |
| 任意精度的整数（BigInt） | 可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制 |
| 对象（Object）           | `{id: 1, name: '张三'}`                                    |

## JS 推荐定义私有字段的方式

```js
class Vue {
  #el
  #data
  constructor({ el, data }) {
    this.#el = el
    this.#data = data
  }

  #print() {
    console.log(this.#el, this.#data)
  }
}
const app = new Vue({
  el: '#app',
  data: {
    person: {
      name: 'zs',
      age: 16,
    },
  },
})
console.log(app)
```

## 获取指定区间内的随机数

```js
// 获取 [min, max]之间的随机整数
function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
```

## 文字描边

```css
.text-stroke {
  text-align: center;
  -webkit-text-stroke: 1px orangered; /**有兼容性问题，没有作用也不要惊讶 */
  color: transparent;
}
.text-stroke::before {
  content: 'Hello World!'; /**内容改成自己标签里面的内容 */
  position: absolute;
  color: #000;
  transform: translate(-10px, -2px) skew(30deg);
  z-index: -1;
  filter: blur(2px);
  -webkit-mask-image: linear-gradient(transparent, #000);
}
```

![文字描边](/pictures/JavaScript/文字描边.png)

## 伸缩盒

```css
.container {
  width: 100%;
  height: 100vh;
  display: flex;
}
.part {
  flex-grow: 1; /**不考虑子容器有内容的情况下，子容器去分掉剩余的空间，每人占一份 */
  flex-basis: 0; /**将父容器平等均分，尽管子容器有内容，该子容器也不会多占内容的空间 */
  /**上面两行代码简写 */
  flex: 1 0 0; /**每个占有的分数、是否压缩、不计算内容宽度 */
}
```

## 文字、图片、视频变成科技数字的库

::: tip 库文档

> 推荐：[前往官网](https://gitcode.com/Sunny-117/text-image/overview)

:::

## 组合权限

```js
// 组合权限
// 可新增
const CREATE = 0b0001
// 可删除
const DELETE = 0b0010
// 可修改
const UPDATE = 0b0100
// 可浏览详情
const DETAIL = 0b1000

// 假设用户权限: 3 表示可以创建和删除，那么就可以用下面的方式得到权限结果
const authority = CREATE | DELETE | UPDATE
// 判断用户是否拥有某权限、与谁就剩下谁的权限
const new_authority = authority & DELETE // 0b0111 & 0b0010 => 0b0010 DELETE
console.log(authority, new_authority)
```

## 认识 Promise

::: tip 深入认识 Promise

> 1. 调用第一个函数，则表示成功，promise 状态改变为 `fulfilled`
>    在 promise 实例对象调用 then 方法时，会执行 `then((result) => {}, (reason) => {})` 第一个函数，参数`result`为 `resolve 函数`中传入的结果。

> 2. 调用第二个函数，则表示失败，promise 状态改变为 `rejected`
>    在 promise 实例对象调用 then 方法时，会执行 `then((result) => {}, (reason) => {})` 第二个函数，参数`reason`为 `reject 函数`中传入的结果。

> 3. 当调用 `reject函数` 之后，也可以通过 promise 的 `catch((reason) => {})` 函数来捕捉到错误结果。

> 4. 当调用 then 方法时，会返回一个新的 Promise 对象，状态是 `pending` （待定）的。

> 5. Promise 中不调用 `resolve` 或 `reject` 函数来改变状态，就不会执行 `then(()=> {}, () => {})`中的任何函数。

> 6. then 方法中，通过 `return xxx` 可以将 then 产生的新的 Promise 对象的状态改为 `fulfilled`。

> 7. then 方法中，如果成功执行的函数出错了，新的 Promise 对象的状态会变成 `rejected`，在后面的新实例调用 then 时，会执行第二个函数。

> 8. 当 Promise 状态为 `rejected` 或者程序代码出错时，会执行 `catch` 中的函数。

:::

```ts
const promise = new Promise((resolve: Function, reject: Function) => {
  // 1、调用第一个函数，则表示成功，promise状态改变为 fulfilled
  //    在promise实例对象调用 then 方法时，会执行 then((result) => {}, (reason) => {}) 第一个函数，参数为 resolve 函数中传入的结果
  resolve('成功时返回的结果')
  // 2、调用第二个函数，则表示失败，promise状态改变为 rejected
  //    在promise实例对象调用 then 方法时，会执行 then((result) => {}, (reason) => {}) 第二个函数，参数为 reject函数中传入的结果
  // reject("失败时返回的结果");
})
promise
  .then(
    result => {
      // 成功执行这个函数
      console.log(result)
    },
    reason => {
      // 失败执行这个函数
      console.log(reason)
    },
  )
  .catch(reason => {
    console.log(reason)
  })
```

## Promise 的理解

```js
Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(4)
  })
  .then(res => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })
```

## 绑定 this 指向

::: tip

> 在原型身上挂载一个方法，用来改变函数的 this 指向

:::

```js
Function.prototype.recall = function (ctx, ...args) {
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx)
  let key = Symbol('tmp')
  Object.defineProperty(ctx, key, {
    enumerable: false,
    value: this,
  })
  let result = ctx[key](...args)
  delete ctx.fn
  return result
}

function method(a, b) {
  console.log(this)
}

let obj = {
  id: 1,
  name: 'zs',
}
method.recall(obj, 1, 2) // 此时method的 this 指向了obj对象
```

## 动态执行 JS 代码

```js
/**动态执行JS代码 */
var a = 1
function exec(code) {
  var a = 2
  // (1)同步执行代码、局部作用域
  eval(code)
  // (2)同步执行代码、全局作用域
  // const fn = new Function(code)
  // fn()
  // (3)同步执行代码、全局作用域
  // const script = document.createElement('script')
  // script.innerHTML = code
  // document.body.appendChild(script)
  // (4)异步执行代码、全局作用域
  setTimeout(eval(code), 0)
}
// (1)、(2)
exec('console.log(a)')
// (3)
// exec('console.log(a)')
// (4)
// exec('() => { console.log(a) }')
```

## 特殊选择器

::: info

> 通过 `:has()` 当某个元素具有某个条件时才选中这个元素
>
> 通过 `:focus-within` 选中只要聚焦在我内部就会触发该伪选择器的效果。

:::

::: details

```vue
<template>
  <div>
    <div class="form-block">
      <label class="label">
        <span>姓名</span>
        <input data-required type="text" />
      </label>
    </div>
    <div class="form-block">
      <label class="label">
        <span>手机号</span>
        <input type="text" />
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-block {
  display: grid;
  place-items: center;
  width: 300px;
  height: 50px;
  font: 1.2em Arial;
  margin: 5px;
  border-radius: 10px;
  transition: all 0.5s;

  /**意思是聚焦在我的内部，不管是我内部的后代元素上，也会触发我身上的下面这个伪选择器的效果 */
  &:focus-within {
    background-color: #eee;
  }

  .label {
    > span {
      margin: 0px 5px;
    }

    /**.label 后代span标签拥有条件(兄弟元素含有 data-required 属性)时的after微元素才拥有下面的样式 */
    > span:has(+ input[data-required])::after {
      content: '*';
      color: #f40;
    }

    > input {
      height: 28px;
    }
  }
}
</style>
```

:::

## 类的概念

::: info

> 类的静态成员和方法是附着在类身上的，实例对象身上是没有的，在内存中仅存在一份。
>
> 类的非静态成员和属性是每个实例对象所拥有的，在内存中每一个实例对象都拥有一份。
>
> 所以在面向对象编程中要分清楚怎么合理的更好的规划类的定义，从而减少内存的开销，提高项目的性能。

:::

```js
class Rabbit {
  color
  name
  // 兔子(这个类)的总数: 应该将其定义为静态属性
  static total = 0

  constructor(color, name) {
    this.name = name
    this.color = color
    // 在实例化时，对总数 +1
    Rabbit.total++
  }
}

let r1 = new Rabbit('red', 'Vasya')
let r2 = new Rabbit('black', 'Petya')
console.log(r1, r2)
/**将总数的属性附加到类身上，每当实例化一个兔子对象时，就对类身上的总数加1: 通过类的属性去获取兔子总数 */
console.log(`兔子总数是: ${Rabbit.total}只`)
```

## 粘贴剪贴板图片

::: details

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #editor {
        width: 100%;
        height: 400px;
        border: 1px solid skyblue;
      }
    </style>
  </head>

  <body>
    <div id="editor" contenteditable></div>
    <script>
      const editor = document.getElementById('editor')
      document.addEventListener('paste', event => {
        // length > 0 说明剪贴板当前是文件
        if (event.clipboardData.files.length > 0) {
          // 阻止默认行为
          event.preventDefault()
          // 获取文件
          const file = event.clipboardData.files[0]

          // 创建一个文件读取器对象
          const reader = new FileReader()
          // 绑定加载完成的事件处理函数
          reader.onload = e => {
            // console.log(e)
            const img = document.createElement('img')
            img.style.width = img.style.height = '200px'
            img.src = e.target.result
            editor.appendChild(img)
          }
          // 读取base64编码的数据
          reader.readAsDataURL(file)
        }
      })
    </script>
  </body>
</html>
```

:::

## 定义属性的元数据

> 需要安装: `npm i reflect-metadata`

```ts
import 'reflect-metadata'

interface User {
  username: string
  account: string
  password: string
}
let user: User = {
  username: 'zy',
  account: 'admin',
  password: '123456',
}
// 定义user的name属性键为profile的元数据
Reflect.defineMetadata('profile', { age: 18 }, user, 'name')
// 获取user里面name属性键为profile的元数据
console.log(Reflect.getMetadata('profile', user, 'name'))
```

## `this`指向

| 调用方式          | 示例             | 函数中的`this` |
| ----------------- | ---------------- | -------------- |
| 通过`new`调用     | new method()     | 新实例对象     |
| 直接调用          | method()         | 全局对象       |
| 通过对象调用      | obj.method()     | 前面的对象     |
| call、apply、bind | method.call(ctx) | 第一个参数     |

## 通用防抖函数

```ts
function debounce(func: Function, duration = 500) {
  let timerId: number
  return () => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func()
    }, duration)
  }
}

const hello = () => {
  console.log('hello world')
}
const debounce_func = debounce(hello)

window.onresize = debounce_func
```

## 循环标记

```js
outer: for (let i = 0; i < 10; i++) {
  inner: for (let j = 0; j < 10; j++) {
    if (i === 5 && j === 5) {
      break inner
    }
    console.log(i, j)
  }
}
```

## 自增运算符技巧

::: tip 说明：

记住：先算表达式的值再自增

:::

```ts
var a = 1
// a++ => 1, a = 2
// ++a => 3, a = 3
// a++ => 3, a = 4
// b = 1 + 3 * 3, a = 4
var b = a++ + ++a * a++
console.log(a, b) // 结果为 4 10
```

## 寻找不成对的数字

::: tip 技巧：

利用下面两个规则巧妙寻找不成对的数字：

- 任何数字与自身异或等于 `0`

- `0` 和任何数字异或都等于那个数字

:::

```ts
function findUniqueNumber(...args: number[]) {
  return args.reduce((a, b) => a ^ b, 0)
}
console.log(findUniqueNumber(5, 2, 2, 5, 1, 3, 4, 3, 4))
```

## `undefined` 等价于 `void 0`

```ts
console.log(void 0 === undefined) // true
```

| API                                     | 含义                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------- |
| `Function.prototype.call(obj, ...args)` | 调用函数，绑定`this`为 obj，<br />后续以列表的形式提供参数                  |
| `Function.prototype.apply(obj, args)`   | 调用函数，绑定`this`为 obj，<br />args 以数组的形式提供参数                 |
| `Function.prototype.bind(obj, ...args)` | 返回一个函数的拷贝，新函数的`this`被绑定为 obj，<br />起始参数被绑定为 args |
