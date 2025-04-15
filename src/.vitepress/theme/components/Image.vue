<script setup lang='ts'>

  defineProps({
    src: String
  })
</script>

<template>
  <div class="image-wrapper">
    <img :src="src" />
  </div>
</template>

<style scoped lang="scss">
  .image-wrapper {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;

    >img {
      width: 300px;
      height: 100%;
    }
  }
</style>