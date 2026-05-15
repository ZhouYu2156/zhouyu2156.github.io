<script setup lang="ts">
import { VPSocialLink } from 'vitepress/theme'
import { computed } from 'vue'
import CardWrapper from './CardWrapper.vue'

interface BlogCard {
  bgImage: string
  avatar: string
  name: string
  motto: string
  links: {
    icon: string
    link: string
    ariaLabel: string
  }[]
}

const props = defineProps<BlogCard>()

/** 供 `<style>` 里 `v-bind()` 使用；`JSON.stringify` 保证路径含特殊字符时仍是合法 `url("...")` */
const bgImage = computed(
  () => `url(${JSON.stringify(props.bgImage)})`
)

</script>

<template>
  <CardWrapper class="blog-card">
    <div class="avatar">
      <img :src="props.avatar" alt="avatar" />
    </div>
    <p class="name">
      {{ props.name }}
    </p>
    <p class="links">
      <span v-for="value in props.links" :key="value.icon" class="social-link-wrapper">
        <VPSocialLink :icon="value.icon" :link="value.link" :ariaLabel="value.ariaLabel" :me="true" />
      </span>
    </p>
    <p class="motto">
      {{ props.motto }}
    </p>
  </CardWrapper>
</template>

<style lang="css" scoped>
.blog-card {
  width: 320px;
  height: 324px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: v-bind(bgImage);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;

  .avatar {
    width: 168px;
    height: 168px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
  }

  .name {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .links {
    display: flex;
    gap: 0.4rem;
    margin-block: 0.8rem 0.4rem;

    /* transform: scale(1.2); */
    >.social-link-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      padding: 0.2rem;
      background-color: rgba(255, 255, 255, .15);
      border-radius: 50%;

    }
  }

  .motto {
    font-size: 0.875rem;
    color: #ccc;
  }
}

.social-link-wrapper> :deep(.VPSocialLink) {
  width: 100%;
  height: 100%;
  color: var(--vp-c-indigo-3);
}

.social-link-wrapper> :deep(.VPSocialLink:hover) {
  color: var(--vp-c-indigo-2);
}

.social-link-wrapper> :deep(.VPSocialLink:active) {
  color: var(--vp-c-indigo-1);
}
</style>
