# TypeScript 学习笔记

> - 官网: [TypeScript](https://www.typescriptlang.org/)
>
> - 中文学习网: [TypeScript](https://www.tslang.cn/docs/handbook/basic-types.html)
> 
> - 推荐阅读：[jsdocs文档](https://jsdoc.bootcss.com/index.html)
> 
> - 推荐阅读：[npm包管理器](https://www.npmjs.cn/)

::: warning 注意
- 记住：类型注释永远不会改变程序的运行时行为。

:::


- `tsc`命令行编译选项

| 参数              |                               功能 |
| :---------------- | ---------------------------------: |
| `--noEmitOnError` | TS代码有错误时，不要编译生成JS文件 |
| `--target`        |    编译生成JS的目标版本，默认`ES5` |




::: tip 说明

- 通过`tsc --init`初始化一个`TypeScript`的配置文件
- 通过`tsc --watch`或`tsc -w`监听文件内容变化实时编译成`JavaScript`代码（`--watch 参数必须以命令行方式指定，不能在配置文件中添加参数来控制。`这个命令会正常按`tsconfig.json`中的配置来编译，如果命令行加了`tsconfig.json`文件中的配置参数，那么就不会读取配置文件，而是优先按照命令行的参数进行编译。总之，没有`tsconfig.json`配置文件，就按照`tsc`默认的配置来编译，如果有配置文件，并且命令行不加其他编译选项的参数，则按照配置文件的配置来编译。）

:::


::: details

```json
{
  "compilerOptions": {
    /* 访问 https://aka.ms/tsconfig 以了解更多关于此文件的信息 */

    /* 项目配置 */
    // "incremental": true,                              /* 开启增量编译，保存 .tsbuildinfo 文件以便逐步构建项目。 */
    // "composite": true,                                /* 启用项目组合功能，允许项目作为项目引用的一部分被使用。 */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* 指定 .tsbuildinfo 增量编译信息文件的路径。 */
    // "disableSourceOfProjectReferenceRedirect": true,  /* 禁止引用组合项目时优先使用源文件而非声明文件。 */
    // "disableSolutionSearching": true,                 /* 编辑时，使项目不参与多项目引用的检查。 */
    // "disableReferencedProjectLoad": true,             /* 减少 TypeScript 自动加载的项目数量，提高编译速度。 */

    /* 语言和环境设定 */
    "target": "ESNext",                                  /* 设定输出的JavaScript语言版本，并包含匹配的库声明。 */
    // "lib": [],                                        /* 指定一组内建库声明文件，定义目标运行环境。 */
    // "jsx": "preserve",                                /* 指定如何处理 JSX 代码。 */
    // "experimentalDecorators": true,                   /* 启用实验性的装饰器特性。 */
    // "emitDecoratorMetadata": true,                    /* 生成装饰器元数据到 JavaScript 中。 */
    // "jsxFactory": "",                                 /* 指定在 React JSX 输出模式下的工厂函数。 */
    // "jsxFragmentFactory": "",                         /* 指定在 React JSX 输出模式下的片段引用。 */
    // "jsxImportSource": "",                            /* 当使用 'jsx: react-jsx*' 时，指定导入 JSX 工厂函数的模块源。 */
    // "reactNamespace": "",                             /* 指定在 'react' JSX 输出模式下调用的 'createElement' 对象。 */
    // "noLib": true,                                    /* 禁止包含任何库文件，包括默认的 lib.d.ts。 */
    // "useDefineForClassFields": true,                  /* 生成符合 ECMAScript 标准的类字段定义。 */
    // "moduleDetection": "auto",                        /* 控制 TypeScript 如何检测模块格式的 JS 文件。 */

    /* 模块系统 */
    "module": "ES6",                                /* 指定生成的模块代码格式。 */
    // "rootDir": "./",                                  /* 指定源代码的根目录。 */
    // "moduleResolution": "node10",                     /* 设置模块解析策略。 */
    // "baseUrl": "./",                                  /* 设置模块解析的基础路径。 */
    // "paths": {},                                      /* 路径别名配置，重定向模块导入路径。 */
    // "rootDirs": [],                                   /* 允许多个目录被视为单一目录以解决模块。 */
    //"typeRoots": ["./types"],                                  /* 类型声明文件的额外搜索目录。 */
    //"types": ["app.d.ts"],                                      /* 额外包含的类型声明文件，无需直接引用。 */
    // "allowUmdGlobalAccess": true,                     /* 允许从模块中访问全局 UMD 变量。 */
    // "moduleSuffixes": [],                             /* 解析模块时额外考虑的文件后缀。 */
    // "allowImportingTsExtensions": true,               /* 允许导入 TypeScript 扩展名文件，需特定编译选项。 */
    // "resolvePackageJsonExports": true,                /* 使用 package.json 的 'exports' 字段解析导出。 */
    // "resolvePackageJsonImports": true,                /* 使用 package.json 的 'imports' 字段解析导入。 */
    // "customConditions": [],                           /* 解析模块时额外的条件检查。 */
    // "resolveJsonModule": true,                        /* 允许导入 JSON 文件。 */
    // "allowArbitraryExtensions": true,                 /* 允许导入任意扩展名的文件，只要存在声明文件。 */
    // "noResolve": true,                                /* 禁止自动解析导入语句导致的文件添加。 */

    /* JavaScript 支持 */
    "allowJs": true,                                  /* 允许编译器处理 JavaScript 文件。 */
    "checkJs": true,                                  /* 在 JavaScript 文件中启用类型检查。 */
    // "maxNodeModuleJsDepth": 1,                        /* 检查 node_modules 中 JavaScript 文件的最大深度。 */

    /* 输出相关 */
    "declaration": true,                              /* 生成相应的声明文件 (.d.ts)。 */
    // "declarationMap": true,                           /* 为声明文件生成源映射。 */
    // "emitDeclarationOnly": true,                      /* 仅生成声明文件，不生成 JavaScript 文件。 */
    // "sourceMap": true,                                /* 生成源映射文件。 */
    // "inlineSourceMap": true,                          /* 将源映射嵌入到 JavaScript 文件中。 */
    // "outFile": "./",                                  /* 指定输出所有合并后的 JavaScript 到单一文件的路径。 */
    // "outDir": "./",                                   /* 指定输出目录。 */
    "removeComments": true,                           /* 删除编译输出中的注释。 */
    // "noEmit": true,                                   /* 禁止编译输出。 */
    // "importHelpers": true,                            /* 从 tslib 导入辅助函数以减少重复代码。 */
    // "importsNotUsedAsValues": "remove",               /* 控制未作为值使用的导入的处理方式。 */
    // "downlevelIteration": true,                       /* 生成更兼容但可能性能较低的迭代代码。 */
    // "sourceRoot": "",                                 /* 为调试器指定参考源代码的根路径。 */
    // "mapRoot": "",                                    /* 指定调试器查找源映射文件的替代路径。 */
    // "inlineSources": true,                            /* 将源代码嵌入到源映射中。 */
    // "emitBOM": true,                                  /* 在输出文件开头添加 UTF-8 字节顺序标记。 */
    // "newLine": "crlf",                                /* 设置输出文件中的换行符。 */
    // "stripInternal": true,                            /* 移除带有 '@internal' JSDoc 注释的声明。 */
    // "noEmitHelpers": true,                            /* 禁止生成辅助函数如 '__extends'。
    // "noEmitOnError": true,                            /* 如果报告了任何类型检查错误，则禁止发出文件。 */
    // "preserveConstEnums": true,                       /* 禁止在生成的代码中擦除 'const enum' 声明。 */
    // "declarationDir": "./",                           /* 指定生成声明文件的输出目录。 */
    // "preserveValueImports": true,                     /* 保留那些在JavaScript输出中原本会被移除的未使用的导入值。 */

    /* 互操作性约束 */
    // "isolatedModules": true,                          /* 确保每个文件可以安全地被转译，而不依赖于其他导入。 */
    // "verbatimModuleSyntax": true,                     /* 不转换或省略任何未标记为仅类型导入或导出的导入或导出，确保它们基于'module'设置以输出文件的格式写入。 */
    // "allowSyntheticDefaultImports": true,             /* 允许在模块没有默认导出时使用 'import x from y'。 */
    "esModuleInterop": true,                             /* 发出额外的JavaScript代码，以简化对导入CommonJS模块的支持。这同时开启了'allowSyntheticDefaultImports'以保持类型兼容性。 */
    // "preserveSymlinks": true,                         /* 禁用对符号链接到其实际路径的解析。这与Node中的相同标志相对应。 */
    "forceConsistentCasingInFileNames": true,            /* 确保导入中的大小写正确无误。 */

    /* 类型检查 */
    "strict": true,                                      /* 启用所有严格的类型检查选项。 */
    // "noImplicitAny": true,                            /* 当表达式和声明隐含'any'类型时，启用错误报告。 */
    // "strictNullChecks": true,                         /* 类型检查时，考虑'null'和'undefined'。 */
    // "strictFunctionTypes": true,                      /* 在分配函数时，检查参数和返回值是否为子类型兼容。 */
    // "strictBindCallApply": true,                      /* 检查'bind'，'call'和'apply'方法的参数是否与原始函数匹配。 */
    // "strictPropertyInitialization": true,             /* 检查类中声明但未在构造函数中设置的属性。 */
    // "noImplicitThis": true,                           /* 当'this'被赋予'any'类型时，启用错误报告。 */
    // "useUnknownInCatchVariables": true,               /* 将catch子句变量默认为'unknown'而非'any'。 */
    // "alwaysStrict": true,                             /* 确保总是发出'use strict'。 */
    // "noUnusedLocals": true,                           /* 当局部变量未被读取时，启用错误报告。 */
    // "noUnusedParameters": true,                       /* 当函数参数未被读取时，发出错误。 */
    // "exactOptionalPropertyTypes": true,               /* 如编写时那样解释可选属性类型，而不是添加'undefined'。 */
    // "noImplicitReturns": true,                        /* 当函数代码路径没有明确返回时，启用错误报告。 */
    // "noFallthroughCasesInSwitch": true,               /* 在switch语句中启用对贯穿情况的错误报告。 */
    // "noUncheckedIndexedAccess": true,                 /* 当通过索引访问时，向类型中添加'undefined'。 */
    // "noImplicitOverride": true,                       /* 确保派生类中覆盖的成员标有override修饰符。 */
    // "noPropertyAccessFromIndexSignature": true,       /* 强制使用索引类型声明的键时使用索引访问器。 */
    // "allowUnusedLabels": true,                        /* 禁用对未使用标签的错误报告。 */
    // "allowUnreachableCode": true,                     /* 禁用对不可达代码的错误报告。 */

    /* 完整性 */
    // "skipDefaultLibCheck": true,                      /* 跳过类型检查随TypeScript一起提供的.d.ts文件。 */
    "skipLibCheck": true                                 /* 跳过所有.d.ts文件的类型检查。 */,
  }
}
```

:::

## 1. 配置`TS`编译环境

### 第一种方式
> - `npm i -g typescript` 下载编译工具
> - `tsc xxx.ts` 将`TS`文件编译为`JS`文件
> - `node xxx.js` 运行编译生成的`JS`文件
> - 缺点: 每次都要编译、运行; 优点: 可以看到`ts 转换为 js`的内容

### 第二种方式
> - `npm i -g ts-node` 下载`编译&运行`工具
> - `ts-node xxx.ts` 在内存中编译`TS`文件并运行，不生成`JS`文件
> - 缺点: 每次都要执行命令; 优点: 简化了一次执行的步骤

### 第三种方式
> - `npm i -g nodemon` 下载`编译&运行`工具(实时监听文件变化`自动编译&运行`)
> - `nodemon xxx.ts`(单文件)或`nodemon --watch src/**/*.ts --exec ts-node src/main.ts`(多文件) 实时监听文件变化`自动编译&运行`(如果当前目录下有`package.json`文件,则使用`nodemon`不接文件名可以直接运行`"main"`指定的入口脚本文件)
> - 优点: 实时监听文件变化`自动编译&运行`;

### 使用一些实验性的功能
> `package.json`文件可以配置启动命令简写命令和指定入口文件等选项，`tsconfig.json`配置文件可以配置编译选项。
> 配置: `tsc --init` (前提`npm i -g typescript`安装了`tsc`工具), 初始化一个`tsconfig.json`配置文件。然后开启对应的实验性功能, 比如装饰器实验功能: 解开`"experimentalDecorators": true`和它下面的一行即可。

## 2. 基础类型
> - `null`: 空值类型
```ts
let a: null;
let b: null = null;
```

> - `undefined`: 未定义类型
```ts
let a: undefined;
let b: undefined = undefined;
```

> - `number`: 数值类型
```ts
let a: number;
let b: number = 1;
```

> - `string`: 字符串类型
```ts
let a: string;
let b: string = 'hello world!';
```

> - `Array`: 数组类型
```ts
let a: number[];
let b: number[] = [1, 2, 3];
let c: Array<number> = [1, 2, 3];
```

> - `Object`: 对象类型
```ts
let a: object;
let b: object = {
    name: 'jack',
    age: 18
}
```

> - `Tuple`: 元组类型
```ts
let a: [string, number];        // 指明了每个位置的类型，那么就必须一一对应
a = ['hello world!', 18];

let b: [string, number] = ['hello world!', 18];
```

> - `Enum`: 枚举类型
```ts
// 默认情况下，从0开始为元素编号。 我们也可以手动的指定成员的数值。从手动赋值的位置开始，后面成员的值由自增得到
enum Color {
    Red,        // 0
    Green = 3,
    Blue        // 4
}
let c: Color = Color.Blue;
console.log(c)
```

> - `any`: 任意类型
```ts
let a: any;     // 如果使用 any, 那么就和js一样了，可以赋任意值。尽量避免使用any类型，因为这样会失去类型检查的意义
a = 1;
```


> - `void`: 空类型
```ts
// 函数返回值为空时，使用 void
function fn(): void {
    console.log('hello world!');
}
```

> - `never`: 永远不存在的值的类型
```ts
function fn(): never {
    while (true) {
        console.log('hello world!');    // 比如该函数，永远不会返回任何值
    }
}
```

## 3. 类型断言
> 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

> - 通过`as`: 类型断言
```ts
let a: any = 'hello world!';
let b: string = (a as string);
```

> - 通过`<>`: 类型断言
```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

## 4. 变量定义的关键字
> - `var`: 定义变量

```ts
{
    var a: number = 1;
    {
        var a: number = 10;
        {
            var a: number = 100;
        }
    }
}
console.log(a); // 100
```
> `var`定义的变量，对全局作用域有效。也就是作用域穿透，会影响外部作用域的同名变量的值。这种定义变量的关键字已经逐渐在淘汰，这是由于`JS`语言刚诞生之初的设计不合理遗留下来的问题。

> - `let`: 定义变量

```ts
{
    let a: number = 1;
    {
        let a: number = 10;
        {
            let a: number = 100;
            console.log(a)  // 100
        }
        console.log(a)  // 10
    }
    console.log(a)  // 1
}
// console.log(a) // 不能再访问到块内定义变量了
```

> `let`定义的变量，有作用域，如果在块内定义，则块内定义的变量覆盖块外部作用域定义的同名变量。如果块内没有定义，则从当前作用于向外寻找该变量。在不同作用域下可以定义同名变量，在块内对该变量的操作，不会影响到块外定义的同名变量。

> - `const`: 定义常量

```ts
const a: number = 1;
const b = {
    name: 'jack',
    age: 18
}
// a = 10  // 错误演示。不能重新给整个变量赋新值！
// b = {}  // 错误演示。不能重新给整个变量赋新值！
b.name = 'tom'      // 可以。修改内部成员的值没关系，没有将整个变量重新赋值，建立新的引用关系。所以是没有错的
b.age = 20          // 可以
console.log(b)
```

> `const`定义变量，与`let`定义变量类似，但是`不能重新给整个变量赋新值,建立新的引用关系！该变量与内存中开辟的空间建立的引用链不能断掉。`该关键字想表达的意思，其实就是说某个变量对内存中开辟的存储空间的引用关系固定下来以后就不能再改变了。


## 5. 接口



## 6. 最常用的12种工具类型

|                工具类型                |                               描述                                | 发布版本 |
| :------------------------------------: | :---------------------------------------------------------------: | :------: |
|            `Awaited<Type>`             |                      获取Promise中的结果类型                      |   4.5    |
|            `Partial<Type>`             |      将Type中的所有属性设置为**可选属性**，返回一个新的类型       |   2.1    |
|            `Required<Type>`            |      将Type中的所有属性设置为**必选属性**，返回一个新的类型       |   2.8    |
|            `Readonly<Type>`            |      将Type中的所有属性设置为**只读属性**，返回一个新的类型       |   2.1    |
|          `Record<Keys, Type>`          |       新建一个由Keys指定的属性和Type指定的值组成的对象类型        |   2.1    |
|          `Pick<Types, Keys>`           |          从Type中选择一个或多个属性，并返回一个新的类型           |   2.1    |
|           `Omit<Type, Keys>`           |          从Type中删除一个或多个属性，并返回一个新的类型           |   3.5    |
| `Exclude<UnionType, ExcludedMembers>`  | 从UnionType中排除ExcludedMembers中的所有类型，并返回一个新的类型  |   2.8    |
| `Extract<UnionType, ExtractedMembers>` | 从UnionType中提取ExtractedMembers中的所有类型，并返回一个新的类型 |   2.8    |
|          `NonNullable<Type>`           |        从Type中排除null和undefined类型，并返回一个新的类型        |   2.8    |
|           `Parameters<Type>`           |            获取函数类型Type的参数类型，以元祖类型返回             |   3.1    |
|           `ReturnType<Type>`           |                   获取函数类型Type的返回值类型                    |   2.8    |




### `Partial<T>`
> 将类型 `T` 中的所有属性变为可选的。


::: tip 原型：
```ts
// @ts-ignore
type Partial<T> = { [P in keyof T]?: T[P] }
```
:::

```ts
interface User {
  name: string;
  email: string;
  password: string;
}

type PartialUser = Partial<User>

const user: PartialUser = {
    name: "John Doe",
    email: "johndoe@gmail.com"
}

console.log(user)
```

### `Required<T>`
> 将类型 `T` 中的所有属性变为必选的。

::: tip 原型：
```ts
// @ts-ignore
type Required<T> = { [P in keyof T]-?: T[P] }
```
:::

```ts
interface User {
  name: string;
  email?: string;
  password?: string;
}

type RequiredUser = Required<User>

const user: RequiredUser = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "123456"
}

console.log(user)
```

### `Readonly<T>`
> 将类型 `T` 中的所有属性变为只读的。

::: tip 原型：
```ts
// @ts-ignore
type Readonly<T> = { readonly [P in keyof T]: T[P] }
```
:::

```ts
interface User {
    name: string;
    email?: string;
    password?: string;
}

type ReadonlyUser = Readonly<User>

const user: ReadonlyUser = {
    name: "John Doe",
    email: "johndoe@gmail.com",
}
// user.password = "123456"     // 错误
// user.name = "Jane Doe"       // 修饰为只读变量，只允许初始化的时候赋值，不允许后面再去修改
console.log(user)
```


### `Record<K, T>`
> 创建一个具有键类型 `K` 和值类型 `T` 的新对象类型。

::: tip 原型：
```ts
// @ts-ignore
type Record<K,T> = { [P in K]: T }
```
:::

```ts
// 例1
interface AppConfig {
    port: string,
    env: 'dev' | 'prod'
}

const config: Record<string, AppConfig> = {
    client: {
        port: "3000",
        env: "dev"
    }
}
// 例2
enum Sex {
    Female= '女',
    Male = '男'
}
const sex: Record<Sex, number> = {
    [Sex.Male]: 1,
    [Sex.Female]: 0
}
console.log(config)
console.log(sex)

// 例3
interface User {
    id: number;
    name: string;
    age?: number;
    phone?: string;
    address?: string
}

type newUser = Record<"admin" | "vip", User>
// @ts-ignore
const user: newUser = {
    admin: {
        id: 1,
        name: 'rose'
    },
    vip: {
        id: 2,
        name: 'jack'
    }
}

console.log(user)
```

- `Record`工作原理类似于下面这种方式：

```ts
type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

type WorkHours = {
  [key in Weekday]: string;
};

```

### `Pick<T, K>`
> 从类型 `T` 中选择指定的属性 `K`，生成一个新类型。

::: tip 原型：
```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```
:::

```ts
interface User {
    id: number;
    name?: string;
    age: number;
    phone: string
}

type PickUser = Pick<User, 'id' | 'name'>

const user: PickUser = {
    id: 1,
    name: 'John'
}

console.log(user)
```


### `Omit<T, K>`
> 从类型 `T` 中排除指定的属性 `K`，生成一个新类型。

::: tip 原型：
```ts
type Omit<T,K> = Pick<T, Exclude<keyof T, K>>
```
:::

```ts
interface User {
    id: number;
    name: string;
    age?: number;
    phone?: string;
    address?: string;
    isAdmin: boolean
}

type PublicUser = Omit<User, "isAdmin">

const user: PublicUser = {
    id: 1,
    name: "John",
}
console.log(user)
```


### `Exclude<T, U>`
> 从类型 `T` 中排除指定的属性 `K`，生成一个新类型。

::: tip 原型：
```ts
type Exclude<T,U> = T extends U ? never : T
```
:::

```ts
type Union = number | string;
type Single = number

type ExcludeType = Exclude<Union, Single>
// 等价于 type ExcludeType = string
```


### `Extract<T, U>`
> 从类型 `T` 中提取可以赋值给类型 `U` 的部分。

::: tip 原型：
```ts
type Extract<T,U> = T extends U ? T : never
```
:::

```ts
type Union = number | string;
type Single = number

type ExtractType = Extract<Union, Single>
// 等价于 type ExtractType = number
```


### `ReturnType<T>`
> 获取函数类型 `T` 的返回值类型。

::: tip 原型：
```ts
type ReturnType<T> = T extends ((...args: any) => infer R) ? R : any
```
:::

```ts
function sayHello (name: string): string {
    return `Hello ${name}`
}

type t1 = ReturnType<typeof sayHello>

const value: t1 = 'world'

console.log(value)
```

### `Parameters<T>`
> 获取函数类型 `T` 的参数类型元组。

::: tip 原型：
```ts
type Parameters<T> = T extends ((...args: infer P) => any) ? P : never
```
:::

```ts
function sayHello (name: string, age: number): string {
    return `Hello ${name}, my age is ${age}`
}

type t1 = Parameters<typeof sayHello>
// type t1 = [name: string, age: number]
const value: t1 = ['Jack', 18]

console.log(value)
```



### `Awaited<T>`

> 指明`Promise`返回结果的类型


```ts
interface User {
  id: number;
  name: string;
}

async function getUser() {
  const response = await fetch("http://127.0.0.1:80/");
  return <Awaited<User[]>>await response.json();
}

getUser().then((value) => {
  console.log(value);
});
```





## 7. `as const`修饰属性为常量(只读属性)

::: tip 说明：

普通变量用`as const`修饰后变成字面量常量或只读属性，对象用`as const`修饰后内部的所有属性均变为只读属性。

:::



```ts
let age = 20 as const;
// age = 30;		// 错误

let user = {
    name: 'jack',
    age: 30,
    address: {
        province: '湖南',
        city: '长沙' as const
    }
} as const
// user.address.city = '岳阳'     // 错误
console.log(user)
```

## 类装饰器

### 1. 使用类装饰器用来扩展类的功能
```ts
// 类装饰器用来扩展类的功能

/**
 * 示例(1): 使用装饰器扩展类可以获取位置信息功能
 */
const MoveDecorator: ClassDecorator = (target) => {
    console.dir(target)
    target.prototype.getPosition = (): { x: number, y: number } => {
        return { x: 200, y: 300 }
    }
}

@MoveDecorator
class Tank { }


/**
 * 示例(2): 使用装饰器扩展统一消息提示功能
 */
const MessageDecorator: ClassDecorator = (target) => {
    target.prototype.showMessage = (message: string): void => {
        console.log(message)
    }
}

/**
 * 定义抽象类结构, 给具体实现功能的子类继承, 从而避开TS类型检查
 */
abstract class AbStractLoginCtroller {
    public login() { }
    public showMessage(message: string): void { }
}


@MessageDecorator
class LoginController extends AbStractLoginCtroller {
    public login() {
        console.log('登录业务处理...');
        this.showMessage('登录成功！');
    }
}

const loginCtroller = new LoginController()
loginCtroller.login()
```


### 2. 使用类装饰器实现工厂函数
```ts
/**
 * 工厂装饰器: 封装一个工厂，根据不同的参数，返回不同的实例
 */
const MusicDecorator = (type: 'Tank' | 'Player'): ClassDecorator => {
    switch (type) {
        case 'Tank':
            return (target) => {
                target.prototype.playMusic = () => {
                    console.log(type, '播放战争音乐...')
                }
            }
        default:
            return (target) => {
                target.prototype.playMusic = () => {
                    console.log(type, '播放角色背景音乐...')
                }
            }
    }
}

@MusicDecorator('Tank')
class Tank {
    public playMusic() { }
}

@MusicDecorator('Player')
class Player {
    public playMusic() { }
}

const tank = new Tank()
const player = new Player()

// 不同的类，调用相同方法就可以实现不同的功能了
tank.playMusic()
player.playMusic()
```


### 3. 方法装饰器

- 示例(1): 修改方法和方法的属性
```ts
const showDecorator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    /**
     * @param target 装饰的目标函数的原型对象
     * @param propertyKey 装饰的方法名称
     * @descriptor 该键对应的值相关的配置描述对象
     */
    console.log(target, propertyKey, descriptor)
    /** 
     * writable: 外部是否可修改
     * ...
     */
    // descriptor.writable = false
    /*descriptor.value = () => {
        console.log('https://www.zhouyu2156.cn/')
    }*/
}


class Person {
    @showDecorator
    public show() {
        console.log('show')
    }
    @showDecorator
    static greet(msg: string) {
        console.log(msg)
    }
}

const p = new Person()
/*p.show = () => {
    console.log('writable为false时, 外部不可修改该方法！')
}*/
p.show()

Person.greet('Hello world！')
```

- 示例(2): 实现代码高亮
```ts
const highlightDecorator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = () => {
        return `<a style="color: red;" href="${method()}" target="_blank">${method()}</a>`
    }
}

class Snippet {
    @highlightDecorator
    public response() {
        return 'https://www.zhouyu2156.cn/'
    }
}

document.body.insertAdjacentHTML('beforeend', new Snippet().response())
```

- 示例(3): 实现延迟调用功能
```ts
/**
 * 实现方法延迟执行功能
 * @param times 时间
 * @returns 方法具有延迟执行的功能
 */
const SleepDecorator = (times: number): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const method = descriptor.value;
        descriptor.value = () => {
            setTimeout(() => {
                method()
            }, times)
        }
    }
}
// 上面的代码可以简写如下
const SleepDecorator1 = (times: number): MethodDecorator => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = () => {
        setTimeout(() => {
            method()
        }, times)
    }
}


