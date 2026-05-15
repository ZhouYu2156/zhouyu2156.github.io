<script setup lang="ts">
export interface ProjectCardItem {
  id: string | number
  name: string
  description: string
  githubUrl: string
  logo?: string
  techStack?: string[] // 技术栈
  featured?: boolean // 是否标记为精选
  previewUrl?: string  // 在线预览地址
}

const props = defineProps<{
  project: ProjectCardItem
}>()

const defaultLogo = '/favicons/defaultIcon.svg'

function onImgError(e: Event) {
  const el = e.target as HTMLImageElement
  el.src = defaultLogo
}
</script>

<template>
  <article class="project-card group" :class="{ 'project-card--featured': project.featured }"
    :aria-label="`${project.name} 项目卡片`">
    <div v-if="project.featured" class="project-card__badge" aria-hidden="true">
      精选
    </div>

    <a class="project-card__github" :href="project.githubUrl" target="_blank" rel="noopener noreferrer"
      :aria-label="`${project.name} 的源码仓库`">
      <img class="project-card__github-img" src="https://github.githubassets.com/favicons/favicon.png" alt="" width="18"
        height="18" loading="lazy" decoding="async" />
    </a>

    <div class="project-card__media">
      <img class="project-card__logo" :src="project.logo || defaultLogo" :alt="`${project.name} 图标`" loading="lazy"
        decoding="async" @error="onImgError" />
    </div>

    <div class="project-card__body">
      <h3 class="project-card__title">{{ project.name }}</h3>
      <p class="project-card__desc">{{ project.description }}</p>

      <div v-if="project.techStack?.length" class="project-card__tags">
        <span v-for="tech in project.techStack" :key="tech" class="project-card__tag">
          {{ tech }}
        </span>
      </div>
    </div>

    <footer class="project-card__footer">
      <a class="project-card__cta project-card__cta--primary" :href="project.githubUrl" target="_blank"
        rel="noopener noreferrer">
        查看源码
      </a>
      <a v-if="project.previewUrl" class="project-card__cta project-card__cta--ghost" :href="project.previewUrl"
        target="_blank" rel="noopener noreferrer">
        在线演示
        <svg class="project-card__cta-icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </a>
    </footer>
  </article>
</template>

<style scoped lang="css">
@reference '../styles.css';

.project-card {
  @apply relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl;
  @apply border border-(--vp-c-divider) bg-(--vp-c-bg-soft);
  @apply shadow-sm transition-all duration-300 ease-out;
  @apply hover:-translate-y-0.5 hover:border-(--vp-c-brand-1);
  @apply hover:shadow-[0_12px_40px_-16px_rgba(100_108_255_0.35)];
}

.project-card--featured {
  @apply border-(--vp-c-brand-1)/40 ring-1 ring-(--vp-c-brand-1)/25;
}

.project-card__badge {
  @apply absolute left-3 top-3 z-2 rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide;
  @apply bg-(--vp-c-brand-soft) text-(--vp-c-brand-1);
}

.project-card__github {
  @apply absolute right-3 top-3 z-2 inline-flex items-center justify-center rounded-full no-underline;
  @apply border border-(--vp-c-divider) bg-(--vp-c-bg-elv) p-1.5 shadow-sm backdrop-blur-sm;
  @apply text-(--vp-c-text-2) transition duration-200;
  @apply hover:scale-105 hover:border-(--vp-c-border) hover:bg-(--vp-c-bg-soft);
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--vp-c-brand-1) focus-visible:ring-offset-2;
  @apply focus-visible:ring-offset-(--vp-c-bg);
}

.project-card__github-img {
  @apply block h-[18px] w-[18px] object-contain opacity-90;
}

.project-card__github:hover .project-card__github-img {
  @apply opacity-100;
}

.project-card__media {
  @apply flex aspect-5/3 relative items-center justify-center p-7 sm:p-8;
  @apply bg-linear-to-br from-(--vp-c-bg-alt) to-(--vp-c-bg-soft);
  @apply transition-[background] duration-300;
}

.group:hover .project-card__media {
  @apply from-(--vp-c-brand-soft) to-(--vp-c-bg-alt);
}

.project-card__logo {
  @apply h-14 w-14 max-h-[44%] max-w-[44%] object-contain sm:h-16 sm:w-16;
  @apply drop-shadow-sm transition-transform duration-300 ease-out;
}

.group:hover .project-card__logo {
  @apply scale-[1.06];
}

.project-card__body {
  @apply flex min-h-0 flex-1 flex-col gap-2 border-t border-(--vp-c-divider) px-4 py-3.5;
}

.project-card__title {
  @apply text-[0.9375rem] font-semibold leading-snug tracking-tight text-(--vp-c-text-1);
  @apply transition-colors duration-200;
}

.group:hover .project-card__title {
  @apply text-(--vp-c-brand-1);
}

.project-card__desc {
  @apply line-clamp-3 text-[0.8125rem] leading-relaxed text-(--vp-c-text-2);
  @apply transition-colors duration-200;
}

.group:hover .project-card__desc {
  @apply text-(--vp-c-text-1);
}

.project-card__tags {
  @apply mt-1 flex flex-wrap gap-1.5;
}

.project-card__tag {
  @apply rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg-alt) px-2 py-0.5 text-[0.6875rem] font-medium text-(--vp-c-text-2);
}

.project-card__footer {
  @apply mt-auto flex flex-wrap gap-2 border-t border-(--vp-c-divider) px-4 py-3;
}

.project-card__cta {
  @apply inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 text-[0.8125rem] font-medium no-underline transition-colors duration-200;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--vp-c-brand-1) focus-visible:ring-offset-2;
  @apply focus-visible:ring-offset-(--vp-c-bg-soft);
}

.project-card__cta--primary {
  @apply bg-(--vp-button-brand-bg) text-(--vp-button-brand-text);
}

.project-card__cta--primary:hover {
  @apply bg-(--vp-button-brand-hover-bg) text-(--vp-button-brand-hover-text);
}

.project-card__cta--ghost {
  @apply flex-1 border border-(--vp-c-divider) bg-transparent text-(--vp-c-brand-1);
}

.project-card__cta--ghost:hover {
  @apply border-(--vp-c-brand-1) bg-(--vp-c-brand-soft);
}

.project-card__cta-icon {
  @apply h-3.5 w-3.5 shrink-0 opacity-80;
}

.project-card__cta--ghost:hover .project-card__cta-icon {
  @apply opacity-100;
}

@media (prefers-reduced-motion: reduce) {

  .project-card,
  .project-card__logo,
  .project-card__media,
  .project-card__github {
    @apply transition-none;
  }

  .project-card:hover {
    @apply translate-y-0;
  }

  .group:hover .project-card__logo {
    @apply scale-100;
  }

  .project-card__github:hover {
    @apply scale-100;
  }
}
</style>
