<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { TreasuredMusic } from '../composables/treasuredMusicPlayer'
import { playAt, setPlaylist, useTreasuredMusicPlayer } from '../composables/treasuredMusicPlayer'

const items = ref<TreasuredMusic[]>([])
const loadError = ref<string | null>(null)
const loaded = ref(false)

const { currentIndex, isPlaying, togglePlay } = useTreasuredMusicPlayer()

onMounted(async () => {
  try {
    const res = await fetch('/treasured-musics.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as TreasuredMusic[]
    items.value = Array.isArray(data) ? data : []
  } catch {
    loadError.value = '音乐列表加载失败，请稍后重试'
  } finally {
    loaded.value = true
  }
})

watch(items, (list) => {
  if (list.length) setPlaylist(list)
})

function onPlay(index: number, e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (index === currentIndex.value && isPlaying.value) {
    togglePlay()
  } else {
    playAt(index)
  }
}
</script>

<template>
  <section class="jkt-music" aria-labelledby="treasured-music-heading">
    <header class="jkt-music__head">
      <h1 id="treasured-music-heading" class="jkt-music__title">珍藏音乐</h1>
      <p class="jkt-music__subtitle">不知道该听些什么？试试珍藏推荐吧~</p>
    </header>

    <p v-if="loadError" class="jkt-music__error" role="alert">
      {{ loadError }}
    </p>

    <ul v-else-if="loaded" class="jkt-music__grid">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="group jkt-music__card"
        :class="{ 'jkt-music__card--current': index === currentIndex }"
      >
        <div class="jkt-music__cover-wrap">
          <img
            class="jkt-music__cover"
            :src="item.cover"
            :alt="`${item.song_name} 封面`"
            loading="lazy"
            decoding="async"
          />
          <div class="jkt-music__cover-overlay" aria-hidden="true" />
          <button
            type="button"
            class="jkt-music__play-btn"
            :aria-label="
              index === currentIndex && isPlaying ? `暂停 ${item.song_name}` : `播放 ${item.song_name}`
            "
            @click="onPlay(index, $event)"
          >
            <svg
              v-if="index === currentIndex && isPlaying"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="jkt-music__play-icon"
              aria-hidden="true"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="currentColor"
              class="jkt-music__play-icon"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
        <div class="jkt-music__meta">
          <p class="jkt-music__song">{{ item.song_name }}</p>
          <p class="jkt-music__artist">{{ item.author_name }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="css">
@reference '../style.css';

.jkt-music {
  @apply mx-auto w-full max-w-[1160px] px-4 py-8 pb-14 sm:px-5;
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

.jkt-music__error {
  @apply mt-10 text-center text-sm text-(--vp-c-danger-1,#b91c1c) dark:text-(--vp-c-danger-1,#f87171);
}

.jkt-music__grid {
  @apply mt-9 grid list-none grid-cols-1 gap-3.5 p-0 min-[361px]:grid-cols-2 min-[561px]:grid-cols-3 min-[561px]:gap-4 min-[861px]:grid-cols-4 min-[1101px]:grid-cols-5 min-[1101px]:gap-[18px];
}

.jkt-music__card {
  @apply flex translate-y-0 flex-col overflow-hidden rounded-xl border border-(--vp-c-divider) bg-(--vp-c-bg) shadow-[0_1px_3px_rgba(15,23,42,0.06)] transform-gpu backface-hidden dark:shadow-[0_1px_3px_rgba(0,0,0,0.45)];
  transition-property: box-shadow, transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.jkt-music__card--current {
  @apply border-(--vp-c-brand-1)/50 ring-1 ring-(--vp-c-brand-1)/30;
}

.jkt-music__card:hover {
  @apply -translate-y-px border-[color-mix(in_srgb,var(--vp-c-brand-1)_40%,var(--vp-c-divider))] shadow-[0_10px_28px_rgba(15,23,42,0.12)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.55)];
}

.jkt-music__cover-wrap {
  /* 原生兜底：不依赖 Tailwind 是否生成 aspect-*，避免父级无高度时 img 按原图撑满视口 */
  @apply relative w-full overflow-hidden bg-(--vp-c-bg-soft) ring-1 ring-(--vp-c-divider) ring-inset dark:ring-white/5;
  aspect-ratio: 4 / 3;
}
@media (min-width: 640px) {
  .jkt-music__cover-wrap {
    aspect-ratio: 1 / 1;
  }
}

.jkt-music__cover {
  @apply block object-cover transform-gpu;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  transition-property: transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.jkt-music__cover-overlay {
  @apply pointer-events-none absolute inset-0 z-[1] bg-black/50 opacity-0 transition-opacity duration-300 ease-out;
}

.jkt-music__play-btn {
  @apply pointer-events-none absolute left-1/2 top-1/2 z-[2] flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-(--vp-c-brand-1) opacity-0 shadow-lg transition-all duration-300 ease-out scale-90;
}

.jkt-music__card:hover .jkt-music__cover-overlay {
  @apply opacity-100;
}

.jkt-music__card:hover .jkt-music__play-btn {
  @apply pointer-events-auto opacity-100 scale-100;
}

.jkt-music__card:hover .jkt-music__cover {
  transform: scale(1.03);
}

.jkt-music__play-icon {
  @apply ml-0.5 size-7;
}

.jkt-music__meta {
  @apply border-t border-(--vp-c-divider) px-3 pb-3.5 pt-3 text-left;
}

.jkt-music__song {
  @apply mb-1 line-clamp-2 text-[0.9375rem] font-bold leading-snug text-(--vp-c-text-1);
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.jkt-music__card:hover .jkt-music__song {
  @apply text-(--vp-c-brand-1);
}

.jkt-music__artist {
  @apply truncate text-[0.8125rem] leading-snug text-(--vp-c-text-2);
}
</style>
