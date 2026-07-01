<script setup lang="ts">
import { ref } from 'vue'

interface ToolItem {
  link: {
    title: string
    href: string
    description: string
    target?: '_blank' | '_self' | '_parent' | '_top' | string
    rel?: 'noopener noreferrer' | 'nofollow' | 'noreferrer' | string
  }
  img: {
    src: string
    alt: string
  }
  github?: {
    icon: string
    link: string
  }
}

const tools = ref<ToolItem[]>([
{
    link: {
      title: '觅知网',
      href: 'https://www.51miz.com/',
      target: '_blank',
      description: '海量图片和设计素材。',
    },
    img: {
      src: 'https://www.51miz.com/favicon.ico',
      alt: '觅知网',
    }
},
{
    link: {
      title: '草料二维码',
      href: 'https://cli.im/',
      target: '_blank',
      description: '将各种内容一键转换成二维码。',
    },
    img: {
      src: 'https://static.clewm.net/static/images/favicon.ico',
      alt: '草料二维码',
    }
},
{
    link: {
      title: '微信读书',
      href: 'https://weread.qq.com/',
      target: '_blank',
      description: '微信读书App在线网站。',
    },
    img: {
      src: 'https://rescdn.qqmail.com/node/wr/wrpage/style/images/independent/favicon/favicon_32h.png',
      alt: '微信读书',
    }
},
{
    link: {
      title: '播客',
      href: 'https://podcasts.apple.com/',
      target: '_blank',
      description: '苹果官方播客。',
    },
    img: {
      src: 'https://podcasts.apple.com/assets/app-icons/podcasts-icon_512.png',
      alt: '播客',
    }
},
  {
    link: {
      title: 'Excalidraw',
      href: 'https://plus.excalidraw.com/',
      target: '_blank',
      description: '一款开源的虚拟手绘风格白板。',
    },
    img: {
      src: 'https://plus.excalidraw.com/images/logo-small.svg',
      alt: 'Excalidraw',
    },
    github: {
      icon: 'https://github.githubassets.com/favicons/favicon.png',
      link: 'https://github.com/excalidraw/excalidraw',
    },
  },
  {
    link: {
      title: 'Dify',
      href: 'https://docs.dify.ai/zh/use-dify/getting-started/introduction',
      target: '_blank',
      description: '一款开源的AI开发平台。',
    },
    img: {
      src: 'https://assets-docs.dify.ai/2025/05/d05cfc6ebe48f725d171dc71c64a5d16.svg',
      alt: 'Dify',
    }
  },
  {
    link: {
      title: '墨刀',
      href: 'https://modao.cc/',
      target: '_blank',
      description: '一款让想法马上实现的原型设计平台。',
    },
    img: {
      src: 'https://images.modao.cc/images/favicon.ico',
      alt: '墨刀',
    }
  },
  {
    link: {
      title: 'Unsplash',
      href: 'https://unsplash.com/',
      target: '_blank',
      description: '一个免费的高质量图片网站。',
    },
    img: {
      src: 'https://unsplash.com/favicon.ico',
      alt: 'Unsplash',
    }
  },
])

function linkRel(item: ToolItem) {
  return item.link.rel ?? (item.link.target === '_blank' ? 'noopener noreferrer' : undefined)
}
</script>

<template>
  <section class="utility-tools" aria-label="实用网站导航">
    <header class="jkt-music__head">
      <h1 id="treasured-music-heading" class="jkt-music__title">
        实用工具导航
      </h1>
      <p class="jkt-music__subtitle">试试有哪些方便解决你日常问题的网站吧~</p>
    </header>
    <div class="utility-tools__grid">
      <article v-for="(item, i) in tools" :key="`${item.link.href}-${i}`" class="utility-tools__card group">
        <a class="utility-tools__primary" :href="item.link.href" :target="item.link.target" :rel="linkRel(item)">
          <div class="utility-tools__media">
            <img class="utility-tools__img" :src="item.img.src" :alt="item.img.alt" loading="lazy" decoding="async" />
          </div>
          <div class="utility-tools__body">
            <div class="utility-tools__headline">
              <h3 class="utility-tools__title">{{ item.link.title }}</h3>
              <span v-if="item.link.target === '_blank'" class="utility-tools__external" aria-hidden="true">
                <svg class="utility-tools__external-icon" viewBox="0 0 12 12" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <p class="utility-tools__desc">{{ item.link.description }}</p>
          </div>
        </a>

        <a v-if="item.github" class="utility-tools__github" :href="item.github.link" target="_blank"
          rel="noopener noreferrer" :aria-label="`${item.link.title} 的 GitHub 仓库`">
          <img class="utility-tools__github-img" :src="item.github.icon" alt="" width="18" height="18" loading="lazy"
            decoding="async" />
        </a>
      </article>
    </div>
  </section>
