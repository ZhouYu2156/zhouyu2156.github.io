<script setup lang="ts">
import { VPButton } from 'vitepress/theme'
import Sponsors from './Sponsors.vue'

export interface Sponsors {
  tier: string
  size?: 'medium' | 'big'
  items: Sponsor[]
}

export interface Sponsor {
  name: string
  img: string
  url: string
}
interface Props {
  message?: string
  actionText?: string
  actionLink?: string
  data: Sponsors[]
}

const sponsors = {
  message: '感谢以下赞助者对极客兔的支持',
  actionText: '成为赞助者',
  actionLink: 'https://www.wechat.com',
  members: [
    {
      name: '惟江上之清风',
      avatar: '/avatars/惟江上之清风.jpg',
      link: 'https://github.com/ZhouYu2156',
      title: '全栈开发攻城狮',
      org: '极客兔软件开发工作室',
      orgLink: 'https://www.zhouyu2156.cn',
      desc: '用技术和认知创造财富和自由',
      links: [
        {
          icon: 'github',
          link: 'https://github.com/ZhouYu2156',
        },
      ],
      sponsor: 'https://www.zhouyu2156.cn',
      actionText: '感谢支持',
    },
  ],
}

const { message, actionText, actionLink, members } = sponsors
</script>

<template>
  <section class="VPHomeSponsors">
    <div class="container">
      <div class="header">
        <div class="love">
          <span class="vpi-heart icon" />
        </div>
        <h2
          v-if="message"
          class="message">
          {{ message }}
        </h2>
      </div>

      <div class="sponsors">
        <Sponsors :members="members" />
      </div>

      <div
        v-if="actionLink"
        class="action">
        <VPButton
          theme="sponsor"
          :text="actionText"
          :href="actionLink" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.VPHomeSponsors {
  /* border-top: 1px solid var(--vp-c-gutter); */
  border-top: none;
  padding-top: 88px !important;
}

.VPHomeSponsors {
  /* margin: 96px 0; */
  margin: 0;
}

@media (min-width: 768px) {
  .VPHomeSponsors {
    /* margin: 128px 0; */
    margin: 0;
  }
}

.VPHomeSponsors {
  padding: 0 24px;
}

@media (min-width: 768px) {
  .VPHomeSponsors {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPHomeSponsors {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.love {
  margin: 0 auto;
  width: fit-content;
  font-size: 28px;
  color: var(--vp-c-text-3);
}

.icon {
  display: inline-block;
}

.message {
  margin: 0 auto;
  padding-top: 10px;
  max-width: 320px;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.sponsors {
  padding-top: 32px;
}

.action {
  padding-top: 40px;
  text-align: center;
}
</style>
