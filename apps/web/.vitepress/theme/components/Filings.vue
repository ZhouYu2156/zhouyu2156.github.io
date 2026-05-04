<script setup lang="ts">
// 湘ICP备2024064075号-1 湘公网安备43112402000148号
const filings = [
  {
    link: {
      href: 'https://beian.miit.gov.cn/',
      text: '湘ICP备2024064075号-1',
    },
    img: {
      src: '/filings/icp.png',
      alt: '湘备案号查询',
    },
  },
  {
    link: {
      href: 'https://beian.miit.gov.cn/',
      text: '湘公网安备43112402000148号',
    },
    img: {
      src: '/filings/police.png',
      alt: '湘公网安备查询',
    },
  },
]
</script>

<template>
  <p class="filings">
    <Filing
      v-for="item in filings"
      :key="item.link.href"
      :link="item.link"
      :img="item.img" />
  </p>
</template>

<style scoped lang="css">
@reference '../style.css';

.filings {
  @apply flex items-center gap-2;
}
</style>