</template>

<style scoped lang="css">
@reference '../styles.css';

.utility-tools {
  @apply w-full max-w-6xl mx-auto px-1 pb-8;
}

.jkt-music__head {
  @apply mb-2 text-center;
}

.jkt-music__title {
  @apply mb-2.5 text-2xl font-extrabold tracking-wide text-(--vp-c-text-1) sm:text-[1.75rem];
}

.jkt-music__subtitle {
  @apply text-pretty text-[0.9375rem] leading-relaxed text-(--vp-c-text-2);
}

.utility-tools__grid {
  @apply grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3;
}

.utility-tools__card {
  @apply relative overflow-hidden rounded-xl;
  @apply border border-(--vp-c-divider) bg-(--vp-c-bg-soft);
  @apply shadow-sm transition-all duration-300 ease-out;
  @apply hover:-translate-y-0.5 hover:border-(--vp-c-brand-1);
  @apply hover:shadow-[0_12px_40px_-16px_rgba(100_108_255_0.35)];
}

.utility-tools__primary {
  @apply flex h-full min-h-0 flex-col no-underline outline-none;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--vp-c-brand-1);
}

.utility-tools__media {
  @apply flex aspect-5/3 items-center justify-center p-7 sm:p-9;
  @apply bg-linear-to-br from-(--vp-c-bg-alt) to-(--vp-c-bg-soft);
  @apply transition-[background] duration-300;
}

.utility-tools__card:hover .utility-tools__media {
  @apply from-(--vp-c-brand-soft) to-(--vp-c-bg-alt);
}

.utility-tools__img {
  @apply h-14 w-14 max-h-[44%] max-w-[44%] object-contain sm:h-16 sm:w-16;
  @apply drop-shadow-sm transition-transform duration-300 ease-out;
}

.utility-tools__card:hover .utility-tools__img {
  @apply scale-[1.06];
}

.utility-tools__body {
  @apply flex min-h-0 flex-1 flex-col gap-2 border-t border-(--vp-c-divider) px-4 py-3.5;
}

.utility-tools__headline {
  @apply flex items-start justify-between gap-2;
}

.utility-tools__title {
  @apply min-w-0 flex-1 text-[0.9375rem] font-semibold leading-snug tracking-tight text-(--vp-c-text-1);
  @apply transition-colors duration-200 group-hover:text-(--vp-c-brand-1);
}

.utility-tools__desc {
  @apply line-clamp-3 text-[0.8125rem] leading-relaxed text-(--vp-c-text-2);
  @apply transition-colors duration-200 group-hover:text-(--vp-c-text-1);
}

.utility-tools__external {
  @apply mt-0.5 inline-flex shrink-0 items-center justify-center rounded-md p-0.5;
  @apply text-(--vp-c-text-3) opacity-60 transition duration-200;
  @apply group-hover:text-(--vp-c-brand-1) group-hover:opacity-100;
}

.utility-tools__external-icon {
  @apply h-3.5 w-3.5;
}

.utility-tools__github {
  @apply absolute right-3 top-3 z-2 inline-flex items-center justify-center rounded-full no-underline;
  @apply border border-(--vp-c-divider) bg-(--vp-c-bg-elv) p-1.5 shadow-sm backdrop-blur-sm;
  @apply text-(--vp-c-text-2) transition duration-200;
  @apply hover:scale-105 hover:border-(--vp-c-border) hover:bg-(--vp-c-bg-soft);
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--vp-c-brand-1) focus-visible:ring-offset-2;
  @apply focus-visible:ring-offset-(--vp-c-bg);
}

.utility-tools__github-img {
  @apply block h-[18px] w-[18px] object-contain opacity-90;
}

.utility-tools__github:hover .utility-tools__github-img {
  @apply opacity-100;
}

@media (prefers-reduced-motion: reduce) {

  .utility-tools__card,
  .utility-tools__img,
  .utility-tools__media,
  .utility-tools__github {
    @apply transition-none;
  }

  .utility-tools__card:hover {
    @apply translate-y-0;
  }

  .utility-tools__card:hover .utility-tools__img {
    @apply scale-100;
  }

  .utility-tools__github:hover {
    @apply scale-100;
  }
}
</style>