/**
 * 为了避免参数描述冗余过长, 下面进行简化
 */
const SleepDecorator2 = (times: number): MethodDecorator => (...args: any[]) => {
    // 解构得到参数列表的第三个参数, 方法描述器
    const [, , descriptor] = args;
    const method = descriptor.value;
    descriptor.value = () => {
        setTimeout(() => {
            method()
        }, times)
    }
}



class User {
    @SleepDecorator(1000)
    public login() {
        console.log('用户登录业务功能')
    }
}


new User().login()
```

- 示例(4): 异常捕获装饰器和工厂
```ts
/**
 * 实现错误异常捕获装饰器
 */
const ErrorDecorator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const source = descriptor.value;
    descriptor.value = () => {
        try {
            source();
        } catch (error: any) {
            console.log(`%c请求失败, 错误内容: ${error.message}`, 'color: red;');
        }
    }
}
/**
 * 实现自定义错误提示装饰器工厂
 * @param title 错误标题
 * @param titleFontSize 标题文字大小
 * @returns 
 */
const ErrorDecoratorFactory = (title: string = '默认提示标题', titleFontSize: number = 12): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const source = descriptor.value;
        descriptor.value = () => {
            try {
                source();
            } catch (error: any) {
                console.log(`%c${title}, 提示信息: ${error.message}`, `color: red; font-size: ${titleFontSize}px; `);
            }
        }
    }
}


