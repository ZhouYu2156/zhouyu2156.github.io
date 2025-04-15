# Vite构建工具

## 创建工程项目

::: tip 提示

- 官方提供了主流的各种框架的项目模板，只需要执行下面的命令就能快速生成主流框架联合`Vite`的基础模板。

- 更多详情，查看[官方文档](https://cn.vitejs.dev/guide/)

:::



> :warning:注意：对于 `npm 7+ 版本`, 需要使用额外的 `--`，并接上`--template`参数指定需要的配置模板来一键式创建模板结构，有如下常见的各种主流框架与`Vite`联合的配置模板：`vanilla`、`vanilla-ts`、`vue`、`vue-ts`、`react`、`react-ts`、`react-swc`、`react-swc-ts`、`preact`、`preact-ts`、`lit`、`lit-ts`、`svelte`、`svelte-ts`、`solid`、`solid-ts`、`qwik`、`qwik-ts`



::: details

```bash
# (1)一键式生成项目配置模板
$ npm create vite@latest my-vue-app -- --template vue

# (2)手动式选择配置配置模板
$ npm create vite@latest my-app
? Select a framework: » - Use arrow-keys. Return to submit.
>   Vanilla
    Vue
    React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others
? Select a variant: » - Use arrow-keys. Return to submit.
>   TypeScript
    JavaScript
    Customize with create-vue ↗
    Nuxt ↗
```
:::




