<script setup lang='ts'>
import { ref } from 'vue'
</script>

<template>
    <div class="cube" style="--cube-width: 200px; --cube-height: 200px;">
        <div style="--position: 1"></div>
        <div style="--position: 2"></div>
        <div style="--position: 3"></div>
        <div style="--position: 4"></div>
    </div>
</template>

<style scoped lang='scss'>
@property --last-counter {
    /** 规定这个值的类型, 当允许外部修改时, 如果修改的值类型不属于规定的数据类型, 将不会生效, "*" 表示允许所有的值 */
    syntax: "<integer>";
    /** 是否允许外部修改该属性 */
    inherits: false;
    /** 初始值 */
    initial-value: 4;
}

@property --angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: calc(360deg / 4);
}

@property --photo-transform-originX {
    syntax: "<angle>";
    inherits: true;
    initial-value: -30deg;
}

@property --photo-transform-originY {
    syntax: "<angle>";
    inherits: true;
    initial-value: 0deg;
}

@keyframes CubeAutoPlay {
    to {
        --photo-transform-originY: 360deg;
    }
}

.cube {
    position: relative;
    width: var(--cube-width, 300px);
    height: var(--cube-height, 300px);
    /* background: #34495e; */
    /* border: 1px solid black; */
    margin: 200px auto;
    transform-style: preserve-3d;
    transform: perspective(1000px) rotateX(var(--photo-transform-originX)) rotateY(var(--photo-transform-originY));
    animation: CubeAutoPlay 3s linear infinite alternate;

    &:hover {
        animation-play-state: paused;
    }

    >div {
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        background-size: cover;
        background-repeat: no-repeat;
        -webkit-box-reflect: below 0px linear-gradient(transparent, rgba(0, 0, 0, 0.2));


        &:nth-child(1) {
            background-color: #1abc9c;
            background-image: url('https://picsum.photos/300/300?random=1');
            transform: rotateY(calc(var(--angle) * calc(var(--position) - 1))) translateZ(calc(var(--cube-width)));

        }

        &:nth-child(2) {
            background-color: #2ecc71;
            background-image: url('https://picsum.photos/300/300?random=2');
            transform: rotateY(calc(var(--angle) * calc(var(--position) - 1))) translateZ(calc(var(--cube-width)));
        }

        &:nth-child(3) {
            background-color: #3498db;
            background-image: url('https://picsum.photos/300/300?random=3');
            transform: rotateY(calc(var(--angle) * calc(var(--position) - 1))) translateZ(calc(var(--cube-width)));
        }

        &:nth-child(4) {
            background-color: #e67e22;
            background-image: url('https://picsum.photos/300/300?random=4');
            transform: rotateY(calc(var(--angle) * calc(var(--position) - 1))) translateZ(calc(var(--cube-width)));
        }
    }
}
</style>