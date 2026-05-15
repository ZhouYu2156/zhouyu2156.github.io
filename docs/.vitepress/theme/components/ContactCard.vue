<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import CardWrapper from './CardWrapper.vue';

interface ContactCardProps {
  title: string
  name: string
  intro: string
  account: {
    src: string
    alt: string
  }
  btnText: string
  href?: string
}

const props = defineProps<ContactCardProps>()


/** 看是否有 href 属性，如果有则跳转 */
const goto = () => {
  if (props.href) {
    window.open(props.href, '_blank')
  } else {
    // 提示：需要扫码哦~
    ElMessage.warning('这个需要扫码哦~')
  }
}
</script>

<template>
  <CardWrapper class="contact-info">
    <h3 class="header" v-html="title"></h3>
    <section class="body">
      <img :src="account.src" :alt="account.alt">
      <p class="name">{{ name }}</p>
      <p class="intro">{{ intro }}</p>
      <button class="btn" @click="goto">
        <svg class="scan-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        {{ btnText }}
      </button>
    </section>
  </CardWrapper>
</template>

<style scoped lang='css'>
.contact-info {
  width: 324px;
  display: flex;
  flex-direction: column;


  .header {
    font-size: 1rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    text-align: left;
    border-bottom: 1px solid var(--vp-c-divider);
    padding: 1rem 1.25rem;
  }

  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 1.25rem;

    img {
      width: 200px;
      height: 200px;
      border-radius: 15px;
      margin-bottom: 1.25rem;
    }

    .name {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--vp-c-text-1);
      margin-bottom: 0.75rem;
    }

    .intro {
      font-size: 0.8rem;
      color: var(--vp-c-text-2);
      margin-bottom: 1.25rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      padding: .65rem 1.5rem;
      background: linear-gradient(135deg, #07c160 0%, #00ae4d 100%);
      color: #fff;
      text-decoration: none;
      border-radius: 50px;
      font-size: .95rem;
      font-weight: 500;
      transition: all .3s cubic-bezier(.4, 0, .2, 1);
      box-shadow: 0 4px 12px rgba(7, 193, 96, .3);
      position: relative;
      overflow: hidden;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(7, 193, 96, .4);
      background: linear-gradient(135deg, #00ae4d 0%, #07c160 100%);
    }

    .btn .scan-icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      stroke-width: 2.5;
    }
  }

}

.contact-info .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  padding: .65rem 1.5rem;
  background: linear-gradient(135deg, #07c160 0%, #00ae4d 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-size: .95rem;
  font-weight: 500;
  transition: all .3s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0 4px 12px rgba(7, 193, 96, .3);
  position: relative;
  overflow: hidden
}

.contact-info .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .2), transparent);
  transition: left .5s
}

.contact-info .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(7, 193, 96, .4);
  background: linear-gradient(135deg, #00ae4d 0%, #07c160 100%)
}
</style>