class User {
    @ErrorDecorator
    public login() {
        throw new Error('登录失败！')
    }

    @ErrorDecoratorFactory('用户创建方法', 16)
    public create() {
        throw new Error('创建失败！')
    }
}

const user = new User()
user.login()
user.create()
```

- 示例(5): 权限访问控制
```ts
const user = {
    name: 'zs',
    isLogin: false
}
/**
 * 权限访问拦截的装饰器
 */
const AccessDecorator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = () => {
        if (user.isLogin) {
            return originalMethod();
        } else {
            console.log('暂无认证, 请先登录！')
        }
    }
}

class User {
    show() {
        console.log('展示文章')
    }

    @AccessDecorator
    public store() {
        console.log('保存文章')
    }
}


const u = new User()
u.show()
u.store()
```

- 示例(6): 权限控制
```ts
enum Permission {
    Admin = 0b001,  // 管理员
    User = 0b010,   // 普通用户
    Guest = 0b100,   // 游客
}

type UserType = { name: string, isLogin: boolean, permissions: Permission }

const user: UserType = {
    name: 'admin',
    isLogin: true,
    permissions: Permission.Admin
}

const AccessDecorator = (args: string[]): MethodDecorator => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const fn = <Function>descriptor.value;

    descriptor.value = function () {
        const permission = user.permissions;
        switch (permission) {
            case Permission.Admin:
                return fn.call(this, args);
            case Permission.User:
                return fn.apply(this, [args]);
            default:
                return console.log('无权限');
        }
    }
}

