<script setup lang="ts">
defineProps<{
  /** 备案号查询信息 */
  link: {
    href: string
    target?: '_blank' | '_self' | '_parent' | '_top' | string
    rel?: 'noopener noreferrer' | 'nofollow' | 'noreferrer' | string
    text: string
  }
  /** 备案号查询图片 */
  img: {
    alt: string
    src: string
  }
}>()
</script>

<template>
  <span class="filing">
    <img
      :src="img.src"
      :alt="img.alt" />
    <a
      :href="link.href"
      :target="link.target"
      :rel="link.rel"
      >{{ link.text }}</a
    >
  </span>
</template>

<style scoped lang="css">
@reference '../style.css';

.filing {
  @apply flex items-center gap-2;
  img {
    @apply w-4 h-4;
  }
  a {
    @apply underline;
  }
}
</style>
