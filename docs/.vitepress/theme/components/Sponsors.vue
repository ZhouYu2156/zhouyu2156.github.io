<script setup lang='ts'>import VPTeamMembersItem from 'vitepress/dist/client/theme-default/components/VPTeamMembersItem.vue';
import HeroWrapper from './HeroWrapper.vue';


const members = [{
  name: '尤雨溪',
  avatar: 'https://avatars.githubusercontent.com/u/499550?v=4',
  title: '创始人',
  org: 'Vue.js 基金会',
  orgLink: 'https://vuejs.org',
  desc: 'Vue.js 作者',
  sponsor: 'https://vuejs.org',
  actionText: '前往官网',
  links: [
    {
      icon: 'twitter',
      link: 'https://twitter.com/vuejs',
    },
    {
      icon: 'github',
      link: 'https://github.com/vuejs/vue',
    },
  ],
},
{
  name: '惟江上之清风',
  avatar: '/avatars/profile.jpg',
  title: '全栈工程师',
  org: '极客兔',
  orgLink: 'https://www.zhouyu2156.cn',
  desc: '喜欢编程，喜欢写作，喜欢分享',
  sponsor: 'https://www.zhouyu2156.cn',
  actionText: '前往官网',
  links: [
    {
      icon: 'twitter',
      link: 'https://www.zhouyu2156.cn',
    },
    {
      icon: 'github',
      link: 'https://github.com/zhouyu2156',
    },
    {
      icon: 'bilibili',
      link: 'https://space.bilibili.com/431828034',
    }
  ],
},

]
</script>

<template>
  <HeroWrapper class="sponsor-list" v-if="members.length > 0">
    <template #heading>金牌赞助商</template>
    <template #content>
      <VPTeamMembersItem v-for="value in members" :key="value.name" :member="value" class="sponsors-item"
        size="small" />
    </template>
  </HeroWrapper>
</template>

<style scoped lang="css">
.sponsor-list> :deep(.content) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  gap: 2rem;
}
</style>