class Article {
    /**
     * 展示文章不需要权限
     */
    show() { }
    /**
     * 发布文章设置权限
     * @param permissions 允许操作的权限
     */

    @AccessDecorator(['create', 'publish', 'update', 'delete'])
    publish(permissions?: string[]) {
        // const permissions = arguments[0]
        console.log('传过来的参数: ', permissions)
        console.log('发布文章')
    }
}

new Article().publish()
```

- 示例(7): 请求装饰
```ts
type UserType = {
    name: string,
    age: number
}

const RequestDecorator = (url: string): MethodDecorator => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const fn: (users: UserType[]) => void = descriptor.value;
    descriptor.value = () => {
        new Promise<UserType[]>((resolve, reject) => {
            try {
                // throw new Error('请求失败')
                setTimeout(() => {
                    resolve([{ name: 'zs', age: 18 }, { name: 'ls', age: 19 }])
                }, 1000)
            } catch (error: any) {
                reject(error.message)
            }
        }).then(response => {
            /** 请求成功的响应内容 */
            fn(response)
        }).catch(reason => {
            /** 请求失败的错误原因 */
            console.log(reason)
        })
    }
}

class User {
    @RequestDecorator('https://www.zhouyu2156.cn/')
    getUser(users: UserType[] = []) {
        console.log(users)
    }
}

