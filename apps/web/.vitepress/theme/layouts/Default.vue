<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme, { VPSponsors } from 'vitepress/theme'
import { nextTick, provide } from 'vue'
import MusicPlayerBar from '../components/MusicPlayerBar.vue'
import { useTreasuredMusicPlayer } from '../composables/treasuredMusicPlayer'

const { isDark } = useData()
const { playerBarExpanded, playbackEngaged } = useTreasuredMusicPlayer()

const enableTransitions = () =>
  'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      fill: 'forwards',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #aside-ads-before>
      <VPSponsors
        :size="'big'"
        :mode="'aside'"
        :tier="'感谢赞赏'"
        :data="[
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
      <VPSponsors
        :size="'big'"
        :mode="'aside'"
        :tier="'感谢赞赏'"
        :data="[
          {
            name: '赞赏码',
            img: isDark === true ? '/payment/AdmireCode-dark.jpg' : '/payment/AdmireCode-light.jpg',
            url: 'https://www.wechat.com',
          },
        ]" />
    </template>
  </DefaultTheme.Layout>
  <!-- 底部占位：有播放会话后，展开为大面板；收起为迷你底栏 -->
  <div
    v-if="playbackEngaged"
    class="shrink-0 transition-[height] duration-300 ease-in-out"
    :class="
      playerBarExpanded
        ? 'h-[calc(300px+env(safe-area-inset-bottom))] lg:h-[calc(200px+env(safe-area-inset-bottom))]'
        : 'h-[calc(68px+env(safe-area-inset-bottom))]'
    "
    aria-hidden="true" />
  <MusicPlayerBar />
</template>

<style lang="css">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

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

/** 禁用切换外观的按钮动画 */
/*.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}*/
</style>
