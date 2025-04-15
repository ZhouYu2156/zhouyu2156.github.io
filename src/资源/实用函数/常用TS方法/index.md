---
layout: doc
title: 常用TS方法
description: 常用TS方法
navbar: true
sidebar: true
aside: true
lastUpdated: false
footer: false
head:
  - - meta
    - name: description
      content: 常用TS方法
  - - meta
    - name: keywords
      content: 常用TS方法
---

# rabbit-toolkit

## 安装

```bash
$ npm i rabbit-toolkit
```

## 快速上手

```ts
import * as rabbit from 'rabbit-toolkit'

const result = rabbit.fibonacci(10)
console.log(result) //
```

## API

### 判断一个数是否为奇数

```ts
/**
 * 判断一个数是否为奇数
 * @param num 要判断的数字
 * @return {Boolean} 奇数返回true，偶数返回false
 */
export function isPrime(num: number): boolean {
  return num % 2 === 1
}
```

### 计算斐波那契数列指定位置的数值

```ts
/**
 * 计算斐波那契数列指定位置的数值
 * @param position 斐波那契数列的位置
 * @returns {Number} 该位置的斐波那契数值
 */
export function fibonacci(position: number): number {
  let index = 2,
    start = 1,
    end = 1
  while (index < position) {
    end = start + (start = end)
    ++index
  }
  return end
}
```

### 计算一个数的阶乘

```ts
/**
 * 计算一个数的阶乘
 * @param {Number} n 要计算阶乘的数
 * @return {Number} 阶乘结果
 */
export function factorial(n: number): number {
  return n === 0 || n === 1 ? 1 : n * factorial(n - 1)
}
```

### 判断年份是否是闰年

```ts
/**
 * 判断年份是否是闰年
 * @param {Number} year 要判断的年份
 * @return {Boolean} 闰年返回true，平年返回false
 */
export function isLoopYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
```

### 获取一个数的指定二进制位的值

```ts
/**
 * 获取一个数的指定二进制位的值
 * @param {Number} num 求二进制的数
 * @param {Number} index 需要二进制位的索引位置
 * @return {Number} 该二进制位上的bit值，1或0
 */
export function bit(num: number, index: number): number {
  return num & (1 << index) ? 1 : 0
}
```

### 获取一个数的指定二进制位的值

```ts
/**
 * 获取一个数的指定二进制位的值
 * @param {Number} num 求二进制的数
 * @param {Number} index 需要二进制位的索引位置
 * @return {Number} 该二进制位上的bit值，1或0
 */
export function bit(num: number, index: number): number {
  return num & (1 << index) ? 1 : 0
}
```

### 将一个数转换成指定位数的二进制

```ts
/**
 * 将一个数转换成指定位数的二进制，同时返回字符串形式和数组形式的二进制结果
 * @param {Number} num 需要求二进制的目标值
 * @param {Number} bits 需要展示多少位的二进制
 * @return {Array} 返回字符串形式和数组形式的二进制结果
 */
export function bin(num: number, bits: number): (string | number[])[] {
  let tmp = 0,
    r1 = '',
    r2 = []
  for (let i = bits - 1; i >= 0; i--) {
    tmp = bit(num, i)
    r1 += tmp
    r2.push(tmp)
  }
  return [r1, r2]
}
```

### 生成杨辉三角形的字符串展示

```ts
/**
 * 生成杨辉三角形的字符串展示
 * @param {Number} ROW 杨辉三角的行数
 * @param {Number} len 每个数字占的宽度，默认为4
 * @param regular 正三角形：true（默认），直角三角形：false
 * @param {String} align 对齐方式：left、center（默认方式）、right
 * @return {String} 返回杨辉三角的字符串展示
 */
export function YanhuiTriangle(ROW: number, len: number = 4, regular: boolean = true, align: string = 'center') {
  let rows = ROW
  let cols = 2 * ROW - 1
  let center = Math.floor((2 * ROW - 1) / 2)
  // 初始化数组，填充初始值0
  let arr = Array.from({ length: ROW }, () => Array(cols).fill(0))
  // 1、从中心位置向两边边缘位置填充1
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < 1; j++) {
      arr[i][center - i] = 1
      arr[i][center + i] = 1
    }
  }
  // 2、从中间位置开始对两边的数进行求和操作，该行该列的数 = 前一行该列的前一行 + 前一行该列的后一行
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < i; j++) {
      arr[i][center - j] = arr[i - 1][center - j - 1] + arr[i - 1][center - j + 1]
      arr[i][center + j] = arr[i - 1][center + j - 1] + arr[i - 1][center + j + 1]
    }
  }
  // 3、根据参数格式化并打印结果
  let stringTemplate = ''
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < 2 * rows - 1; j++) {
      stringTemplate +=
        arr[i][j] === 0
          ? regular
            ? convertFixedLength('', len, align)
            : ''
          : convertFixedLength(arr[i][j].toString(), len, align)
    }
    stringTemplate += '\n'
  }
  return stringTemplate
}
```

### 将字符串转换为固定长度的格式

```ts
/**
 * 根据指定长度和对齐方式，将字符串转换为固定长度的格式
 * @param {String} str 源字符串
 * @param {Number} len 字符串固定长度
 * @param {String} align 对齐方式：left、center、right
 * @return {String} 加工后的字符串
 */
export function convertFixedLength(str: string, len: number, align: string = 'left'): string {
  let remain = len - str.length
  switch (align) {
    case 'left':
      return str + fillSpace(remain)
    case 'right':
      return fillSpace(remain) + str
    case 'center':
      return fillSpace(Math.floor(remain / 2)) + str + fillSpace(Math.ceil(remain / 2))
    default:
      return str + fillSpace(remain)
  }
}
```

### 生成指定长度的空格字符串

```ts
/**
 * 生成指定长度的空格字符串
 * @param {Number} len 需要的空格长度
 * @return {String} 生成的空格字符串
 */
export function fillSpace(len: number): string {
  if (len < 0) return ''
  let space = ''
  for (let i = 0; i < len; i++) space += ' '
  return space
}
```