new User().getUser()
```


### 4. 属性 & 参数装饰器
```ts
const PropDecorator: PropertyDecorator = (...args: any[])/** target: Object, propertyKey: string | symbol */ => {
    // console.log(args)
}
const ParamDecorator: ParameterDecorator = (...args: any[])/** (target: Object, propertyKey: string | symbol, parameterIndex: number) */ => {
    console.log(args)
}

class User {
    /** 装饰普通属性, target 为普通对象 */
    @PropDecorator
    public title: string | undefined
    /** 装饰静态成员属性, target 为类原型对象 */
    @PropDecorator
    public static content: string | undefined
    /** 参数装饰器: 和属性装饰器类似, 普通方法的 target 为普通对象, 静态方法的 target 为类原型对象 */
    public show(id: number = 1, title: string, @ParamDecorator content: string) { }
    public static greet(id: number = 1, @ParamDecorator title: string = '静态方法的参数装饰器', content: string) { }
}
```

- 示例(1): 装饰属性扩大倍数
```ts
const DoubleDecorator: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
    let value: number
    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (v: number) => value = v * 2
    })
}
class User {
    @DoubleDecorator
    public num: number | undefined
}

const user = new User()
user.num = 50
console.log(user.num)
```

### 5. 给属性设置元数据

> 需要先按照第三方包
```bash
$ npm install reflect-metadata
```

- 示例: 给属性设置元数据

```ts
import 'reflect-metadata'

