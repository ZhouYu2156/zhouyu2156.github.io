<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    src: string
    alt?: string
  }>(),
  {
    width: '100%',
    height: '100%',
    src: '',
    alt: '赞赏二维码',
  },
)
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height" />
</template>

<style scoped lang="css"></style>
