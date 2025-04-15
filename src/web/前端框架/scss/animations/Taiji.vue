<script setup lang='ts'>
import { ref } from 'vue'
</script>

<template>
    <div class="taiji"></div>
</template>

<style scoped lang='scss'>
.taiji {
    --taiji-width: 300px;
    --taiji-height: 300px;
    resize: both;
    width: var(--taiji-width);
    height: var(--taiji-height);
    background: #eee;
    /** 这两项配合可以实现用户自己放大缩小盒子 */
    resize: both;
    overflow: auto;

}
</style>