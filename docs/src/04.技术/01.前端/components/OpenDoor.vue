<template>
    <input type="checkbox" class="space" data-before="开启&nbsp;" data-after="&nbsp;探索" />
</template>

<style scoped lang='scss'>
// 太空
.space {
    $width: 100%;
    $height: 300px;
    display: block;
    // 清除默认外观效果
    appearance: none;

    width: $width;
    height: $height;
    background: url("https://pic3.zhimg.com/v2-1c2ecf961f50e792dad16c3709e9652a_r.jpg") no-repeat;
    background-size: cover;
    overflow: hidden;
    transform-style: preserve-3d;
    transform: perspective(1000px);

    // 做一扇门
    &::before,
    &::after {
        content: '';
        line-height: $height;
        display: block;
        color: #fff;
        letter-spacing: 0.5rem;
        font-size: 3rem;
        width: calc($width / 2);
        height: $height;
        background: #34495e;
        transition: 3s;
        text-shadow: 1px 1px 10px blueviolet;
    }

    &::before {
        content: attr(data-before);
        text-align: right;
        position: absolute;
        top: 0;
        left: 0;
        border-right: 3px solid #2c3e50;
        transform-origin: left bottom;
    }

    &::after {
        content: attr(data-after);
        position: absolute;
        top: 0;
        left: 50%;
        border-left: 3px solid #2c3e50;
        transform-origin: right bottom;
    }

    &:checked {
        &::before {
            text-shadow: -5px -5px 10px rgb(218, 10, 124);
            opacity: 0.95;
            transform: rotateY(90deg) skewY(5deg);
            border-color: transparent;
        }

        &::after {
            text-shadow: -5px -5px 10px rgb(218, 10, 124);
            opacity: 0.95;
            transform: rotateY(90deg) skewY(-5deg);
            border-color: transparent;
        }
    }
}
</style>