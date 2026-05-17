<script setup lang="ts">
import HeroWrapper from './HeroWrapper.vue';
import ProjectCard, { type ProjectCardItem } from './ProjectCard.vue';

const projects: ProjectCardItem[] = [
  {
    id: 1,
    name: '极客兔',
    description:
      '极客兔，用心创作优质内容。',
    githubUrl: 'https://github.com/ZhouYu2156/kuqi',
    logo: undefined,
    techStack: ['JavaScript', 'HTML', 'CSS'],
    featured: false,
    previewUrl: 'https://zhouyu2156.cn:5173/',
  },
  {
    id: 2,
    name: '编程导航',
    description:
      '编程导航',
    githubUrl: 'https://github.com/ZhouYu2156/zhouyu2156.github.io',
    logo: undefined,
    techStack: ['JavaScript', 'HTML', 'CSS'],
    featured: false,
    previewUrl: 'https://zhouyu2156.cn:5173/Programming/',
  },
  {
    id: 3,
    name: '藏书阁',
    description:
      '藏书阁，古籍珍本在线阅览。',
    githubUrl: 'https://github.com/ZhouYu2156/zhouyu2156.github.io',
    logo: undefined,
    techStack: ['JavaScript', 'HTML', 'CSS'],
    featured: false,
    previewUrl: 'example/藏书阁.html',
  }
]
</script>

<template>
  <HeroWrapper class="project-card-list">
    <template #heading>作品展廊</template>
    <template #content>
      <p class="project-card-list__lead">
        过往技术实践或创意作品展示。
      </p>
      <div class="project-card-list__grid">
        <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
      </div>
    </template>
  </HeroWrapper>
</template>

<style scoped lang="css">
@reference '../styles.css';

.project-card-list__lead {
  @apply mx-auto mb-8 max-w-2xl text-center text-pretty text-[0.9375rem] leading-relaxed text-(--vp-c-text-2);
}

.project-card-list> :deep(.content) {
  @apply w-full;
}

.project-card-list__grid {
  @apply grid w-full gap-5;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
}

@media (max-width: 640px) {
  .project-card-list__grid {
    @apply grid-cols-1;
  }
}
</style>
