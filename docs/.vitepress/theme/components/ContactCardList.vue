<script setup lang='ts'>
import ContactCard from './ContactCard.vue';
import HeroWrapper from './HeroWrapper.vue';

interface ContactCardProps {
  title: string
  name: string
  intro: string
  account: { src: string; alt: string }
  btnText: string
  href?: string
}

const contactCards: ContactCardProps[] = [
  {
    title: '📺 哔哩哔哩',
    name: '昔月归鸿',
    intro: '这个人很懒，只留下了知识',
    account: { src: '/contact/bilibili.png', alt: '昔月归鸿' },
    btnText: '欢迎来到我的频道',
    href: 'https://space.bilibili.com/431828034'
  },
  {
    title: '💻 微信公众号',
    name: '昔月归鸿',
    intro: '用心创作优质内容',
    account: { src: '/contact/微信公众号.png', alt: '极客兔' },
    btnText: '关注公众号',
  },
  {
    title: '💬 个人微信',
    name: '本人',
    intro: '个人微信，欢迎交流',
    account: { src: '/contact/个人微信.jpg', alt: '个人微信' },
    btnText: '添加好友',
  }
]
</script>

<template>
  <HeroWrapper class="contact-cards">
    <template #heading>欢迎关注我的频道，获取更多资讯</template>
    <template #content>
      <ContactCard v-for="card in contactCards" :key="card.title" :title="card.title" :name="card.name"
        :intro="card.intro" :account="card.account" :btnText="card.btnText" :href="card.href" />
    </template>
  </HeroWrapper>
</template>

<style scoped lang='css'>
.contact-cards> :deep(.content) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  gap: 2rem;
  /** 元素居中 */
  justify-items: center;
}

@media (max-width: 768px) {
  .contact-cards> :deep(.content) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}
</style>