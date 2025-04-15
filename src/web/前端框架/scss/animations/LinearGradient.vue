<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { Direction, Position, type DirectionOption } from '../types';

// 渐变方向
const direction = ref<Direction>(Direction.bottom);

// 遍历 Direction, 将其转换为 options
const options = ref<DirectionOption[]>([
    {
        label: Position.top,
        value: Direction.top
    },
    {
        label: Position.bottom,
        value: Direction.bottom
    },
    {
        label: Position.left,
        value: Direction.left
    },
    {
        label: Position.right,
        value: Direction.right
    },
    {
        label: Position.leftBottom,
        value: Direction.leftBottom
    },
    {
        label: Position.rightTop,
        value: Direction.rightTop
    },
    {
        label: Position.leftTop,
        value: Direction.leftTop
    },
    {
        label: Position.rightBottom,
        value: Direction.rightBottom
    }
]);

// related to the div element
const div = ref<HTMLDivElement | null>(null);

// 开始颜色
const startColor = ref<string>('#27ae60');
// 结束颜色
const endColor = ref<string>('#e74c3c');

watch(direction, () => {
    div.value!.style.background = `linear-gradient(to ${direction.value}, ${startColor.value}, ${endColor.value})`;
});

onMounted(() => {
    div.value!.style.width = '400px';
    div.value!.style.height = '200px';
    div.value!.style.background = `linear-gradient(to ${direction.value}, ${startColor.value}, ${endColor.value})`;
})

</script>

<template>
    <div style="display: flex; justify-content:space-between;">
        <div ref="div" style="text-align: center; line-height: 100px;">
            {{ `linear-gradient(to ${direction}, ${startColor}, ${endColor})` }}
        </div>
        <el-select v-model="direction" placeholder="渐变方向" size="large" style="width: 240px; margin-right: 10px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>
</template>

<style scoped lang='scss'></style>