<script setup lang='ts'>
import { ref } from 'vue'
</script>

<template>
    <div class="heart heartbeat" style="margin: 0 auto;"></div>
</template>

<style scoped lang='scss'>
@keyframes heartbeat {
    from {
        opacity: 0.2;
    }

    25% {
        opacity: 1;
        transform: rotate(45deg) scale(0.35);
    }

    50% {
        transform: rotate(45deg) scale(0.5);
    }

    75% {
        opacity: 1;
        transform: rotate(45deg) scale(0.35);
    }

    to {
        transform: rotate(45deg) scale(0.5);
    }
}

.heart {
    width: 200px;
    height: 200px;
    background-color: #e74c3c;
    position: relative;
    transform: rotate(45deg) scale(0.5);

    &.heartbeat {
        animation-name: heartbeat;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-direction: reverse;
    }

    &::before,
    &::after {
        content: '';
        width: 200px;
        height: 200px;
        border-radius: 100%;
        position: absolute;
    }

    &::before {
        background-color: inherit;
        transform: translateY(-50%);
    }

    &::after {
        background-color: inherit;
        transform: translateX(-50%);
    }
}
</style>