# Numpy 快速入门

::: info 前言
Numpy 是 Python 中用于科学计算的基础库，提供了多维数组对象和各种派生对象（如掩码数组和矩阵），以及用于快速操作数组的函数。它也是 SciPy 生态系统的基础，SciPy 提供了更多的科学计算功能。使用 Numpy 可以快速实现数组的计算、统计、排序、过滤、聚合等高效的向量化操作。

在学习 Numpy 之前首先要建立一个向量化概念，什么是向量化操作？

向量化操作是指使用Numpy提供的内置函数直接对整个数组进行运算，而不是使用Python循环逐个处理元素。这样做的好处是速度快很多——通常快10-100倍。

简单来说，向量化就是让计算机一次处理整个数组，而不是一个一个处理，这样就能发挥计算机的并行处理能力，速度快得多。特别是在科学计算领域和图像处理中，科学计算任务的矩阵运算和图像本身就是多维数组，必须用向量化才能有好的性能！使用向量化操作的代码看起来更简洁、更易读，而且更符合Python的编程风格。
:::

## 快速创建数组

| 方法             | 描述             |                      示例 |
| :--------------- | ---------------- | ------------------------: |
| np.array()       | 创建一个数组     | np.array([1, 2, 3, 4, 5]) |
| np.zeros()       | 创建一个全0数组  |          np.zeros((3, 3)) |
| np.ones()        | 创建一个全1数组  |           np.ones((3, 3)) |
| np.empty()       | 创建一个空数组   |          np.empty((3, 3)) |
| np.arange()      | 创建一个等差数组 |             np.arange(10) |
| np.linspace()    | 创建一个等差数组 |     np.linspace(0, 10, 5) |
| np.logspace()    | 创建一个对数数组 |      np.logspace(0, 2, 5) |
| np.random.rand() | 创建一个随机数组 |      np.random.rand(3, 3) |

## 常用属性与方法

| 常用方法       | 描述                                               |                      示例 |
| :------------- | -------------------------------------------------- | ------------------------: |
| np.shape       | 获取数组形状，返回一个元组，表示数组的维度         |             np.shape(arr) |
| np.ndim        | 获取数组维度，返回一个整数，表示数组的维度         |              np.ndim(arr) |
| np.size        | 获取数组元素个数，返回一个整数，表示数组的元素个数 |              np.size(arr) |
| np.dtype       | 获取数组元素类型，返回一个数据类型对象             |             np.dtype(arr) |
| np.astype()    | 转换数组元素类型，返回一个新数组                   |     np.astype(arr, dtype) |
| np.reshape()   | 重塑数组形状，返回一个新数组                       | np.reshape(arr, newshape) |
| np.flatten()   | 展平数组，返回一个新数组                           |           np.flatten(arr) |
| np.transpose() | 转置数组，返回一个新数组                           |         np.transpose(arr) |
| np.dot()       | 矩阵乘法，返回一个新数组                           |        np.dot(arr1, arr2) |
| np.sum()       | 求和，返回一个整数                                 |               np.sum(arr) |
| np.mean()      | 求平均值，返回一个浮点数                           |              np.mean(arr) |
| np.std()       | 求标准差，返回一个浮点数                           |               np.std(arr) |
| np.max()       | 求最大值，返回一个浮点数                           |               np.max(arr) |
| np.min()       | 求最小值，返回一个浮点数                           |               np.min(arr) |

## 数组运算

| 运算符 | 描述                           |           示例 |
| :----- | ------------------------------ | -------------: |
| +      | 数组元素相加，返回一个新数组   |    arr1 + arr2 |
| -      | 数组元素相减，返回一个新数组   |    arr1 - arr2 |
| \*     | 数组元素相乘，返回一个新数组   |   arr1 \* arr2 |
| /      | 数组元素相除，返回一个新数组   |    arr1 / arr2 |
| \*\*   | 数组元素幂运算，返回一个新数组 | arr1 \*\* arr2 |
| %      | 数组元素取模，返回一个新数组   |    arr1 % arr2 |
| //     | 数组元素整除，返回一个新数组   |   arr1 // arr2 |
| &      | 数组元素按位与，返回一个新数组 |    arr1 & arr2 |
| \|     | 数组元素按位或，返回一个新数组 |   arr1 \| arr2 |

- 简单说说矩阵乘法的规则

> 规则：结果矩阵的第(i,j)位置 = 第一个矩阵的第i行 与 第二个矩阵的第j列 对应元素相乘后求和。这也有一种俗称叫点积运算。

比如下面的例子：

![numpy矩阵运算](/illustration/numpy矩阵运算.png)

::: tip 重要概念

