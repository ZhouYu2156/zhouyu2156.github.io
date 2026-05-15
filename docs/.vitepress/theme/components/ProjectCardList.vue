<script setup lang="ts">
import HeroWrapper from './HeroWrapper.vue';
import ProjectCard, { type ProjectCardItem } from './ProjectCard.vue';

const projects: ProjectCardItem[] = [
  {
    id: 1,
    name: 'CLI 聊天机器人',
    description:
      '基于 Ollama 的 CLI 聊天机器人，支持 Docker 部署。',
    githubUrl: 'https://github.com/ZhouYu2156/chat-assitant',
    logo: undefined,
    techStack: ['Python', 'Ollama', 'Docker'],
    featured: false,
  },
  {
    id: 2,
    name: 'Flask 热重载插件',
    description:
      '开箱即用的 Flask 插件，为你的开发提供更好的体验。',
    githubUrl: 'https://github.com/ZhouYu2156/flask-hot-reload',
    logo: undefined,
    techStack: ['Python', 'Flask', 'JavaScript'],
    featured: false,
  },
  {
    id: 3,
    name: '可视化原型链',
    description:
      '可视化原型链，方便理解原型链的继承关系。',
    githubUrl: 'https://github.com/ZhouYu2156/prototype-chain',
    logo: undefined,
    techStack: ['JavaScript', 'HTML', 'CSS', 'D3.js'],
    featured: false,
    previewUrl: 'https://zhouyu2156.github.io/prototype-chain/',
  }
]
</script>

<template>
  <HeroWrapper class="project-card-list">
    <template #heading>开源项目</template>
    <template #content>
      <p class="project-card-list__lead">
        一些在维护或曾做过的开源项目，欢迎交流与贡献。
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
