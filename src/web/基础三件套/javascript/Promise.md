
# 深入学习 Promise

## Promise 是什么？

1. 抽象表达
  - ES6 规范
  - JS进行异步变成的新解决方案（旧方案是回调函数）
2. 具体表达
   - 从语法上来说：Promise是一个构造函数
   - 从功能上来说：Promise对象用来封装一个一步操作并可以获取其成功或失败的结果值

> 异步编程：
> * fs文件操作
> * 数据库操作
> * ajax
> * 定时器
> * ...


## 为什么要用Promise？
- 指定回调函数的方式更加灵活
- 支持链式调用，可以解决回调地域问题

## Promise的状态
1. pending （待定状态）
2. pending 变为 `fulfilled`
3. pending 变为 `rejected`

> 说明：只有这三种，且一个 promise 对象只能改变一次，无论变为成功还是失败，都会有一个结果数据，成功的结果数据一般称为 `value`，失败的结果数据一般称为 `reason`。


## ajax 案例

::: details
```ts
const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    const p = new Promise((resolve, reject) => {
        // 1.创建对象
        const xhr = new XMLHttpRequest()
        // 2.初始化
        xhr.open('GET', 'https://api.apiopen.top/getJoke')
        // 3.发起请求
        xhr.send()
        // 4.监听响应事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // 判断响应状态码
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 控制台输出响应体
                    // console.log(xhr.response)
                    resolve(xhr.response)
                } else {
                    // 控制台输出响应状态码
                    // console.log(xhr.status)
                    reject(xhr.status)
                }
            }
        }
    })
    p.then((value) => {
        console.log(value)
    }, (reason) => {
        console.log(reason)
    })
})

```
:::


## 如何使用 Promise？

### Promise API

1. `Promised 构造函数`：Promise(executor) {}
   - `executor函数`：执行器，(resolve, reject) => {}
   - `resolve 函数`：内部定义成功时我们调用的函数 value => {}
   - `reject 函数`：内部定义失败时我们调用的函数 reason => {}
   - 说明：`executor执行器`会在Promise内部立即`同步调用`，`异步操作在执行器中执行`。



2. `Promise.prototype.then` 方法：(onResolved, onRejected) => {}
   - `onResolved 函数`：成功的回调函数 (value) => {}
   - `onRejected 函数`：失败的回调函数 (reason) => {}
   - 说明：指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调，返回一个新的 promise 对象



3. `Promise.prototype.catch` 方法：(onRejected) => {}
   - `onRejected 函数`：失败的回调函数 (reason) => {}
   - 说明：then()的语法糖，相当于：then(undefined, onRejected)



4. `Promise.resolve` 方法：() => {}
   - value: 成功的数据 或 promise对象
   - 说明：返回一个成功/失败的promise对象



```ts
// 如果传入的参数为 非Promise类型的对象，则返回的结果为成功的promise对象
const p1 = Promise.resolve(521)
console.log(p1)
// 如果传入的参数为 Promise对象，则参数的结果决定了 resolve 的结果
const p2 = Promise.resolve(new Promise((resolve, reject) => {
    // 如果参数为 Promise 对象，则外面的resolve的状态由里面的Promise对象的状态决定
    // resolve(520)    // 里面的Promise对象状态因为调用了 resolve，里面的状态变成了 'fulfilled'
    reject('失败的结果') // 里面的Promise对象状态因为调用了 reject，里面的状态变成了 'rejected'
}))
p2.then((value) => {
    console.log(value)
}, (reason) => {
    console.log(reason)
})
```



5. `Promise.reject` 方法：() => {}

   - reason：失败的原因

   - 说明：返回一个失败的 promise 对象



```ts
// 与 Promise.resolve 方法相反，不管传入的是什么，最终返回的 Promise 对象的状态永远都是失败的，失败的结果为传入的对象（Promise对象/非Promise对象）
const p1 = Promise.reject(Promise.resolve(521))
p1.catch(err => {
    console.log(err)
})
```



6. `Promise.all` 方法：(promises) => {}

   - promises：包含n个 promise 的数组

   - 说明：返回一个新的 promise，只有当所有的promise都成功才成功，只要有一个失败了就直接失败。

> 1. Promise.all(promises) {} 接收一个存放promise对象的数组，只有数组中的所有promise对象的状态都为'成功'时，返回的promise对象的状态才为'成功'，返回promise对象的结果为所有promise对象的结果所组成的数组
>
> 2. 只要数组中有一个promise对象的状态为'失败'，返回的promise对象的状态就为'失败'，返回的promise对象的结果为失败的promise对象的结果