- 必须满足维度要求：(m×n) × (n×p) = (m×p)

  第一个矩阵的列数必须等于第二个矩阵的行数

- 不可交换：A × B ≠ B × A（矩阵乘法不满足交换律）

:::

## 数组统计

| 统计方法  | 描述                     |         示例 |
| :-------- | ------------------------ | -----------: |
| np.sum()  | 求和，返回一个整数       |  np.sum(arr) |
| np.mean() | 求平均值，返回一个浮点数 | np.mean(arr) |
| np.std()  | 求标准差，返回一个浮点数 |  np.std(arr) |
| np.max()  | 求最大值，返回一个浮点数 |  np.max(arr) |
| np.min()  | 求最小值，返回一个浮点数 |  np.min(arr) |

## 数组排序

| 排序方法          | 描述                             |                        示例 |
| :---------------- | -------------------------------- | --------------------------: |
| np.sort()         | 排序，返回一个新数组             |                np.sort(arr) |
| np.argsort()      | 返回排序后的索引，返回一个新数组 |             np.argsort(arr) |
| np.lexsort()      | 返回排序后的索引，返回一个新数组 |             np.lexsort(arr) |
| np.searchsorted() | 返回排序后的索引，返回一个新数组 | np.searchsorted(arr, value) |
| np.partition()    | 返回排序后的索引，返回一个新数组 |        np.partition(arr, k) |
| np.argpartition() | 返回排序后的索引，返回一个新数组 |     np.argpartition(arr, k) |

## 数组过滤

| 过滤方法         | 描述                               |                       示例 |
| :--------------- | ---------------------------------- | -------------------------: |
| np.where()       | 返回满足条件的索引，返回一个新数组 |        np.where(condition) |
| np.nonzero()     | 返回满足条件的索引，返回一个新数组 |            np.nonzero(arr) |
| np.logical_and() | 返回满足条件的索引，返回一个新数组 | np.logical_and(arr1, arr2) |
| np.logical_or()  | 返回满足条件的索引，返回一个新数组 |  np.logical_or(arr1, arr2) |
| np.logical_not() | 返回满足条件的索引，返回一个新数组 |        np.logical_not(arr) |
| np.logical_xor() | 返回满足条件的索引，返回一个新数组 | np.logical_xor(arr1, arr2) |
| np.logical_and() | 返回满足条件的索引，返回一个新数组 | np.logical_and(arr1, arr2) |
| np.logical_or()  | 返回满足条件的索引，返回一个新数组 |  np.logical_or(arr1, arr2) |
| np.logical_not() | 返回满足条件的索引，返回一个新数组 |        np.logical_not(arr) |
| np.logical_xor() | 返回满足条件的索引，返回一个新数组 | np.logical_xor(arr1, arr2) |

## 数组聚合

| 聚合方法  | 描述                             |         示例 |
| :-------- | -------------------------------- | -----------: |
| np.sum()  | 数组元素求和，返回一个浮点数     |  np.sum(arr) |
| np.mean() | 数组元素求平均值，返回一个浮点数 | np.mean(arr) |
| np.std()  | 数组元素求标准差，返回一个浮点数 |  np.std(arr) |
| np.max()  | 数组元素求最大值，返回一个浮点数 |  np.max(arr) |
| np.min()  | 数组元素求最小值，返回一个浮点数 |  np.min(arr) |

## 数组广播

| 广播方法              | 描述     |                            示例 |
| :-------------------- | -------- | ------------------------------: |
| np.broadcast()        | 广播数组 |        np.broadcast(arr1, arr2) |
| np.broadcast_to()     | 广播数组 |     np.broadcast_to(arr, shape) |
| np.broadcast_arrays() | 广播数组 | np.broadcast_arrays(arr1, arr2) |
| np.broadcast_to()     | 广播数组 |     np.broadcast_to(arr, shape) |

## 数组索引

| 索引方法       | 描述     |                     示例 |
| :------------- | -------- | -----------------------: |
| np.index()     | 索引数组 |     np.index(arr, index) |
| np.index_exp() | 索引数组 | np.index_exp(arr, index) |
| np.index_exp() | 索引数组 | np.index_exp(arr, index) |

## 数组拼接

| 拼接方法          | 描述     |                        示例 |
| :---------------- | -------- | --------------------------: |
| np.concatenate()  | 拼接数组 |  np.concatenate(arr1, arr2) |
| np.stack()        | 拼接数组 |        np.stack(arr1, arr2) |
| np.hstack()       | 拼接数组 |       np.hstack(arr1, arr2) |
| np.vstack()       | 拼接数组 |       np.vstack(arr1, arr2) |
| np.dstack()       | 拼接数组 |       np.dstack(arr1, arr2) |
| np.column_stack() | 拼接数组 | np.column_stack(arr1, arr2) |
| np.row_stack()    | 拼接数组 |    np.row_stack(arr1, arr2) |

