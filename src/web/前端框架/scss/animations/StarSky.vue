<template>
  <div class="starsky-container">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="title">Sass 绘制的星空</div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:math';
@use 'sass:list';
@use 'sass:string';

/* 获取随机颜色 */
@function randomColor() {
  $r: math.random(255);
  $g: math.random(255);
  $b: math.random(255);
  @return rgb($r, $g, $b);
}

/* 盒子阴影设置 */
@function getShadows(
  $n: 500,
  $bound-sizes: (
    400px,
    300px,
  )
) {
  $bound-width: list.nth(
    $list: $bound-sizes,
    $n: 1,
  );
  $bound-height: list.nth(
    $list: $bound-sizes,
    $n: 2,
  );
  $shadows: '#{math.random($bound-width)}px #{math.random($bound-height)}px #{randomColor()}';

  @for $i from 2 through $n {
    $shadows: '#{$shadows},#{math.random($bound-width)}px #{math.random($bound-height)}px #{randomColor()}';
  }

  @return string.unquote($shadows);
}

.starsky-container {
  /** 边界宽高 */
  $sizes: (700, 300) !default;
  /*动画时长*/
  $duration: 100s;
  /* 亮点数量 */
  $count: 1500;

  position: relative;
  // Dart 3.0.0 不再支持
  width: #{list.nth($list: $sizes, $n: 1)}px;
  height: #{list.nth($list: $sizes, $n: 2)}px;
  overflow: hidden;

  /* 标题*/
  .title {
    // 当鼠标移动到元素上时 显示指针的形状
    touch-action: none;
    user-select: none;
    cursor: default;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    color: #fff;
    text-align: center;
    font-family: 'Arial', 'sans-serif';
    font-size: 26px;
    letter-spacing: 10px;
    margin-top: -60px;
    padding-left: 10px;
    line-height: #{calc(list.nth($sizes, 2) / 2)}px;
    background: linear-gradient(to top, white, #38495a);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  @for $i from 1 through 3 {
    $duration: math.floor(math.div($duration, 2));
    $count: math.floor(math.div($count, 2));

    .layer#{$i} {
      $size: #{$i}px;
      // position: fixed;
      position: relative;
      width: $size;
      height: $size;
      border-radius: 50%;
      background: #f40;
      left: 0;
      top: 0;
      box-shadow: getShadows($count, $sizes);
      animation: moveUp $duration linear infinite;

      &::after {
        content: '';
        position: fixed;
        left: 0;
        top: 300px;
        width: $size;
        height: $size;
        border-radius: inherit;
        box-shadow: inherit;
      }
    }
  }

  @keyframes moveUp {
    100% {
      transform: translateY(-#{list.nth($list: $sizes, $n: 2)}px);
    }
  }
}
</style>
