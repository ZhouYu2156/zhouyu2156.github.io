# Vue 框架

## 一、创建并运行 Vue 项目

::: info 参考:

> 推荐 1：[Vue Cli 官网](https://cli.vuejs.org/)

> 推荐 2：[create-vue](https://github.com/vuejs/create-vue)

:::

::: code-group

```bash [无需安装 CLI]
$ npx create-vue my-app
```

```bash [全局安装 CLI]
$ npm install -g @vue/cli
$ npm create vue@latest
$ # todo...
$ npm run dev       # 注意看 package.json 文件中的项目启动命令，可能会变化
```

:::

## 二、Vue 基础

### 了解Vue

#### Vue 实例属性
- `$attrs`: `$attrs` 是一个对象，包含了父组件传递给子组件的属性，但是没有被 `props` 配置中的属性所声明的。
- `$children`: `$children` 是一个数组，包含了当前实例的直接子组件的实例。
- `$createElement`: `$createElement` 是一个函数，用于创建 Vue 虚拟 DOM 对象。
- `$listeners`: `$listeners` 是一个对象，包含了当前实例的监听器对象。
- `$options`: `$options` 是一个对象，包含了当前实例的选项对象。
- `$parent`: `$parent` 是一个指向当前实例的父组件实例的引用。
- `$refs`: `$refs` 是一个对象，包含了当前实例中的所有 `ref` 属性所声明的组件实例或 HTML 元素的引用。
- `$root`: `$root` 是一个指向当前实例的根实例的引用。
- `$scopedSlots`: `$scopedSlots` 是一个对象，包含了当前实例的作用域插槽内容。
- `$slots`: `$slots` 是一个对象，包含了当前实例的插槽内容。
- `$vnode`: `$vnode` 是一个对象，包含了当前实例的虚拟 DOM 对象。
- `...`

#### Vue原型属性
- `$delete`: `$delete` 是一个函数，用于删除对象中的属性。
- `$destroy`: `$destroy` 是一个函数，用于销毁当前实例。
- `$emit`: `$emit` 是一个函数，用于触发事件。
- `$forceUpdate`: `$forceUpdate` 是一个函数，用于强制更新当前实例。
- `$mount`: `$mount` 是一个函数，用于挂载当前实例。
- `$nextTick`: `$nextTick` 是一个函数，用于在下次 DOM 更新循环结束之后执行延迟回调。
- `$on`: `$on` 是一个函数，用于监听事件。
- `$once`: `$once` 是一个函数，用于监听事件，但只触发一次。
- `$set`: `$set` 是一个函数，用于设置对象中的属性。
- `$off`: `$off` 是一个函数，用于移除监听器。
- `$watch`: `$watch` 是一个函数，用于监听数据变化。
- `...`



### 基础语法

#### 1. 插值语法

```html
<h1>{{ message }}</h1>
```



#### 2. 指令

##### 单向数据绑定

- 完整写法

```html
<a v-bind:href="url">跳转百度</a>
```

- 简写

```html
<a :href="url">跳转百度</a>
```

##### 双向数据绑定

::: tip 说明：

实际底层还是对单项数据绑定添加了一个监听输入框变化的事件从而改变数据源的方法, `v-bind`和`@change`的结合。

:::

```html
<input type="text" v-model="message">
```







#### 3. `el` 和 `data` 配置的两种方式

```html
<script>
    Vue.config.productionTip = false
    const app = new Vue({
        // el: '#app',      // 第一种el选项的方式
        /*data: {
                message: 'Hello Vue!',      // data选项的方式
            }*/
        data() {
            return {
                message: 'Hello Vue!',  // 第二种函数调用的方式
            }
        }
    })
    app.$mount('#app')      // 函数调用的方式
</script>
```










## 三、Echarts 使用

::: tip 推荐

> 学习：[前往官网](https://echarts.apache.org/zh/index.html)

:::

### 基于`Vue3`创建`Echarts`图表

::: info 前提

> 本演示项目需要的依赖：

::: code-group

```bash [下载依赖]
$ npm i sass
$ npm install echarts --save
```

:::

::: code-group

```vue [App.vue]
<script setup lang="ts">
import { ref } from "vue";
import Graphic from "./components/Graphic.vue";

var option = {
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  legend: {
    data: ["销量"],
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};
</script>

<template>
  <div class="mychart">
    <Graphic
      :data="option"
      width="600px"
      height="600px"
      :style="{ background: 'transparent' }"
    >
      <template #mychart> this is a slot </template>
    </Graphic>
  </div>
</template>

<style scoped>
.mychart {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

```vue [容器组件 Graphic.vue]
<script setup lang="ts">
import * as echart from "echarts";
// 从官网配置 并 导入主题对象
/** Read document: https://echarts.apache.org/zh/theme-builder.html */

// import vintageTheme from '../assets/theme/vintage'
// import darkTheme from '../assets/theme/dark'
import wonderlandTheme from "../assets/theme/wonderland";
import { ref, onMounted, onUnmounted } from "vue";

// 获引用图表容器
const graph = ref<HTMLDivElement | null>();
// 生成容器 id 标识
const hash_id = ref("id" + generateHash());
// echart 实例对象
const chart = ref<echart.ECharts>();

// 定义外部可以传入的参数
const props = defineProps({
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  style: Object,
  data: {
    type: Object,
    required: true,
  },
});

function generateHash() {
  /**
   * 生成容器 id
   */
  const array = new Uint32Array(8); // 创建一个包含8个无符号32位整数的UInt32Array对象
  crypto.getRandomValues(array); // 获取系统提供的随机值并存入数组

  let hashString = "";
  for (let i = 0; i < array.length; i++) {
    hashString += array[i].toString(); // 将每个元素转换为字符串并连接起来
  }

  return hashString;
}

/** 组件挂在完成获取图表盒子，基于数据创建图表 */
onMounted(() => {
  // 1、获取 dom 初始化 echart
  const myChartBox = graph.value ?? document.getElementById(hash_id.value);

  // 可以注册不同的主题
  // echart.registerTheme('vintage', vintageTheme);
  // echart.registerTheme('dark', darkTheme);
  echart.registerTheme("wonderland", wonderlandTheme);

  chart.value = echart.init(myChartBox, "wonderland", {
    //width: 400,          /** 如果图表和容器大小不一样大的话，设置图表绘制的宽 */
    //height: 400,
    renderer: "svg" /** 设置渲染器 */,
  });

  // 2、创建数据
  const { data } = props;

  // 3、基于数据创建图表
  chart.value.setOption(data);

  window.addEventListener("resize", function () {
    chart.value!.resize();
  });
});
// 卸载时销毁图表
onUnmounted(() => {
  chart.value!.dispose();
});
</script>

<template>
  <div :style="{ width, height, ...style }" ref="graph" :id="hash_id">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
```

```ts [wonderland.ts]
export default {
  color: ["#4ea397", "#22c3aa", "#7bd9a5", "#d0648a", "#f58db2", "#f2b3c9"],
  backgroundColor: "rgba(255,255,255,0)",
  textStyle: {},
  title: {
    textStyle: {
      color: "#666666",
    },
    subtextStyle: {
      color: "#999999",
    },
  },
  line: {
    itemStyle: {
      borderWidth: "2",
    },
    lineStyle: {
      width: "3",
    },
    symbolSize: "8",
    symbol: "emptyCircle",
    smooth: false,
  },
  radar: {
    itemStyle: {
      borderWidth: "2",
    },
    lineStyle: {
      width: "3",
    },
    symbolSize: "8",
    symbol: "emptyCircle",
    smooth: false,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: "#ccc",
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  candlestick: {
    itemStyle: {
      color: "#d0648a",
      color0: "transparent",
      borderColor: "#d0648a",
      borderColor0: "#22c3aa",
      borderWidth: "1",
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
    lineStyle: {
      width: "1",
      color: "#cccccc",
    },
    symbolSize: "8",
    symbol: "emptyCircle",
    smooth: false,
    color: ["#4ea397", "#22c3aa", "#7bd9a5", "#d0648a", "#f58db2", "#f2b3c9"],
    label: {
      color: "#ffffff",
    },
  },
  map: {
    itemStyle: {
      areaColor: "#eeeeee",
      borderColor: "#999999",
      borderWidth: 0.5,
    },
    label: {
      color: "#28544e",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(34,195,170,0.25)",
        borderColor: "#22c3aa",
        borderWidth: 1,
      },
      label: {
        color: "#349e8e",
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: "#eeeeee",
      borderColor: "#999999",
      borderWidth: 0.5,
    },
    label: {
      color: "#28544e",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(34,195,170,0.25)",
        borderColor: "#22c3aa",
        borderWidth: 1,
      },
      label: {
        color: "#349e8e",
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#999999",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#eeeeee"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#999999",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#eeeeee"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#999999",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#eeeeee"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#999999",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#eeeeee"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: "#999999",
    },
    emphasis: {
      iconStyle: {
        borderColor: "#666666",
      },
    },
  },
  legend: {
    textStyle: {
      color: "#999999",
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: "#cccccc",
        width: 1,
      },
      crossStyle: {
        color: "#cccccc",
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: "#4ea397",
      width: 1,
    },
    itemStyle: {
      color: "#4ea397",
      borderWidth: 1,
    },
    controlStyle: {
      color: "#4ea397",
      borderColor: "#4ea397",
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: "#4ea397",
      borderColor: "#3cebd2",
    },
    label: {
      color: "#4ea397",
    },
    emphasis: {
      itemStyle: {
        color: "#4ea397",
      },
      controlStyle: {
        color: "#4ea397",
        borderColor: "#4ea397",
        borderWidth: 0.5,
      },
      label: {
        color: "#4ea397",
      },
    },
  },
  visualMap: {
    color: ["#d0648a", "#22c3aa", "#adfff1"],
  },
  dataZoom: {
    backgroundColor: "rgba(255,255,255,0)",
    dataBackgroundColor: "rgba(222,222,222,1)",
    fillerColor: "rgba(114,230,212,0.25)",
    handleColor: "#cccccc",
    handleSize: "100%",
    textStyle: {
      color: "#999999",
    },
  },
  markPoint: {
    label: {
      color: "#ffffff",
    },
    emphasis: {
      label: {
        color: "#ffffff",
      },
    },
  },
};
```

:::





## 四、ElementPlus主题色定制



### 下载配置所需的插件

```bash
$ npm i -D sass unplugin-auto-import unplugin-vue-components
```





### 1. 新建 `@/styles/element/index.scss`

```scss
/* 只需要重写你需要的即可 */
@forward "element-plus/theme-chalk/src/common/var.scss" with (
    $colors: (
        "white": #ffffff,
        "black": #000000,
        "primary": (
            "base": #0c76e0
        ),
        "success": (
            "base": #07c972
        ),
        "warning": (
            "base": #ee9b1f
        ),
        "danger": (
            "base": #dc2121
        ),
        "error": (
            "base": #e10e0e
        ),
        "info": (
            "base": #45ccd6
        )
    )
);
```



2. 配置 `vite.config.ts`

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 引入 Element Plus 的自动导入功能
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    Components({
      resolvers: [
        // 1、配置ElementPlus采用sass样式配色系统
        ElementPlusResolver({ importStyle: 'sass' }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2、自动导入定制化样式文件进行样式覆盖
        additionalData: `
        @use "@/styles/element/index.scss" as *;
        `,
      },
    },
  }
})
```



### 3. `main.ts` 文件中的配置

```ts
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// 导入 element plus 的 所有 css 样式
// import 'element-plus/dist/index.css'
//导入 element plus 的所有 sass 样式进行编译
import "element-plus/theme-chalk/src/index.scss";
// 导入element plus 暗色主题样式(也可以用同样的方式自己定义暗色主题的颜色)
import 'element-plus/theme-chalk/dark/css-vars.css';
// 导入自定义样式
import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

```





