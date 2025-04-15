<script setup lang='ts'>
import { ref } from 'vue'
</script>

<template>
    <div class="cube" style="--cube-width: 300px; --cube-height: 300px;">
        <div style="--position: 1"></div>
        <div style="--position: 2"></div>
        <div style="--position: 3"></div>
        <div style="--position: 4"></div>
        <div style="--position: 5"></div>
        <div style="--position: 6"></div>
    </div>
</template>

<style scoped lang='scss'>
@property --last-counter {
    syntax: "<integer>";
    inherits: false;
    initial-value: 4;
}

@property --angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: calc(360deg / 4);
}

@property --transform-origin {
    syntax: "<angle>";
    inherits: true;
    initial-value: 90deg;
}

@keyframes CubeAutoPlay {
    to {
        transform: perspective(1000px) rotateX(-30deg) rotateY(360deg) rotateZ(360deg);
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
    transform: perspective(1000px) rotateX(calc(var(--transform-origin)));
    animation: CubeAutoPlay 3s linear infinite alternate;
    /* -webkit-box-reflect: below 0px linear-gradient(transparent, rgba(0, 0, 0, 0.2)); */

    >div {
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        background-size: cover;
        background-repeat: no-repeat;


        &:nth-child(1) {
            background-color: #1abc9c;
            background-image: url('https://picsum.photos/300/300?random=1');
            transform: rotateY(calc(var(--angle) * calc(var(--position) - 1))) translateZ(calc(var(--cube-width) / 2));

        }

        &:nth-child(2) {
            background-color: #2ecc71;
            background-image: url('https://picsum.photos/300/300?random=2');
            transform: rotateY(calc(var(--angle) * calc(var(--position) - 1))) translateZ(calc(var(--cube-width) / 2));
        }

        &:nth-child(3) {
            background-color: #3498db;
            background-image: url('https://picsum.photos/300/300?random=3');
            transform: rotateY(calc(var(--angle) * calc(var(--position) - 1))) translateZ(calc(var(--cube-width) / 2));
        }

        &:nth-child(4) {
            background-color: #e67e22;
            background-image: url('https://picsum.photos/300/300?random=4');
            transform: rotateY(calc(var(--angle) * calc(var(--position) - 1))) translateZ(calc(var(--cube-width) / 2));
        }

        &:nth-child(5) {
            background-color: #e74c3c;
            background-image: url('https://picsum.photos/300/300?random=5');
            transform: rotateX(calc(-1 * var(--transform-origin))) translateZ(calc(-1 * var(--cube-width) / 2));
        }

        &:nth-child(6) {
            background-color: #f39c12;
            background-image: url('https://picsum.photos/300/300?random=6');
            transform: translateY(calc(var(--cube-height) / 2)) rotateX(calc(var(--transform-origin)));
        }
    }
}
</style>