## 数组分割

| 分割方法          | 描述     |                                      示例 |
| :---------------- | -------- | ----------------------------------------: |
| np.split()        | 分割数组 |        np.split(arr, indices_or_sections) |
| np.hsplit()       | 分割数组 |       np.hsplit(arr, indices_or_sections) |
| np.vsplit()       | 分割数组 |       np.vsplit(arr, indices_or_sections) |
| np.dsplit()       | 分割数组 |       np.dsplit(arr, indices_or_sections) |
| np.column_split() | 分割数组 | np.column_split(arr, indices_or_sections) |
| np.row_split()    | 分割数组 |    np.row_split(arr, indices_or_sections) |

## 数组转置

| 转置方法       | 描述     |                                  示例 |
| :------------- | -------- | ------------------------------------: |
| np.transpose() | 转置数组 |                     np.transpose(arr) |
| np.T           | 转置数组 |                             np.T(arr) |
| np.swapaxes()  | 转置数组 |        np.swapaxes(arr, axis1, axis2) |
| np.rollaxis()  | 转置数组 |         np.rollaxis(arr, axis, start) |
| np.moveaxis()  | 转置数组 | np.moveaxis(arr, source, destination) |
| np.roll()      | 转置数组 |        np.roll(arr, shift, axis=None) |
| np.move()      | 转置数组 |     np.move(arr, source, destination) |
| np.rollaxis()  | 转置数组 |         np.rollaxis(arr, axis, start) |
| np.moveaxis()  | 转置数组 | np.moveaxis(arr, source, destination) |

## 数组裁剪

| 裁剪方法      | 描述     |                          示例 |
| :------------ | -------- | ----------------------------: |
| np.clip()     | 裁剪数组 |        np.clip(arr, min, max) |
| np.compress() | 裁剪数组 |   np.compress(condition, arr) |
| np.extract()  | 裁剪数组 |    np.extract(condition, arr) |
| np.put()      | 裁剪数组 |  np.put(arr, indices, values) |
| np.putmask()  | 裁剪数组 | np.putmask(arr, mask, values) |
| np.fill()     | 裁剪数组 |           np.fill(arr, value) |
| np.seterr()   | 裁剪数组 |       np.seterr(all='ignore') |
| np.seterr()   | 裁剪数组 |       np.seterr(all='ignore') |

## 数组函数

| 函数        | 描述               |           示例 |
| :---------- | ------------------ | -------------: |
| np.sin()    | 正弦函数           |    np.sin(arr) |
| np.cos()    | 余弦函数           |    np.cos(arr) |
| np.tan()    | 正切函数           |    np.tan(arr) |
| np.arcsin() | 反正弦函数         | np.arcsin(arr) |
| np.arccos() | 反余弦函数         | np.arccos(arr) |
| np.arctan() | 反正切函数         | np.arctan(arr) |
| np.sinh()   | 双曲正弦函数       |   np.sinh(arr) |
| np.cosh()   | 双曲余弦函数       |   np.cosh(arr) |
| np.tanh()   | 双曲正切函数       |   np.tanh(arr) |
| np.sqrt()   | 平方根函数         |   np.sqrt(arr) |
| np.exp()    | 指数函数           |    np.exp(arr) |
| np.log()    | 对数函数           |    np.log(arr) |
| np.log10()  | 以10为底的对数函数 |  np.log10(arr) |
| np.log2()   | 以2为底的对数函数  |   np.log2(arr) |
| np.log1p()  | 以e为底的对数函数  |  np.log1p(arr) |
| np.log2p()  | 以2为底的对数函数  |  np.log2p(arr) |
| np.log10p() | 以10为底的对数函数 | np.log10p(arr) |

## 数组应用

| 应用方法              | 描述     |                                 示例 |
| :-------------------- | -------- | -----------------------------------: |
| np.apply_along_axis() | 应用数组 | np.apply_along_axis(func, axis, arr) |
| np.apply_over_axes()  | 应用数组 |  np.apply_over_axes(func, arr, axes) |
| np.apply_along_axis() | 应用数组 | np.apply_along_axis(func, axis, arr) |

## 图片像素操作

| 目标         | 代码                                 |
| :----------- | :----------------------------------- |
| 整个图像变黑 | `img[:, :, :]` = 0 或 `img[...] = 0` |
| 整个图像变白 | `img[:, :, :] = 255`                 |
| 只清零某通道 | `img[:, :, 0] = 0`                   |
| 乘以系数     | `img *= 0.5`                         |