const user = {
    name: 'zhouyu'
}

/** 给属性设置元数据 */
Reflect.defineMetadata('site', { url: 'www.zhouyu2156.cn' }, user, 'name')

/** 查看属性身上添加的元数据 */
console.warn(Reflect.getMetadata('site', user, 'name'))
```


## 类型声明文件

::: tip 说明
- 类型声明文件只是提供集成开发环境编辑器拥有更好的更智能的类型提示，类型声明文件不能直接编写业务逻辑，只提供形式上的类型结构！
- 下面介绍几种类型声明文件创建的方式：
:::


### 自己编写类型声明文件

::: code-group

```javascript [utils.js]
// 编写实际的业务逻辑代码
export const add = (x, y) => x + y
export const concat = (str1, str2) => str1 + str2
```

```typescript [utils.d.ts]
// 编写类型声明文件
declare const concat: (str1: string, str2: string) => string

declare const add: (x: number, y: number) => number

```
```javascript [main.js]
// 使用 utils.js 模块时， 就会自动加载同名的类型声明文件 utils.d.ts 以便提示，是编辑器自动加载来提示的，并不是真的运行时的引用加载
import { add, concat } from './utils.js'

const r1 = add(1, 2)
const r2 = concat('hello', 'world')
console.log(r1, r2)
```
:::

::: warning 缺陷
- 明明在TS中已经自己写过类型注解了，结果转换出来的`js`库还需要自己手动编写类型声明文件，那不得麻烦死。所以这仅仅是一种练习和学习的时候使用的方式，接下来由`typescript`编译工具为我根据`ts`文件中的类型注解为我们自动生成声明文件。
:::

### 自动生成类型声明文件

> 需要先全局安装`TS`编译工具

```bash
$ npm i typescript -g
```

> 然后使用命令`tsc --init`初始化生成`TS`配置文件`tsconfig.json`，配置文件中开启下面的选项

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

> 编写完`js`文件后，在`tsconfig.json`同级路径下，执行`tsc`进行编译即会自动生成每一个`js`文件的`.d.ts`类型声明文件。
