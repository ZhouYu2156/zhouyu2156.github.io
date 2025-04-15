# MySQL 数据库

## 基础篇

### MySQL 概述

- 数据库相关概念：

|      名称      |                                 全称                                 |               简称               |
| :------------: | :------------------------------------------------------------------: | :------------------------------: |
|     数据库     |               `存储数据的仓库`，数据是有组织的进行存储               |           DataBase(DB)           |
| 数据库管理系统 |                     `操纵和管理数据库的大型软件`                     | DataBase Management System(DBMS) |
|      SQL       | `操作关系型数据库的编程语言`，定义了一套操作关系型数据库的统一`标准` |  Structured Query Language(SQL)  |

- 关系型数据库（RDBMS）
  ::: info 介绍
  概念：建立在关系模型基础上，由多张相互连接的二维表组成的数据库。

特点：

> 1.  使用表存储数据，格式统一，便于维护。
> 2.  使用 SQL 语言操作，标准统一，使用方便。

:::

- MySQL 下载：

::: info 信息拓展：

- 推荐: [前往 MySQL 官网](https://dev.mysql.com/downloads/mysql/)

:::

### 数据类型

#### 数值类型

<table>
    <thead>
    	<tr>
        	<th>分类</th>
            <th>类型</th>
            <th>大小</th>
            <th>有符号(SIGNED)范围</th>
            <th>无符号(UNSIGNED)范围</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
            <td rowspan="8">数值类型</td>
            <td>TINYINT</td>
            <td>1 byte</td>
            <td>(-128, 127)</td>
            <td>(0, 255)</td>
            <td>小整数值</td>
        </tr>
        <tr>
            <td>SMALLINT</td>
            <td>2 bytes</td>
            <td>(-32768, 32767)</td>
            <td>(0, 65535)</td>
            <td>大整数值</td>
        </tr>
        <tr>
            <td>MEDIUMINT</td>
            <td>3 bytes</td>
            <td>(-8388608, 8388607)</td>
            <td>(0, 16777215)</td>
            <td>大整数值</td>
        </tr>
        <tr>
            <td>INT或INTEGER</td>
            <td>4 bytes</td>
            <td>(-2147483648, 2147483647)</td>
            <td>(0, 4294967295)</td>
            <td>大整数值</td>
        </tr>
        <tr>
            <td>BIGINT</td>
            <td>8 bytes</td>
            <td>(-2^63, 2^63 -1)</td>
            <td>(0, 2^64 - 1)</td>
            <td>极大整数值</td>
        </tr>
        <tr>
            <td>FLOAT</td>
            <td>4 bytes</td>
            <td>(-3.402823466 E+38, 3.402823466351 E+38)</td>
            <td>0 和 (1.175494351 E-38, 3.402823466 E+38)</td>
            <td>单精度浮点数值</td>
        </tr>
        <tr>
            <td>DOUBLE</td>
            <td>8 bytes</td>
            <td>(-1.7976931348623157 E+308, 1.7976931348623157 E+308)</td>
            <td>0 和 (2.2250738585072014 E-308, 1.7976931348623157 E+308)</td>
            <td>双精度浮点数值</td>
        </tr>
        <tr>
            <td>DECIMAL</td>
            <td></td>
            <td>依赖于M(精度)和D(标度)的值</td>
            <td>依赖于M(精度)和D(标度)的值</td>
            <td>小数值(精确定点数)</td>
        </tr>
    </tbody>
</table>

#### 字符串类型

<table>
    <thead>
    	<tr>
        	<th>分类</th>
            <th>类型</th>
            <th>大小</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
            <td rowspan="10">字符串类型</td>
            <td>CHAR</td>
            <td>0-255 bytes</td>
            <td>定长字符串</td>
        </tr>
        <tr>
            <td>VARCHAR</td>
            <td>0-65535 bytes</td>
            <td>变长字符串</td>
        </tr>
        <tr>
            <td>TINYBLOB</td>
            <td>0-255 bytes</td>
            <td>不超过255个字符的二进制数据</td>
        </tr>
        <tr>
            <td>TINYTEXT</td>
            <td>0-255</td>
            <td>短文本字符串</td>
        </tr>
        <tr>
            <td>BLOB</td>
            <td>0-65 535 bytes</td>
            <td>二进制形式的长文本数据</td>
        </tr>
        <tr>
            <td>TEXT</td>
            <td>0-65 535 bytes</td>
            <td>长文本数据</td>
        </tr>
        <tr>
            <td>MEDIUMBLOB</td>
            <td>0-16 777 215 bytes</td>
            <td>二进制形式的中等长度文本数据</td>
        </tr>
        <tr>
            <td>MEDIUMTEXT</td>
            <td>0-16 777 215 bytes</td>
            <td>中等长度文本数据</td>
        </tr>
        <tr>
            <td>LONGBLOB</td>
            <td>0-4 294 967 295 bytes</td>
            <td>二进制形式的极大文本数据</td>
        </tr>
        <tr>
            <td>LONGTEXT</td>
            <td>0-4 294 967 295 bytes</td>
            <td>极大文本数据</td>
        </tr>
    </tbody>
</table>

#### 日期类型

<table>
    <thead>
    	<tr>
        	<th>分类</th>
            <th>类型</th>
            <th>大小</th>
            <th>范围</th>
            <th>格式</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="5">日期类型</td>
            <td>DATE</td>
            <td>3</td>
            <td>1000-01-01 至 9999-12-31</td>
            <td>YYYY-MM-DD</td>
            <td>日期值</td>
        </tr>
        <tr>
            <td>TIME</td>
            <td>3</td>
            <td>-838:59:59 至 838:59:59</td>
            <td>HH:MM:SS</td>
            <td>时间值或持续时间</td>
        </tr>
        <tr>
            <td>YEAR</td>
            <td>1</td>
            <td>1901 至 2155</td>
            <td>YYYY</td>
            <td>年份值</td>
        </tr>
        <tr>
            <td>DATETIME</td>
            <td>8</td>
            <td>1000-01-01 00:00:00 至 9999-12-31 23:59:59</td>
            <td>YYYY-MM-DD HH:MM:SS</td>
            <td>混合日期和时间值</td>
        </tr>
        <tr>
            <td>TIMESTAMP</td>
            <td>4</td>
            <td>1970-01-01 00:00:01 至 2038-01-19 03:14:07</td>
            <td>YYYY-MM-DD HH:MM:SS</td>
            <td>混合日期和时间值，时间戳</td>
        </tr>
    </tbody>
</table>

### SQL

#### SQL 通用语法

::: info 说明：

1. SQL 语句可以单行或多行书写，以分号结尾。
2. SQL 语句可以使用空格/缩进来增强语句的可读性。
3. MySQL 数据库的 SQL 语句不区分大小写，关键字建议使用大写。
4. 注释：
   > 单行注释：`-- 注释内容` 或 `# 注释内容（MySQL特有）`
   >
   > 多行注释：`/* 注释内容 */`

:::

#### SQL 分类

| 分类 |            全称            |                          说明                          |
| :--: | :------------------------: | :----------------------------------------------------: |
| DDL  |  Data Definition Language  |  数据定义语言，用来定义数据库对象（数据库、表、字段）  |
| DML  | Data Manipulation Language |     数据操作语言，用来对数据表中的数据进行增删改查     |
| DQL  |    Dataf Query Language    |         数据查询语言，用来查询数据库中表的记录         |
| DCL  |   Data Control Language    | 数据控制语言，用来创建数据库用户、控制数据库的访问权限 |

#### DDL

##### 数据库操作

查询所有数据库

```sql
show databases;
```

查询当前使用的数据库

```sql
select database();
```

创建数据库

```sql
create database/schema [if not exists] 数据库名 [default charset 字符集] [collate 排序规则];
```

删除数据库

```sql
drop database [if exists] 数据库名;
```

使用数据库

```sql
use 数据库名;
```

##### 数据表操作

- 查询

创建数据表

```sql
create table 表名(
    字段1 字段类型 [comment 字段1注释内容],
    字段2 字段类型 [comment 字段2注释内容],
    ...
)[comment 表注释内容];
```

> 示例:

```sql
create table user(
    id int comment '用户ID',
    name varchar(255) comment '姓名',
    age int comment '年龄'
) comment '用户表';
```

查询当前数据库中所有表

```sql
show tables;
```

查询表结构

```sql
desc 表名;
```

查询指定表的建表语句

```sql
show create table 表名;
```

- 修改

添加字段

```sql
alert table 表名 add [column] 字段名 字段类型 [comment 字段注释][约束];
-- 模板: alter table 表名 add 字段信息;
alter table 表名 add 字段1信息,add 字段2信息;    -- 一次添加多个字段
```

> 示例:

```sql
alter table user add column sex varchar(255) comment '性别' check ( sex in ('男','女') );
```

修改数据类型

```sql
alter table 表名 modify 字段名 新数据类型;
```

> 示例:

```sql
alter table user modify name varchar(50);
```

修改字段名和字段类型

```sql
alter table 表名 change 旧字段名 新字段名 类型 [comment 注释] [约束];
```

修改表名

```sql
alter table 表名 rename to 新表名;
```

> 示例:

```sql
alter table user rename to admin;
-- 这里我改回为原来的 user 表, 方便演示
alter table admin rename to user;
```

> 示例:

```sql
alter table user change name username char(50);
```

- 删除

删除字段

```sql
alter table 表名 drop [column] 字段名;
```

> 示例:

```sql
alter table user drop username;
```

删除表

```sql
drop table [if exists] 表名;
```

> 删除指定表, 并按照之前的表结构重新创建该表

```sql
truncate table 表名;
```

#### DML

##### 添加数据

::: info 概念
表中的一条数据也称为一条记录。
:::

```sql
-- 按照建表字段顺序插入记录: 给表的全部字段添加信息
insert into 表名 values(值1, 值2, ...);
-- 按照指定字段插入记录: 给表的部分字段添加信息
insert into 表名(字段名1, 字段名2, ...) values(值1, 值2, ...);
-- 批量添加数据
insert into 表名 values(值1, 值2, ...),(值1, 值2, ...),...;
insert into 表名(字段名1, 字段名2, ...) values(值1, 值2, ...),(值1, 值2, ...),...;
```

> 示例:

```sql
insert into user values(1, 18, 'rose', '男');
insert into user values(2, 18, 'jack', '男'), (3, 20, 'john', '男');
```

##### 修改数据

```sql
-- 不加条件会修改所有记录
update user set 字段名 = 值;
-- 通过条件查询, 修改符合条件的所有记录
update user set 字段名1 = 值1, 字段名2 = 值2, ... [where 条件];
```

> 示例:

```sql
update user set age = 20;
update user set username = 'jack1', age = 18 where username = 'jack';
```

##### 删除数据

```sql
-- 不加条件会删除所有记录
delete from 表名 [where 条件];
```

> 示例:

```sql
-- 删除 id 为 1 的记录
delete from user where id = 1;
```

#### DQL

- 语法

```sql
select [distinct]
    字段列表
from
    表名列表
where
    条件列表
group by
    分组字段列表
having
    分组后条件列表
order by
    排序字段列表
limit
    分页参数
```

##### 基本查询

查询多个字段

> 格式:

```sql
select 字段1, 字段2, ... from 表名;
select * from 表名;
```

设置别名

```sql
select 字段1 [as] 别名1, 字段2 [as] 别名2, ... from 表名;
```

> 示例

```sql
select username 用户名, age as 年龄 from user;
```

去除重复记录

```sql
select distinct 字段列表 from 表名;
```

##### 条件查询(where)

格式

```sql
select 字段列表 from 表名 where 条件列表;
```

条件
| 比较、关系运算符 | 功能 |
| :----------------: | :------------------------------------------: |
| `>` | 大于 |
| `>=` | 大于等于 |
| `<` | 小于 |
| `<=` | 小于等于 |
| `=` | 等于 |
| `<>` 或 `!=` | 不等于 |
| `between...and...` | 在某个范围之内(含最小、最大值) |
| `in(...)` | 在 in 之后的列表中的值，多选一 |
| `like 占位符` | 模糊匹配(`_`匹配单个字符, `%`匹配任意个字符) |
| `is null` | 是`NULL`的值 |

|   逻辑运算符   |   功能   |
| :------------: | :------: |
| `and` 或 `&&`  |   大于   |
| `or` 或 `\|\|` | 大于等于 |
|  `not` 或 `!`  | 非, 不是 |

> 示例 1

```sql
select * from user where age >= 18 and age <= 45;
```

> 示例 2

```sql
select * from user where age between 18 and 45;
```

> 示例 3

```sql
-- or 的写法可以简化为下面的形式
-- select * from user where age = 18 or age = 45;   -- 等价于下面这种
select * from user where age in(18, 45);
```

> 示例 4

```sql
-- 查询 username 字段中包含 j 字符的记录
select * from user where username like '%j%';
-- 查询 username 字段中是4个字符的记录
select * from user where username like '____';
```

##### 聚合函数(count、max、min、avg、sum)

::: info 介绍
聚合函数是将一列数据作为一个整体，进行纵向计算。
:::

- 常见聚合函数
  | 函数 | 功能 |
  | :---: | :------: |
  | count | 统计数量 |
  | max | 最大值 |
  | min | 最小值 |
  | avg | 平均值 |
  | sum | 求和 |

- 格式
  > :warning: 注意：`null`值不参与所有聚合函数运算。

```sql
select 聚合函数(字段列表) from 表名;
```

> 示例

```sql
select sum(age) / count(*) from user;
```

##### 分组查询(group by)

- `where` 和 `having` 区别
  > 1. 执行时机不同：`where`是分组之前进行过滤，不满足`where`条件，不参与分组; 而`having`是分组之后对结果进行过滤。
  > 2. 判断条件不同：`where`不能对聚合函数进行判断，而`having`可以。

> :warning: 注意：
>
> 执行顺序：`where` > `聚合函数` > `having`
>
> 分组之后，查询的字段一般为`分组字段`和`聚合函数`，查询其他字段无任何意义。

- 格式

```sql
select 字段列表 from 表名 [where 条件] group by 分组字段名 [having 分组后过滤条件];
```

> 示例 1

```sql
-- 根据姓名去重并统计性别数量
select sex, count(distinct username) from user group by sex;
```

> 示例 2

::: info 技巧
先通过`where`条件筛选出符合条件的数据，再使用`group by`进行分组，最后使用`having`对分组进行过滤。
:::

```sql
-- 选出所有年龄大于等于18岁的人，根据性别进行分组，统计分组中人数，然后再筛选出人数大于等于2的性别
select sex, count(distinct username) sex_count
from user
where age >= 18
group by sex
having sex_count >= 1;
```

##### 排序查询(order by)

- 格式

```sql
select 字段列表 from 表名 order by 字段1 排序方式1, 字段2 排序方式2;
```

- 排序方式

> - ASC：升序(默认值)
> - DESC：降序

> 示例

```sql
select * from user order by age desc;
```

##### 分页查询(limit)

- 格式

```sql
select 字段列表 from 表名 limit 偏移量, 查询记录数;
```

- :warning: 注意：

> - `偏移量`也称为`起始索引`，起始索引从 0 开始，`起始索引 = (查询页码 - 1) * 每页显示记录数`
> - 分页查询是数据库的方言，不同的数据库有不同的实现，MySQL 中是 LIMIT。
> - 如果查询的是第一页数据，起始索引可以省略，直接简写为`limit 10`。

#### DCL

##### 管理用户

- 查询用户

```sql
use mysql;
select * from user;
```

- 创建用户

```sql
create user `用户名`@`主机名` identified by `密码`;
```

- 修改用户密码

```sql
alter user `用户名`@`主机名` identified with `mysql_native_password` by `新密码`;
```

- 删除用户

```sql
drop user `用户名`@`主机名`;
```

> 示例 1

```sql
-- 创建用户 demo，可以任意主机访问该数据库，密码为123456
create user `demo`@`%` identified by '123456';
-- 只能在当前主机登录、访问的话，要将 @ 符号后面的 % 改为 localhost 即可
```

> 示例 2

```sql
-- 更改用户密码
alter user root@localhost identified with mysql_native_password by '123';
```

##### 权限控制

|        权限         |        说明        |
| :-----------------: | :----------------: |
| all, all privileges |      所有权限      |
|       select        |      查询数据      |
|       insert        |      插入数据      |
|       update        |      修改数据      |
|       delete        |      删除数据      |
|        alter        |       修改表       |
|        drop         | 删除数据库/表/视图 |
|       create        |   创建数据库/表    |

- 查询权限

```sql
show grants for `用户名`@`主机名`;
```

- 授予权限

```sql
grant 权限列表 on `数据库名`.`表名` to `用户名`@`主机名`;
```

- 撤销权限

```sql
revoke 权限列表 on 数据库名.表名 from 用户名@主机名;
```

> 示例

```sql
-- 创建所有计算机均可访问的用户
create user demo@% identified by '密码';
-- 给新创建的用户授予权限
grant all on demo.* to demo@%;
-- 撤销权限
revoke all on demo.user from demo@%;
```

### 函数

#### 字符串函数

|           函数            |                                 功能                                  |
| :-----------------------: | :-------------------------------------------------------------------: |
| `concat(s1, s2, s3, ...)` |                              字符串拼接                               |
|       `lower(str)`        |                      将字符串 `str` 全部转为小写                      |
|       `upper(str)`        |                      将字符串 `str` 全部转为大写                      |
|    `lpad(str, n, pad)`    | 左填充，用字符串 `pad` 对 `str` 的左边进行填充，达到 `n` 个字符串长度 |
|    `rpad(str, n, pad)`    | 右填充，用字符串 `pad` 对 `str` 的右边进行填充，达到 `n` 个字符串长度 |
|        `trim(str)`        |                      去掉字符串头部和尾部的空格                       |
| `substr(str, start, len)` |       返回字符串 `str` 从 `start` 位置起的 `len` 个长度的字符串       |

> 示例

```sql
update user set id = lpad(id, 5, '0');
```

```sql
select substr('hello world!', 1, 5);
```

#### 数值函数

|     函数      |                  功能                  |
| :-----------: | :------------------------------------: |
|   `ceil(x)`   |                向上取整                |
|  `floor(x)`   |                向下取整                |
|  `mod(x, y)`  |            返回 `x /y` 的模            |
|   `rand()`    |        返回 `0 ~ 1` 内的随机数         |
| `round(x, y)` | 求参数`x`的四舍五入的值，保留`y`位小数 |

> 示例

```sql
-- 随机生成 6 位数验证码
select rpad(round(rand() * 1000000, 0), 6, '0') 六位数随机验证码;
```

#### 日期函数

|                 函数                 |                        功能                         |
| :----------------------------------: | :-------------------------------------------------: |
|             `curdate()`              |                    返回当前日期                     |
|             `curtime()`              |                    返回当前时间                     |
|               `now()`                |                 返回当前日期和时间                  |
|             `year(date)`             |                获取指定 date 的年份                 |
|            `month(date)`             |                获取指定 date 的月份                 |
|             `day(date)`              |                获取指定 date 的日期                 |
| `date_add(date, interval expr type)` | 返回一个日期/时间值加上一个时间间隔 expr 后的时间值 |
|       `datediff(date1, date2)`       |   返回起始时间 date1 和结束时间 date2 之间的天数    |

> 示例 1

```sql
-- 时间增加的函数
select date_add(now(), interval 60 day);
select date_add(now(), interval 24 month);
select date_add(now(), interval 60 year);
```

> 示例 2

```sql
-- 计算时间差
select datediff('2024-7-7', '2024-7-1') + 1 日期差;
```

#### 流程函数

::: info 说明

- 流程函数也是很常用的一类函数，可以在 SQL 语句中实现条件筛选，从而提高语句的效率。

:::

|                            函数                            |                              功能                              |
| :--------------------------------------------------------: | :------------------------------------------------------------: |
|                     `if(value, t, f)`                      |             如果 value 为真，则返回 t，否则返回 f              |
|                  `ifnull(value1, value2)`                  |        如果 value1 不为空，返回 value1，否则返回 value2        |
|   `case when [val1] then [res1] ... else [default] end`    |     如果 val1 为真，返回 res1，...否则返回 default 默认值      |
| `case [expr] when [val] then [res] ... else [default] end` | 如果 expr 的值等于 val1，返回 res1，...否则返回 default 默认值 |

> 示例 1

```sql
select if(true, 'success', 'failure') if控制语句;

select ifnull(null, 'Hello world!') ifnull控制语句;
```

### 约束

> 1. 概念：约束是作用于表中字段上的规则，用于限制存储在表中的数据。
> 2. 目的：保证数据库中数据的正确、有效性和完整性。、
> 3. 分类如下：

| 约束                      | 描述                                                     | 关键字        |
| :------------------------ | :------------------------------------------------------- | :------------ |
| 非空约束                  | 限制该字段的数据不能为 null                              | `not null`    |
| 唯一约束                  | 保证该字段的所有数据都是唯一、不重复的                   | `unique`      |
| 主键约束                  | 主键是一行数据的唯一标识，要求非空且唯一                 | `primary key` |
| 默认约束                  | 保存数据时，如果未指定该字段的值，则采用默认值           | `default`     |
| 检查约束(8.0.16 版本之后) | 保证字段值满足某一条件                                   | `check`       |
| 外键约束                  | 用来让两张表的数据之间建立连接，保证数据的一致性和完整性 | `foreign key` |

> :warning: 注意：约束是作用于表中字段上的，可以在创建表/修改表的时候添加约束。

#### 外键约束

- 添加外键

```sql
create table user(
	字段名 数据类型,
    ...
    [constraint] [外键名称] foreign key (外键字段名) references 主表(主表列名)
);
```

```sql
alter table 表名 add constraint 外键名称
	foreign key(外键字段名) references 主表(主表列名);
```

- 删除外键

```sql
alter table 表名 drop foreign key 外键名称;
```

> 示例

```sql
/* 创建主表 */
create table dept(
    id int primary key auto_increment comment '部门ID',
    name varchar(15) unique comment '部门名称'
);
insert into dept(name) values('技术部'), ('研发部'), ('物流部');

/* 创建从表 */
create table emp(
    id int primary key auto_increment comment '员工ID',
    name varchar(15) unique comment '员工姓名',
    dept_id int comment '部门ID',
    constraint fk_dept_id foreign key(dept_id) references dept(id)
);
/* 删除约束 */
alter table emp drop constraint fk_dept_id;
/* 修改约束 */
alter table emp add constraint fk_dept_id
	foreign key emp(dept_id) references dept(id);
/* 展示建表结构 */
show create table emp;
```

- 删除/更新行为

> `cascade`具有级联操作，当主表中的记录被删除时，主表关联着的从表中对应的外键记录也会跟着被删除。

语法

```sql
alter table 表名 add constraint 外键名称
	foreign key(外键字段) references 主表名(主表字段名)
		on update cascade on delete cascade;
```

| 行为          | 说明                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `no action`   | 当主表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。(与 `restrict` 一致)                 |
| `restrict`    | 当主表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。(与 `no action` 一致)                |
| `cascade`     | 当主表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则也删除/更新外键在从表中的记录。                     |
| `set null`    | 当在主表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置从表中该外键值为`null`(这就要求该外键允许取`null`)。 |
| `set default` | 主表有变更时，从表将外键列设置成一个默认的值(`Innodb`不支持)                                                             |

### 多表查询

#### 多表关系

- 概述

> 表结构之间存在的三种关系基本上分为以下三类：
>
> - 一对一
> - 一对多(多对一)
> - 多对多

##### 如何关联两张具有关系的表?

- 一对一

> 在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的(unique)

- 一对多(多对一)

> 在多的一方建立外键，指向一的一方的主键

- 多对多

> 建立第三张中间表，中间表至少包含两个外键，分别关联两方主键

#### 多表查询概述

- 概述：指从多张表中查询数据
- 笛卡尔积：笛卡尔乘积是指在数学中，两个集合 A 集合和 B 集合的所有组合情况。（在多表查询时，需要消除无效的笛卡尔积）

多表查询分类：

- 连接查询

  - 内连接：相当于查询 A、B 交集部分数据

  - 外连接：查询某一张表的所有数据，以及两张表交集部分数据

  - 自连接：当前表与自身的连接查询，自连接必须使用表别名

#### 内连接

- 内连接：相当于查询 A、B 交集部分数据

  - 隐式内连接：

  ```sql
  select 字段列表 from 表1, 表2 where 条件...;
  ```

  - 显示内连接

  ```sql
  select 字段列表 from 表 [inner] join 表2 on 连接条件...;
  ```

> 示例

```sql
create table student(
    id int primary key auto_increment,
    name varchar(15) unique
);
insert into student(name) values('jack'), ('rose'), ('john'), ('jimmy'), ('blus');

create table score(
    id int primary key auto_increment,
    sid int unique,
    math int unsigned,
    english  int unsigned,
    chinese  int unsigned,
    constraint fk_sid foreign key (sid) references student(id)
);
insert into score(sid, math, english, chinese) values(1, 71, 88, 64),
                                                     (2, 94, 64, 82),
                                                     (3, 78, 72, 79),
                                                     (4, 94, 92, 97);

-- (1)隐式内连接
select st.name,sc.math, sc.english, sc.chinese
    from student st, score sc
        where st.id = sc.sid;

-- (2)显式内连接
select st.name, sc.math, sc.english, sc.chinese
    from student st
        join score sc
            on st.id = sc.sid;
```

#### 外连接

- 外连接：

  - 左外连接：查询`左表`所有数据，以及两张表交集部分数据

  ```sql
  select 字段列表 from 表1 left [outer] join 表2 on 条件...;
  ```

  - 右外连接：查询`右表`所有数据，以及两张表交集部分数据

  ```sql
  select 字段列表 from 表1 right [outer] join 表2 on 条件...;
  ```

```sql
-- (3)左外连接: 包含左表所有记录，右表没有则显示null
select st.name as '姓名', sc.math as '数学', sc.english as '英语', sc.chinese as '语文'
    from student st
        left join score sc
            on st.id = sc.sid;

-- (4)右外连接: 包含右表所有记录，左表没有则显示null
select st.name as '姓名', sc.math as '数学', sc.english as '英语', sc.chinese as '语文'
    from student st
        right join score sc
            on st.id = sc.sid;

-- (5)使用左连接过滤出没有成绩的学生
select st.name as '姓名', sc.math as '数学', sc.english as '英语', sc.chinese as '语文'
    from score sc
        left join student st
            on st.id = sc.sid
                where sc.sid is not null;
```

#### 自连接

- 自连接：当前表与自身的连接查询，自连接必须使用表别名

```sql
select 字段列表 from 表A 别名A join 表A 别名B on 条件...;
```

> 自连接查询，可以是内连接查询，也可以是外连接查询。

> 示例

```sql
/**查询员工与所属领导 */
select a.name, b.name from emp a, emp b where a.manager_id = b.id;
```

#### 联合查询

> 对于 `union` 查询，就是把多次查询的结果合并起来，形成一个新的查询结果集。

```sql
select 字段列表 from 表A ...
union [all]
select 字段列表 from 表B ...;
```

> 对于联合查询的多张表的列数必须保持一致，字段类型也需要保持一致。
>
> `union all` 会将全部的数据直接合并在一起，`union`会对合并之后的数据去重。

> 示例: 将薪资低于 5000 的员工，和年龄大于 50 岁的员工全部查询出来

```sql
/**同一个人满足多个条件会多条重复的查询记录 */
select * from emp where salary < 5000
union all
select * from emp where age > 50;

/** union 会对查询之后合并的数据去重, 保留满足条件的第一条记录 */
select * from emp where salary < 5000
union
select * from emp where age > 50;
```

#### 子查询

1. 概念: `SQL`语句中嵌套`select`语句，称为`嵌套查询`，又称`子查询`。

```sql
select * from t1 where column1 = (select column1 from t2);
```

> 子查询外部的雨具可以是`insert` / `update` / `delete` / `select` 的任何一个。

2. 根据子查询结果不同，分为：

   - 标量子查询 (子查询结果为单个值)
   - 列子查询 (子查询结果为一列)
   - 行子查询 (子查询结果为一行)
   - 表子查询 (子查询结果为多行多列)

3. 根据子查询位置，分为：`where`之后、`from`之后、`select`之后

- 列子查询

|  操作符  |                    描述                     |
| :------: | :-----------------------------------------: |
|   `in`   |        在指定的集合范围之内，多选一         |
| `not in` |           不在指定的集合范围之内            |
|  `any`   |    子查询返回列表中，有任意一个满足即可     |
|  `some`  | 与 any 等同，使用 some 的地方都可以使用 any |
|  `all`   |      子查询返回列表的所有值都必须满足       |

> 示例 1

```sql
/**查询比财务部所有人工资都高的员工信息 */
-- a. 查询所有 财务部 人员工资
select id from dept where name = '财务部';

select salary from emp where dept_id = (select id from dept where name = '财务部');

-- b. 比财务部所有人工资都高的员工信息
select * from emp where salary > all (select salary from emp where dept_id = (select id from dept where name = '财务部'));

```

- 行子查询

> 子查询返回的结果是一行(可以是多列), 这种子查询称为行子查询。
>
> 常用的操作符：`=`、`< >`、`in`、`not in`

> 示例

```sql
/** 查询与"张无忌"的薪资及直属领导相同的员工信息 */
-- a. 查询"张无忌"的薪资及直属领导
select salary, managerid from emp where name = '张无忌';

-- b. 查询与"张无忌"的薪资及直属领导相同的员工信息
-- select * from emp where salary = 12500 and managerid = 1;    -- 下面均等同
-- select * from emp where (salary, managerid) = (12500, 1);
select * from emp where (salary, managerid) = (select salary, managerid from emp where name = '张无忌');
```

- 表子查询

> 子查询返回的结果是多行多列，这种子查询称为`表子查询`。
>
> 常用的操作符：`in`

> 示例

```sql
/** 查询与"鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息 */
-- a. 查询"鹿杖客" , "宋远桥" 的职位和薪资
select job, salary from emp where name = '鹿杖客' or name = '宋远桥';

-- b. 查询与"鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息
select * from emp where (job, salary) in (select job, salary from emp where name = '鹿杖客' or name = '宋远桥');
```

### 事务

#### 事务简介

::: info 解释

- **事务** 是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。
  :::

#### 事务操作

- 查看/设置事务提交方式

```sql
-- 查看事务自动提交状态
select @@autocommit;
-- 关闭事务自动提交
set @@autocommit=0;
```

- 开启事务

```sql
/**控制事务的两种方式：
    (1)关闭事务提交 set @@autocommit=0;
    (2)通过 start transaction; 或 begin; 显式开启事务
*/
start transaction;
-- 或者
begin;
```

- 提交事务

```sql
commit;
```

- 回滚事务

```sql
rollback;
```

#### 事务四大特性

::: tip 介绍

- 原子性(Auomicity): 事务是不可分割的最小操作单元，要么全部成功，要么全部失败。
- 一致性(Consistency): 事务完成时，必须使所有的数据都保持一致状态。
- 隔离性(Isolation): 数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。
- 持久性(Durability): 事务一旦提交或混滚，它对数据库中的数据的改变就是永久的。

:::

#### 并发事务问题

|    问题    | 描述                                                                                                     |
| :--------: | :------------------------------------------------------------------------------------------------------- |
|    脏读    | 一个事物读到另外一个事务还没有提交的数据                                                                 |
| 不可重复读 | 一个事物先后读取同一条记录，但两次读取的数据不同，称之为不可重复读                                       |
|    幻读    | 一个事物按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在，好像出现了"幻影" |

#### 事务隔离级别

| 隔离级别                       | 脏读 | 不可重复读 | 幻读 |
| :----------------------------- | :--- | :--------- | :--- |
| `Read uncomimmited`            | √    | √          | √    |
| `Read commited`                | ×    | √          | √    |
| `Repeatable read` (mysql 默认) | ×    | ×          | √    |
| `Serializable`                 | ×    | ×          | ×    |

- 查看事务隔离级别

```sql
select @@transaction_isolation;
```

- 设置事务隔离级别

```sql
set [session|global] transaction isolation level { read uncommitted | read committed | repeatable read | serializable}
```

## 进阶篇

### 存储引擎

### 索引

### SQL 优化

### 视图/存储过程/触发器

### 锁

### InnoDB 核心

### MySQL 管理

## 运维篇

### 日志

### 主从复制

### 分库分表

### 读写分离
