<script setup lang="ts"></script>

<template>
  <div class="dice-box">
    <div class="dice">
      <div class="face">1</div>
      <div class="face">2</div>
      <div class="face">3</div>
      <div class="face">4</div>
      <div class="face">5</div>
      <div class="face">6</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:math';
@use 'sass:list';
@use 'sass:map';

.dice-box {
  width: 200px;
  height: 200px;
  margin: 80px auto;
}

@mixin d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

$colors: (
  1: #3498db,
  2: #e74c3c,
  3: #f1c40f,
  4: #9b59b6,
  5: #34495e,
  6: #e67e22,
);

$size: (200px, 200px);

$font-size: 60px;

// 生成随机角度
@function randomAngle() {
  @return math.random($limit: 360) + deg;
}

// 骰子随机旋转
@keyframes randomRotate {
  25% {
    transform: rotateX(randomAngle()) rotateY(randomAngle()) rotateZ(randomAngle());
  }

  50% {
    transform: rotateX(randomAngle()) rotateY(randomAngle()) rotateZ(randomAngle());
  }

  75% {
    transform: rotateX(randomAngle()) rotateY(randomAngle()) rotateZ(randomAngle());
  }
}

.dice {
  @include d-flex;
  position: relative;
  width: list.nth($size, 1);
  height: list.nth($size, 2);
  transform-style: preserve-3d;
  transform: perspective(900px) rotateX(-30deg);
  animation: randomRotate 1s forwards infinite;

  @for $i from 1 through 6 {
    .face:nth-child(#{$i}) {
      position: absolute;
      width: inherit;
      height: inherit;
      background: map.get($colors, $i);
      line-height: list.nth($list: $size, $n: 1);
      font-size: $font-size;
      color: #fff;
      text-align: center;
    }
  }

  // 对每个面进行旋转定位成骰子立方体的每个面
  // 将每个面旋转到立方体的每个面
  // 利用for循环快速生成每个面
  @for $i from 1 through 6 {
    .face:nth-child(#{$i}) {
      @if $i ==1 {
        transform: rotateX(90deg) translateZ(calc(list.nth($size, 1) / 2));
      }

      @if $i ==2 {
        transform: rotateY(90deg) translateZ(calc(list.nth($size, 1) / 2));
      }

      @if $i ==3 {
        transform: rotateY(-90deg) translateZ(calc(list.nth($size, 1) / 2));
      }

      @if $i ==4 {
        transform: rotateX(-90deg) translateZ(calc(list.nth($size, 1) / 2));
      }

      @if $i ==5 {
        transform: rotateY(180deg) translateZ(calc(list.nth($size, 1) / 2));
      }

      @if $i ==6 {
        transform: rotateX(0deg) translateZ(calc(list.nth($size, 1) / 2));
      }
    }
  }
}
</style>
