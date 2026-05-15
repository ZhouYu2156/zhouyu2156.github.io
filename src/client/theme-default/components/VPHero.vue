<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { computed, inject } from 'vue'
import { layoutInfoInjectionKey } from '../composables/layout'
import VPButton from './VPButton.vue'
import VPImage from './VPImage.vue'

export interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
  target?: string
  rel?: string
}

defineProps<{
  name?: string
  text?: string
  tagline?: string
  image?: DefaultTheme.ThemeableImage
  actions?: HeroAction[]
}>()

const { heroImageSlotExists } = inject(
  layoutInfoInjectionKey,
  { heroImageSlotExists: computed(() => false) }
)
</script>

<template>
  <div class="VPHero" :class="{ 'has-image': image || heroImageSlotExists }">
    <div class="container">
      <div class="main">
        <slot name="home-hero-info-before" />
        <slot name="home-hero-info">
          <h1 class="heading">
            <span v-if="name" v-html="name" class="name clip"></span>
            <span v-if="text" v-html="text" class="text"></span>
          </h1>
          <p v-if="tagline" v-html="tagline" class="tagline"></p>
        </slot>
        <slot name="home-hero-info-after" />

        <div v-if="actions" class="actions">
          <slot name="home-hero-actions-before-actions" />
          <div v-for="action in actions" :key="action.link" class="action">
            <VPButton tag="a" size="medium" :theme="action.theme" :text="action.text" :href="action.link"
              :target="action.target" :rel="action.rel" />
          </div>
        </div>
        <slot name="home-hero-actions-after" />
      </div>

      <div v-if="image || heroImageSlotExists" class="image">
        <div class="image-container">
          <div class="image-bg" />
          <slot name="home-hero-image">
            <VPImage v-if="image" class="image-src" :image />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPHero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
}

@media (min-width: 640px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }
}

@media (min-width: 960px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
  }
}

.main {
  position: relative;
  z-index: 10;
  order: 2;
  flex-grow: 1;
  flex-shrink: 0;
}

.VPHero.has-image .container {
  text-align: center;
}

@media (min-width: 960px) {
  .VPHero.has-image .container {
    text-align: left;
  }
}

@media (min-width: 960px) {
  .main {
    order: 1;
    width: calc((100% / 3) * 2);
  }

  .VPHero.has-image .main {
    max-width: 592px;
  }
}

.heading {
  display: flex;
  flex-direction: column;
}

.name,
.text {
  width: fit-content;
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;

  &:lang(ja) {
    font-feature-settings: 'palt';
    word-break: auto-phrase;
  }
}

.VPHero.has-image .name,
.VPHero.has-image .text {
  margin: 0 auto;
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

/** 自定义：h1 标题渐变色 */
@property --vp-doc-h1-background {
  syntax: '<color>';
  initial-value: #d0085f;
  inherits: false;
}

@property --vp-doc-h1-background-2 {
  syntax: '<color>';
  initial-value: #d33809;
  inherits: false;
}

@property --vp-doc-h1-background-3 {
  syntax: '<color>';
  initial-value: #05cd69;
  inherits: false;
}

@keyframes vp-doc-h1-linear-gradient-background {
  0% {
    --vp-doc-h1-background: #ce0f45;
  }

  10% {
    --vp-doc-h1-background: #cf1393;
  }

  20% {
    --vp-doc-h1-background: #ae11d1;
  }

  30% {
    --vp-doc-h1-background: #5f17cb;
    --vp-doc-h1-background-2: #cc156d;
    --vp-doc-h1-background-3: #d9a30f;
  }

  40% {
    --vp-doc-h1-background: #5718cc;
  }

  50% {
    --vp-doc-h1-background: #2c1cc5;
  }

  60% {
    --vp-doc-h1-background: #0aa8cb;
    --vp-doc-h1-background-2: #0ccf5a;
    --vp-doc-h1-background-3: #5923bd;
  }

  70% {
    --vp-doc-h1-background: #12c974;
  }

  80% {
    --vp-doc-h1-background: #08b010;
  }

  90% {
    --vp-doc-h1-background: #e59812;
    --vp-doc-h1-background-2: #11b8ce;
    --vp-doc-h1-background-3: #d11372;
  }

  100% {
    --vp-doc-h1-background: #de4212;
  }
}

/** 自定义：h1 标题渐变色 */
.clip {
  background: linear-gradient(to right,
      var(--vp-doc-h1-background),
      var(--vp-doc-h1-background-2),
      var(--vp-doc-h1-background-3));
  animation: vp-doc-h1-linear-gradient-background 20s linear infinite alternate;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* 解决 Chrome 浏览器下文本颜色不透明的问题 */
  -webkit-text-fill-color: transparent;
}

@media (min-width: 640px) {

  .name,
  .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}

@media (min-width: 960px) {

  .name,
  .text {
    line-height: 64px;
    font-size: 56px;
  }

  .VPHero.has-image .name,
  .VPHero.has-image .text {
    margin: 0;
  }
}

.tagline {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

.VPHero.has-image .tagline {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .tagline {
    line-height: 36px;
    font-size: 24px;
  }

  .VPHero.has-image .tagline {
    margin: 0;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
  padding-top: 24px;
}

.VPHero.has-image .actions {
  justify-content: center;
}

@media (min-width: 640px) {
  .actions {
    padding-top: 32px;
  }
}

@media (min-width: 960px) {
  .VPHero.has-image .actions {
    justify-content: flex-start;
  }
}

.action {
  flex-shrink: 0;
  padding: 6px;
}

.image {
  order: 1;
  margin: -76px -24px -48px;
}

@media (min-width: 640px) {
  .image {
    margin: -108px -24px -48px;
  }
}

@media (min-width: 960px) {
  .image {
    flex-grow: 1;
    order: 2;
    margin: 0;
    min-height: 100%;
  }
}

.image-container {
  position: relative;
  margin: 0 auto;
  width: 320px;
  height: 320px;
}

@media (min-width: 640px) {
  .image-container {
    width: 392px;
    height: 392px;
  }
}

@media (min-width: 960px) {
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /*rtl:ignore*/
    transform: translate(-32px, -32px);
  }
}

/** 自定义：首页 Hero 图片背景渐变色 */
.image-bg {
  position: absolute;
  top: 50%;
  /*rtl:ignore*/
  left: 50%;
  border-radius: 50%;
  width: 192px;
  height: 192px;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  /*rtl:ignore*/
  transform: translate(-50%, -50%);
}


@media (min-width: 640px) {
  .image-bg {
    width: 256px;
    height: 256px;
  }
}

@media (min-width: 960px) {
  .image-bg {
    width: 320px;
    height: 320px;
  }
}

:deep(.image-src) {
  position: absolute;
  top: 50%;
  /*rtl:ignore*/
  left: 50%;
  max-width: 192px;
  max-height: 192px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  /*rtl:ignore*/
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  :deep(.image-src) {
    max-width: 256px;
    max-height: 256px;
  }
}

@media (min-width: 960px) {
  :deep(.image-src) {
    max-width: 320px;
    max-height: 320px;
  }
}
</style>
