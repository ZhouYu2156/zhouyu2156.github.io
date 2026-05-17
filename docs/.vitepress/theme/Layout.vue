<script setup lang='ts'>
import { useData } from 'vitepress';
import DefaultTheme, { VPSponsors } from 'vitepress/theme';
import ContactCardList from './components/ContactCardList.vue';
import MusicPlayerBar from './components/MusicPlayerBar.vue';
import ProjectCardList from './components/ProjectCardList.vue';
import Sponsors from './components/Sponsors.vue';
import WorkList from './components/WorkList.vue';
import { useTreasuredMusicPlayer } from './composables/treasuredMusicPlayer';

/** 可以获取每个页面的 frontmatter，向组件注入数据 */
const { frontmatter, isDark } = useData()
const { playerBarExpanded, playbackEngaged } = useTreasuredMusicPlayer()

</script>

<template>
  <DefaultTheme.Layout>
    <template #home-features-after>
      <Sponsors />
      <ProjectCardList />
      <WorkList />
      <ContactCardList />
    </template>
    <template #aside-ads-before>
      <VPSponsors :size="'big'" :mode="'aside'" :tier="'感谢赞赏'" :data="[
        {
          name: '微信',
          img: '/payment/wxpay.jpg',
          url: 'https://www.wechat.com',
        },
        {
          name: '支付宝',
          img: '/payment/alipay.jpg',
          url: 'https://www.alipay.com',
        },
      ]" />
    </template>
    <template #aside-ads-after>
      <VPSponsors :size="'big'" :mode="'aside'" :tier="'感谢赞赏'" :data="[
        {
          name: '赞赏码',
          img: isDark === true ? '/payment/AdmireCode-dark.jpg' : '/payment/AdmireCode-light.jpg',
          url: 'https://www.wechat.com',
        },
      ]" />
    </template>
  </DefaultTheme.Layout>
  <!-- 底部占位：有播放会话后，展开为大面板；收起为迷你底栏 -->
  <div v-if="playbackEngaged" class="shrink-0 transition-[height] duration-300 ease-in-out" :class="playerBarExpanded
    ? 'h-[calc(300px+env(safe-area-inset-bottom))] lg:h-[calc(200px+env(safe-area-inset-bottom))]'
    : 'h-[calc(68px+env(safe-area-inset-bottom))]'
    " aria-hidden="true" :style="[{
      display: frontmatter.meta?.name === 'login' ? 'none' : 'block',
    }]" />
  <MusicPlayerBar />
</template>


<style>
/* 赞赏码图片样式调整 */
.vp-sponsor-grid.big {
  .vp-sponsor-grid-link {
    height: auto;
  }

  .vp-sponsor-grid-image {
    max-width: 100%;
    max-height: 100%;
    filter: none;
  }
}
</style>