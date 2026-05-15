<script setup lang="ts">
import { useTreasuredMusicPlayer } from '../composables/treasuredMusicPlayer'

const {
  playlist,
  currentIndex,
  currentTrack,
  hasPlaylist,
  playMode,
  playModeLabels,
  volume,
  muted,
  isPlaying,
  currentTime,
  duration,
  progress,
  playlistPanelOpen,
  playerBarExpanded,
  playbackEngaged,
  togglePlay,
  nextTrack,
  prevTrack,
  cyclePlayMode,
  seekByRatio,
  toggleMuted,
  togglePlaylistPanel,
  togglePlayerBarExpanded,
  playAt,
} = useTreasuredMusicPlayer()

function fmtTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function onProgressBarClick(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  seekByRatio((e.clientX - r.left) / r.width)
}

function onVolumeInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  volume.value = v
  if (v > 0 && muted.value) muted.value = false
}
</script>

<template>
  <div
    v-if="playbackEngaged"
    class="pointer-events-none fixed inset-x-0 bottom-0 z-300 flex flex-col items-stretch"
    aria-label="音乐播放器">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      leave-active-class="transition duration-300 ease-in"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0">
      <div
        v-show="playerBarExpanded"
        class="pointer-events-none flex flex-col items-stretch">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          leave-active-class="transition duration-200 ease-in"
          enter-from-class="translate-y-full opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-full opacity-0">
          <div
            v-if="playlistPanelOpen && hasPlaylist"
            class="pointer-events-auto mx-auto mb-0 max-h-[min(50vh,420px)] w-full max-w-[1160px] overflow-hidden rounded-t-xl border border-b-0 border-(--vp-c-divider) bg-(--vp-c-bg) shadow-[0_-8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.45)]">
            <div class="border-b border-(--vp-c-divider) px-4 py-2 text-sm font-semibold text-(--vp-c-text-1)">
              播放列表 · {{ playlist.length }} 首
            </div>
            <ul class="max-h-[min(40vh,360px)] overflow-y-auto overscroll-contain p-2">
              <li
                v-for="(t, i) in playlist"
                :key="t.id"
                class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors"
                :class="
                  i === currentIndex
                    ? 'bg-(--vp-c-brand-soft) text-(--vp-c-brand-1)'
                    : 'text-(--vp-c-text-1) hover:bg-(--vp-c-bg-soft)'
                "
                @click="playAt(i)">
                <span class="w-6 shrink-0 text-center text-xs opacity-70">{{ i + 1 }}</span>
                <img
                  :src="t.cover"
                  alt=""
                  class="size-10 shrink-0 rounded object-cover"
                  loading="lazy" />
                <div class="min-w-0 flex-1">
                  <div class="truncate text-sm font-medium">{{ t.song_name }}</div>
                  <div class="truncate text-xs text-(--vp-c-text-2)">{{ t.author_name }}</div>
                </div>
              </li>
            </ul>
          </div>
        </Transition>

        <div
          class="pointer-events-auto mx-auto w-full max-w-[1160px] rounded-t-2xl border border-b-0 border-(--vp-c-divider) bg-(--vp-c-bg)/98 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_rgba(0,0,0,0.08)] backdrop-blur-md dark:bg-(--vp-c-bg)/95 dark:shadow-[0_-12px_48px_rgba(0,0,0,0.45)]">
          <!-- 顶栏：标题区 + 收起（与播放键分离） -->
          <div class="flex items-center justify-between gap-3 border-b border-(--vp-c-divider) px-3 py-2 sm:px-4">
            <span class="text-xs font-medium tracking-wide text-(--vp-c-text-3)">正在播放</span>
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-lg border border-(--vp-c-divider) bg-(--vp-c-bg-soft) px-2.5 py-1.5 text-xs font-medium text-(--vp-c-text-2) transition-colors hover:border-(--vp-c-brand-1) hover:text-(--vp-c-brand-1)"
              aria-label="收起播放器"
              @click="togglePlayerBarExpanded">
              <span class="hidden sm:inline">收起</span>
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
              </svg>
            </button>
          </div>

          <!-- 进度：双时间 + 粗轨道 -->
          <div class="px-3 pt-3 sm:px-4">
            <div
              class="mb-1.5 flex items-center justify-between tabular-nums text-[11px] text-(--vp-c-text-3) sm:text-xs">
              <span>{{ fmtTime(currentTime) }}</span>
              <span>{{ fmtTime(duration) }}</span>
            </div>
            <div
              class="jkt-progress jkt-progress--rail relative h-2.5 w-full cursor-pointer overflow-hidden rounded-full touch-none"
              role="slider"
              :aria-valuenow="Math.round(progress * 100)"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="播放进度"
              @click="onProgressBarClick">
              <div
                class="absolute inset-y-0 left-0 rounded-full bg-(--vp-c-brand-1) transition-[width] duration-150 ease-out"
                :style="{ width: `${progress * 100}%` }" />
            </div>
          </div>

          <!-- 主体：大屏三栏 grid，避免中间留白、音量换行丢失 -->
          <div
            class="grid grid-cols-1 gap-4 px-3 pb-4 pt-4 sm:px-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(180px,260px)] lg:items-center lg:gap-6">
            <!-- 左：封面 + 文案（小屏整块居中，大屏左对齐） -->
            <div
              class="flex min-w-0 items-center gap-3 max-lg:mx-auto max-lg:w-full max-lg:justify-center max-lg:text-center lg:min-w-[200px] lg:justify-start lg:text-left">
              <div
                class="relative size-14 shrink-0 overflow-hidden rounded-xl bg-(--vp-c-bg-soft) shadow-sm ring-1 ring-black/5 dark:ring-white/10 sm:size-16">
                <img
                  v-if="currentTrack"
                  :src="currentTrack.cover"
                  :alt="currentTrack.song_name"
                  class="size-full object-cover" />
                <div
                  v-else
                  class="flex size-full items-center justify-center text-xs text-(--vp-c-text-3)">
                  —
                </div>
              </div>
              <div class="min-w-0 flex-1 max-lg:max-w-[min(100%,20rem)]">
                <div class="truncate text-sm font-semibold leading-snug text-(--vp-c-text-1) sm:text-base">
                  {{ currentTrack?.song_name ?? '未播放' }}
                </div>
                <div class="mt-0.5 truncate text-xs text-(--vp-c-text-2) sm:text-sm">
                  {{ currentTrack?.author_name ?? '—' }}
                </div>
                <div class="mt-1 hidden truncate text-[10px] text-(--vp-c-text-3) sm:text-[11px] lg:block">
                  {{ playModeLabels[playMode] }}
                </div>
              </div>
            </div>

            <!-- 中：主控（播放按钮加大） -->
            <div class="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1 sm:gap-x-1 lg:flex-nowrap">
              <button
                type="button"
                class="rounded-xl p-2 text-(--vp-c-text-2) transition-colors hover:bg-(--vp-c-bg-soft) hover:text-(--vp-c-text-1) disabled:opacity-40"
                :disabled="!hasPlaylist"
                :title="playModeLabels[playMode]"
                aria-label="切换播放模式"
                @click="cyclePlayMode">
                <svg
                  v-if="playMode === 'sequence'"
                  class="size-5 shrink-0 sm:size-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm12 0l4 4V8l-4 4z" />
                </svg>
                <svg
                  v-else-if="playMode === 'list'"
                  class="size-5 shrink-0 sm:size-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm8 12H7v-3l-4 4 4 4v-3h12v-6h-2v4" />
                </svg>
                <svg
                  v-else-if="playMode === 'single'"
                  class="size-5 shrink-0 sm:size-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                </svg>
                <svg
                  v-else
                  class="size-5 shrink-0 sm:size-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                </svg>
              </button>

              <button
                type="button"
                class="rounded-xl p-2 text-(--vp-c-text-1) transition-colors hover:bg-(--vp-c-bg-soft) disabled:opacity-40"
                :disabled="!hasPlaylist"
                aria-label="上一首"
                @click="prevTrack">
                <svg
                  class="size-6 sm:size-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              <button
                type="button"
                class="mx-1 rounded-full bg-(--vp-c-brand-1) p-3 text-white shadow-lg ring-2 ring-(--vp-c-brand-soft) transition-transform hover:scale-105 active:scale-95 disabled:opacity-40"
                :disabled="!hasPlaylist"
                :aria-label="isPlaying ? '暂停' : '播放'"
                @click="togglePlay">
                <svg
                  v-if="isPlaying"
                  class="size-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                <svg
                  v-else
                  class="size-8 translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <button
                type="button"
                class="rounded-xl p-2 text-(--vp-c-text-1) transition-colors hover:bg-(--vp-c-bg-soft) disabled:opacity-40"
                :disabled="!hasPlaylist"
                aria-label="下一首"
                @click="nextTrack">
                <svg
                  class="size-6 sm:size-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>

              <button
                type="button"
                class="rounded-xl p-2 text-(--vp-c-text-2) transition-colors hover:bg-(--vp-c-bg-soft) hover:text-(--vp-c-text-1) disabled:opacity-40"
                :disabled="!hasPlaylist"
                aria-label="播放列表"
                @click="togglePlaylistPanel">
                <svg
                  class="size-5 sm:size-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                </svg>
              </button>
            </div>

            <!-- 右：音量（固定列宽，始终可见） -->
            <div
              class="jkt-vol-rail flex min-h-[40px] w-full min-w-0 items-center gap-2 rounded-xl px-2 py-2 lg:w-full lg:max-w-none lg:justify-end">
              <button
                type="button"
                class="shrink-0 rounded-lg p-1.5 text-(--vp-c-text-2) transition-colors hover:bg-(--vp-c-bg-soft) hover:text-(--vp-c-text-1)"
                aria-label="静音"
                @click="toggleMuted">
                <svg
                  v-if="muted || volume === 0"
                  class="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81l2.04 2.04 1.27-1.27L4.27 3zM12 4.09L9.91 6.17 12 8.26V4.09z" />
                </svg>
                <svg
                  v-else
                  class="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </button>
              <input
                :value="muted ? 0 : volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                class="jkt-vol h-2 min-w-0 flex-1 cursor-pointer accent-(--vp-c-brand-1) lg:max-w-[200px]"
                aria-label="音量"
                @input="onVolumeInput" />
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 收起：迷你底栏（全宽可发现；左侧信息区与「展开」均可打开完整面板） -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      leave-active-class="transition duration-200 ease-in"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0">
      <div
        v-show="!playerBarExpanded"
        class="pointer-events-auto fixed bottom-0 left-0 right-0 z-310 border-t border-(--vp-c-divider) bg-(--vp-c-bg)/98 shadow-[0_-8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md sm:left-1/2 sm:right-auto sm:w-[min(100%,1160px)] sm:-translate-x-1/2 sm:rounded-t-2xl sm:border-x dark:bg-(--vp-c-bg)/95 dark:shadow-[0_-8px_36px_rgba(0,0,0,0.5)]">
        <div
          class="jkt-progress jkt-progress--rail relative h-2 w-full cursor-pointer overflow-hidden rounded-t-none touch-none sm:rounded-t-2xl"
          role="slider"
          :aria-valuenow="Math.round(progress * 100)"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="播放进度"
          @click="onProgressBarClick">
          <div
            class="absolute inset-y-0 left-0 bg-(--vp-c-brand-1) transition-[width] duration-150 ease-out"
            :style="{ width: `${progress * 100}%` }" />
        </div>
        <div
          class="jkt-mini-controls mx-auto flex max-w-[1160px] flex-row items-center gap-2 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:max-h-[64px] sm:gap-2 sm:px-3">
          <button
            type="button"
            class="flex min-h-[44px] min-w-0 flex-1 items-center gap-2.5 rounded-lg text-left transition-colors hover:bg-(--vp-c-bg-soft)/80 sm:min-h-0 sm:gap-2 sm:py-0"
            aria-label="展开音乐播放器"
            @click="togglePlayerBarExpanded">
            <div
              class="relative size-9 shrink-0 overflow-hidden rounded-md bg-(--vp-c-bg-soft) ring-1 ring-(--vp-c-divider)/70 sm:size-10">
              <img
                v-if="currentTrack"
                :src="currentTrack.cover"
                :alt="currentTrack.song_name"
                class="size-full object-cover" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="truncate text-sm font-semibold text-(--vp-c-text-1)">
                {{ currentTrack?.song_name ?? '音乐' }}
              </div>
              <div class="truncate text-xs text-(--vp-c-text-2)">
                {{ currentTrack?.author_name ?? '' }}
              </div>
            </div>
          </button>

          <div
            class="flex shrink-0 items-center gap-2 rounded-xl bg-(--vp-c-bg-soft) px-2 py-1.5 ring-1 ring-(--vp-c-divider) dark:bg-black/25 dark:ring-white/15">
            <button
              type="button"
              class="jkt-mini-play flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--vp-c-brand-1) text-white shadow-md ring-2 ring-white/25 transition-[filter,opacity] hover:brightness-110 active:brightness-95 disabled:opacity-40 dark:ring-white/10 sm:size-11"
              :disabled="!hasPlaylist"
              :aria-label="isPlaying ? '暂停' : '播放'"
              @click.stop="togglePlay">
              <svg
                v-if="isPlaying"
                class="size-5 sm:size-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <svg
                v-else
                class="size-5 translate-x-0.5 sm:size-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <button
              type="button"
              class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--vp-c-bg)/90 text-(--vp-c-text-2) shadow-sm transition-colors hover:bg-(--vp-c-bg) hover:text-(--vp-c-text-1) dark:bg-white/10 dark:hover:bg-white/15"
              title="展开完整播放器"
              aria-label="展开完整播放器"
              @click="togglePlayerBarExpanded">
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true">
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* 播放进度、迷你条：轨道与面板背景区分 */
.jkt-progress--rail {
  background: color-mix(in srgb, var(--vp-c-text-3) 16%, var(--vp-c-bg-soft));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-2) 12%, transparent);
}
.dark .jkt-progress--rail {
  background: color-mix(in srgb, var(--vp-c-text-1) 14%, var(--vp-c-bg-alt));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, white 10%, transparent);
}