```ts
// Promise.all(promises) {} 接收一个存放promise对象的数组，只有数组中的所有promise对象的状态都为'成功'时，返回的promise对象的状态才为'成功'，返回promise对象的结果为所有promise对象的结果所组成的数组
const p1 = Promise.resolve('success01')
const p2 = Promise.resolve('success02')
const p3 = Promise.all([p1, p2])
/*p3.then((value) => {
    console.log(value)
}, (reason) => {
    console.log(reason)
})*/
// 只要数组中有一个promise对象的状态为'失败'，返回的promise对象的状态就为'失败'，返回的promise对象的结果为失败的promise对象的结果
console.log('---------------------------------分割线---------------------------------')
const p4 = Promise.reject('all方法失败演示')  // 失败了，没有then的第二个方法onRejected或catch来处理，会有报错信息，不要惊讶
const p5 = Promise.all([p1, p2, p4])
console.log(p5)
```



7. `Promise.race` 方法：(promises) => {}
   - promises：包含n个promise的数组
   - 说明：返回一个新的promise，第一个完成的promise的结果状态就是最终的结果状态

> Promise.race(promises) 方法接收一个由 promise对象 组成的数组，返回一个promise对象。返回的promise对象的状态由最先执行的promise对象的状态决定，结果为最先执行的 promise 对象的结果。



```ts
// Promise.race(promises) 方法接收一个由 promise对象 组成的数组，返回一个promise对象。返回的promise对象的状态由最先执行的promise对象的状态决定，结果为最先执行的 promise 对象的结果。
const p1 = new Promise((resolve, reject) => {
    reject('First Result.')   // 让 promise 对象的状态为失败
    // resolve("First Result.")     // 让 promise 对象的状态为成功
    /*setTimeout(() => {
        reject(521)
    }, 1000)*/  // 异步任务
})
const p2 = Promise.resolve("Second Result.")
const p3 = Promise.resolve("Third Result.")
const result = Promise.race([p1, p2, p3])
console.log(result)		// 状态: fulfiiled, 结果：First Result.
```



### Promise的几个关键问题



1. 如何改变promise的状态？
   - `resolve(value)`：如果当前是 `pending`就会变为`fulfilled`。
   - `reject(reason)`：如果当前是`pending`就会变为`rejected`。
   - 抛出异常：如果当前是`pending`就会变为`rejected`。



2. 一个promise指定多个成功/失败回调函数，都会调用吗？
   - 当promise改变为对应状态时`都会调用`



3. 改变promise状态和指定回调函数谁先谁后？
   - 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再指定回调
   - 如何先改状态再指定回调？
     - (1)在执行器中直接调用 resolve()/reject()
     - (2)延迟更长时间才调用then()
   - 什么时候才能得到数据？
     - (1)如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
     - (2)如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据



4. promise.then()返回的新promise的结果状态由什么决定？
   - 简单表达：由then()指定的回调函数执行的结果决定
   - 详细表达：
     - (1)如果抛出异常，新promise状态变为`rejected`，`reason`为抛出的异常。
     - (2)如果返回的是`非promise`的任意值，新promise变为`fulfilled`，value为返回的值。
     - (3)如果返回的是另一个新promise，此promise的结果就会成为新promise的结果



```ts
const p1 = new Promise((resolve, reject) => {
    resolve('OK')
})

// promise.then()返回的新promise对象的结果由then所执行的回调函数的结果决定
const result = p1.then((value) => {
    console.log(value)
    // 1.抛出异常
    // throw '出错啦!!!'
    // 2.返回非promise对象的结果: 比如数字、字符串等
    // return "521"
    // 3.返回一个新的promise对象 -> then返回的promise对象的状态和结果由新的promise对象的状态和结果决定
    return new Promise((resolve, reject) => {
        // resolve('123')   // then返回的promise对象的状态为成功
        reject(789)  // then返回的promise对象的状态为失败
    })
}, (reason) => {
    console.log(reason)
})
console.log("result: ", result)
```



5. promise如何串联多个操作任务？
   - （1）promise的`then()`返回一个新promise，可以变成then()的链式调用。
   - （2）通过`then`的链式调用串连多个同步/异步任务。



6. promise异常穿透是怎么回事？
   - （1）当使用promise的then链式调用时，可以在最后指定失败的回调
   - （2）前面任何操作出了异常，都会传到最后失败的回调中处理



7. 中断promise链是怎么回事？
   - （1）当使用promise的then链式调用时，在中间中断，不再调用后面的回调函数
   - （2）办法：在回调函数中返回一个`pending`状态的promise对象





