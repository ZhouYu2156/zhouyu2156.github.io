<template>
  <div class="controller">
    <h3>行间距</h3>
    <input type="range" min="0" max="10" step="0.05" v-model="rowSpan" />
    <p>{{ rowSpan }}rem</p>
    <h3>列间距</h3>
    <input type="range" min="0" max="10" step="0.05" v-model="columnSpan" />
    <p class="mt-3">
      <el-button @click="mergeAandB">合并列</el-button>
    </p>
    <p class="mt-3">
      <el-button @click="mergeCandD">合并行</el-button>
    </p>
    <p class="mt-3">
      <el-button @click="mergeFandG">合并行和列</el-button>
    </p>
  </div>
  <div class="grid-layout" ref="gridContainer">
    <div class="item" ref="item1">1</div>
    <div class="item" ref="item2">2</div>
    <div class="item">3</div>
    <div class="item" ref="item4">4</div>
    <div class="item">5</div>
    <div class="item" ref="item6">6</div>
    <div class="item" ref="item7">7</div>
    <div class="item" ref="item8">8</div>
    <div class="item">9</div>
    <div class="item" ref="item10">10</div>
    <div class="item" ref="item11">11</div>
    <div class="item">12</div>
    <div class="item">13</div>
    <div class="item">14</div>
    <div class="item">15</div>
    <div class="item">16</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const gridContainer = ref<HTMLDivElement | null>(null)
// 合并 1 和 2 网格元素: 合并行
const item1 = ref<HTMLDivElement | null>(null)
const item2 = ref<HTMLDivElement | null>(null)

// 合并 4 和 8 网格元素: 合并列
const item4 = ref<HTMLDivElement | null>(null)
const item8 = ref<HTMLDivElement | null>(null)

// 合并 6 和 7, 10 和 11 网格元素: 合并行和列
const item6 = ref<HTMLDivElement | null>(null)
const item7 = ref<HTMLDivElement | null>(null)
const item10 = ref<HTMLDivElement | null>(null)
const item11 = ref<HTMLDivElement | null>(null)

const rowSpan = ref(1)
const columnSpan = ref(1)

watch([rowSpan, columnSpan], ([row, column]) => {
  // 设置行间距
  gridContainer.value?.style.setProperty('grid-row-gap', `${row}rem`)
  // 设置列间距
  gridContainer.value?.style.setProperty('grid-column-gap', `${column}rem`)
})

// 合并 1 和 2 网格元素: 合并行方法
const mergeAandB = () => {
  item2.value?.style.setProperty('display', 'none')
  item1.value?.style.setProperty('grid-column', 'span 2')
}
// 合并 4 和 8 网格元素: 合并列方法
const mergeCandD = () => {
  item8.value?.style.setProperty('display', 'none')
  item4.value?.style.setProperty('grid-row', 'span 2')
}

// 合并 6 和 7, 10 和 11 网格元素: 合并行和列方法
const mergeFandG = () => {
  item7.value?.style.setProperty('display', 'none')
  item10.value?.style.setProperty('display', 'none')
  item11.value?.style.setProperty('display', 'none')
  // 或者 span 行数  / span 列数
  item6.value?.style.setProperty('grid-area', 'span 2 / span 2')
}
</script>

<style scoped lang="scss">
@use 'sass:list';
@use 'sass:math';

.controller {
  width: 200px;
  height: 100%;
  margin-top: 1rem;
}

.grid-layout {
  width: 600px;
  height: 500px;
  display: grid;
  grid-template-rows: repeat(4, 1fr); // 父盒子分成多少行, 每行的高度是1fr, 1fr表示剩余空间的比例, 1fr表示平均分配多少份
  grid-template-columns: repeat(4, 1fr);
  // gap: 1rem 1.5rem; // 行、列间距的简写, 可以简写一个值
  grid-row-gap: 1rem; // 行间距
  grid-column-gap: 1rem; // 列间距
  transition: 0.5s;

  > .item {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e67e22;
    color: #fff;
    font-size: 1rem;
    border-radius: 5px;
    transition: all 0.5s;
  }
}

@for $i from 0 to 16 {
  .item:nth-child(#{$i + 1}) {
    // background: hsl(calc($i * 40%), 100%, 74%);
    /** 将上面的计算换一种方式, 因为 sass 不支持 calc 运算符 */
    background: hsl(calc(#{$i} * 40%), 100%, 74%);
  }

  .grid-layout:has(.item:nth-child(#{$i + 1}):hover) {
    $r: math.floor(calc($i / 4 + 1));
    $c: $i % 4 + 1;
    $arr: 1fr 1fr 1fr 1fr;
    $rows: list.set-nth($arr, $r, 2fr);
    $columns: list.set-nth($arr, $c, 2fr);
    grid-template-rows: $rows;
    grid-template-columns: $columns;
  }
}
</style>