/* 音量行浅底，与整栏再分一层 */
.jkt-vol-rail {
  background: color-mix(in srgb, var(--vp-c-text-3) 8%, var(--vp-c-bg-soft));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-divider) 85%, transparent);
}
.dark .jkt-vol-rail {
  background: color-mix(in srgb, white 6%, var(--vp-c-bg-soft));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, white 12%, transparent);
}

.jkt-vol {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}
.jkt-vol::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-text-3) 22%, var(--vp-c-bg-soft));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-2) 14%, transparent);
}
.dark .jkt-vol::-webkit-slider-runnable-track {
  background: color-mix(in srgb, white 18%, var(--vp-c-bg-alt));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, white 12%, transparent);
}
.jkt-vol::-moz-range-track {
  height: 5px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-text-3) 22%, var(--vp-c-bg-soft));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-2) 14%, transparent);
}
.dark .jkt-vol::-moz-range-track {
  background: color-mix(in srgb, white 18%, var(--vp-c-bg-alt));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, white 12%, transparent);
}
.jkt-vol::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -5px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-bg) 90%, transparent);
  cursor: pointer;
}
.jkt-vol::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-bg) 90%, transparent);
  cursor: pointer;
}

/* 迷你条播放键：不用 scale 悬停，避免 flex 内重排抖动 */
.jkt-mini-play {
  transform: translateZ(0);
  backface-visibility: hidden;
}
@media (prefers-reduced-motion: reduce) {
  .jkt-mini-play {
    transition: none;
  }
}
</style>
