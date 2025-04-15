# JavaScript常识整理

## nodejs 默认采用 commonjs 模块化规范

::: tip 科普
- (1)每个模块都Node.js 应用由模块组成，每个文件就是一个模块，有自己的作用域。
- (2)在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。
- (3)每个模块内部有两个变量可以使用，`require` 和 `module`。`require` 用来加载某个模块，`module` 代表当前模块，是一个对象，保存了当前模块需要导出的信息。
- (4)`exports` 是 `module` 上的一个属性，保存了当前模块要导出的接口或者变量，使用 require 加载的某个模块获取到的值就是那个模块使用 `exports` 导出的值。
- (5)注意: exports 和 module.exports 是指向同一个对象。最终`require`加载模块时以`module.exports`导出的对象为准。重新给`exports`赋值，相当于`exports`断掉与`module.exports`的关联，`exports`不再指向`module.exports`，所以实际并不会影响`module.exports`的导出结果。
- (6)`package.json`中不显式指定模块规范类型`type`字段的话，那么在 js 脚本中可以自己选择`commonjs`模块化方案或者`es6`模块化规范，在构建时会自动解析，但是不能两种语法混合，否则会报错。
:::

> 总结: `commonjs`模块化规范规定: 每个模块有独立的空间，互不影响，使用`require`来引入模块对象，`module.exports`来导出模块对象，`exports`全局变量是`module.exports`的一个引用，如果给`exports`变量重新赋值，`module.exports`不会受影响，最终导出结果以`module.exports`导出的对象为准。


## `ES Modules`(ESM)模块化规范

::: tip 科普 
- ECMAScript 2015（ES6）引入了官方的JavaScript模块化标准，称为ES Modules (ESM)。
- `export` 命令用于导出模块的对外接口，`import` 命令用于导入其他模块导出的内容。

特点：

- 静态结构：ESM的设计是静态的，这意味着你不能根据条件动态地导入或导出模块。所有的导入和导出语句都必须位于模块的顶层，并且它们在代码的解析阶段就已经确定，这支持了编译时优化，如“摇树”优化（`Tree Shaking`），这种优化可以移除未使用的代码，从而减少最终打包文件的大小。
- 实时绑定：ESM导出的是引用，而不是值的复制。这意味着，如果模块内导出的变量值发生了变化，导入该模块的其他模块也能实时获取到最新的值。
- 异步加载：ESM支持原生的异步加载模块，使用`import()`语法可以实现动态导入，这对于按需加载代码、减少初始加载时间非常有用。
:::

> 设计的考虑：

- ES6模块：目标是为JavaScript提供一种静态的模块系统，支持编译时优化和更好的静态分析。它的设计鼓励模块的前置声明，使得模块依赖更清晰，也便于各种工具进行分析和打包。
- CommonJS：最初是为服务器环境设计的，考虑到服务器端模块的加载一般不会涉及到网络延迟，因此采用了同步加载的方式。它的设计允许更灵活的模块定义和导出方式，适合Node.js这样的环境。

::: info 对比
CommonJs和ES Module的区别：
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
:::


## 脚手架开发依赖

::: tip 推荐 
- chalk：控制台字符样式
- commander：node.js命令行接口的完整解决方案
- fs-extra：增强的基础文件操作库
- inquirer：实现命令行之间的交互
- ora：优雅终端Spinner等待动画
- axios：结合Gitlab API获取仓库列表、Tags...
- download-git-repo：从Github/Gitlab中拉取仓库代码
- consolidate ：模板引擎整合库。主要使用ejs实现模板字符替换
- ncp ：像cp -r一样拷贝目录、文件
- metalsmith ：可插入的静态网站生成器；例如获取到根据用户自定义的输入或选择配合ejs渲染变量后的最终内容后，通过它做插入修改。
- semver ：获取库的有效版本号
- ini ：一个用于节点的ini格式解析器和序列化器。主要是对配置做编码和解码。
- jscodeshift ：可以解析文件将代码从AST-to-AST。例如新建一个页面后需要在routes.ts中新建一份路由。
:::

