<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)

function onSubmit(e: Event) {
  e.preventDefault()
}
</script>

<template>
  <section
    class="jkt-login relative isolate mx-[calc(50%-50vw)] flex w-screen max-w-[100vw] shrink-0 flex-col items-center justify-center overflow-x-clip px-4 py-10 sm:px-6 sm:py-14"
    aria-labelledby="jkt-login-heading">
    <!-- 亮色背景 -->
    <div
      class="jkt-login-bg-light pointer-events-none absolute inset-0 z-0"
      aria-hidden="true">
      <div class="absolute inset-0 bg-(--vp-c-bg)" />
      <div class="absolute inset-0 bg-linear-to-br from-sky-100/55 via-(--vp-c-bg) to-violet-100/50" />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,color-mix(in_srgb,var(--vp-c-brand-1)_22%,transparent),transparent)]" />
      <div class="absolute -left-24 top-16 h-72 w-72 rounded-full bg-indigo-400/25 blur-3xl" />
      <div class="absolute -right-16 bottom-24 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />
    </div>

    <!-- 暗色背景：避免纵向渐变落到纯黑，否则下半屏网格对比度会消失 -->
    <div
      class="jkt-login-bg-dark pointer-events-none absolute inset-0 z-0"
      aria-hidden="true">
      <div class="absolute inset-0 bg-zinc-950" />
      <div class="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-900" />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_-15%,rgba(99,102,241,0.12),transparent)]" />
      <!-- 下半屏均匀提亮：让网格线与上半屏观感一致 -->
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_110%_65%_at_50%_108%,rgba(82,82,91,0.38),transparent_58%)]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_top,rgba(39,39,42,0.55)_0%,transparent_42%)]" />
      <div class="absolute -left-32 top-20 h-80 w-80 rounded-full bg-indigo-950/45 blur-3xl" />
      <div class="absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-indigo-950/35 blur-3xl" />
      <div
        class="absolute bottom-0 left-1/2 h-48 w-[min(100%,56rem)] -translate-x-1/2 rounded-[100%] bg-violet-950/25 blur-3xl" />
    </div>

    <!-- 低调网格：叠在渐变之上、卡片之下 -->
    <div
      class="jkt-login-grid pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--vp-c-text-1)_18%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--vp-c-text-1)_18%,transparent)_1px,transparent_1px)] bg-size-[40px_40px] sm:bg-size-[44px_44px]"
      aria-hidden="true" />

    <div class="relative z-10 w-full max-w-[420px]">
      <div
        class="rounded-2xl border border-(--vp-c-border) bg-(--vp-c-bg-alt) p-6 shadow-(--vp-shadow-3) ring-1 ring-black/5 backdrop-blur-md sm:rounded-[1.35rem] sm:p-8 dark:bg-(--vp-c-bg-elv) dark:ring-white/10">
        <div class="mb-6 flex flex-col items-center text-center sm:mb-8">
          <div
            class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--vp-c-brand-3) text-(--vp-button-brand-text) shadow-(--vp-shadow-2) ring-2 ring-(--vp-c-bg) dark:ring-zinc-800"
            aria-hidden="true">
            <svg
              class="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1
            id="jkt-login-heading"
            class="text-balance text-2xl font-bold tracking-tight text-(--vp-c-text-1) sm:text-3xl">
            登录
          </h1>
          <p class="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-(--vp-c-text-2)">
            使用邮箱与密码登录极客兔账号
          </p>
        </div>

        <form
          class="space-y-5"
          @submit="onSubmit">
          <div>
            <label
              for="jkt-login-email"
              class="mb-1.5 block text-sm font-medium text-(--vp-c-text-1)">
              邮箱
            </label>
            <div
              class="flex min-h-11 items-center gap-2 rounded-xl border border-(--vp-c-border) bg-(--vp-c-bg) px-3 shadow-inner shadow-black/4 transition focus-within:border-(--vp-c-brand-1) focus-within:ring-2 focus-within:ring-(--vp-c-brand-soft) dark:shadow-black/20">
              <svg
                class="h-5 w-5 shrink-0 text-(--vp-c-text-3)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                id="jkt-login-email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you@example.com"
                class="min-h-11 min-w-0 flex-1 border-0 bg-transparent py-2.5 text-base text-(--vp-c-text-1) outline-none placeholder:text-(--vp-c-text-3) sm:text-[15px]" />
            </div>
          </div>

          <div>
            <label
              for="jkt-login-password"
              class="mb-1.5 block text-sm font-medium text-(--vp-c-text-1)">
              密码
            </label>
            <div
              class="flex min-h-11 items-center gap-2 rounded-xl border border-(--vp-c-border) bg-(--vp-c-bg) px-3 shadow-inner shadow-black/4 transition focus-within:border-(--vp-c-brand-1) focus-within:ring-2 focus-within:ring-(--vp-c-brand-soft) dark:shadow-black/20">
              <svg
                class="h-5 w-5 shrink-0 text-(--vp-c-text-3)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                id="jkt-login-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                autocomplete="current-password"
                placeholder="请输入密码"
                class="min-h-11 min-w-0 flex-1 border-0 bg-transparent py-2.5 pr-1 text-base text-(--vp-c-text-1) outline-none placeholder:text-(--vp-c-text-3) sm:text-[15px]" />
              <button
                type="button"
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-(--vp-c-text-3) transition hover:bg-(--vp-c-bg-soft) hover:text-(--vp-c-text-1)"
                :aria-pressed="showPassword"
                :aria-label="showPassword ? '隐藏密码' : '显示密码'"
                @click="showPassword = !showPassword">
                <svg
                  v-if="!showPassword"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 text-sm">
            <label class="flex cursor-pointer select-none items-center gap-2 text-(--vp-c-text-2)">
              <input
                v-model="remember"
                type="checkbox"
                name="remember"
                class="size-4 rounded border-(--vp-c-border) bg-(--vp-c-bg) accent-(--vp-c-brand-3) focus:ring-2 focus:ring-(--vp-c-brand-soft) focus:ring-offset-0" />
              <span>记住我</span>
            </label>
            <a
              href="#"
              class="font-medium text-(--vp-c-brand-1) underline-offset-4 hover:text-(--vp-c-brand-2) hover:underline"
              @click.prevent>
              忘记密码？
            </a>
          </div>

          <button
            type="submit"
            class="jkt-login-submit mt-1 flex min-h-6 w-full items-center justify-center rounded-2xl border-0 px-5 py-3.5 text-base font-semibold leading-snug text-(--vp-button-brand-text) shadow-(--vp-shadow-2) outline-none transition hover:opacity-[0.96] focus-visible:ring-4 focus-visible:ring-(--vp-c-brand-soft) active:scale-[0.99] sm:min-h-10 sm:py-4 sm:text-[17px]">
            登录
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
.jkt-login {
  min-height: calc(100svh - var(--vp-nav-height));
}

.jkt-login-submit {
  background-color: var(--vp-c-brand-3);
  color: var(--vp-button-brand-text, #fff);
  cursor: pointer;
}

.jkt-login-submit:hover {
  background-color: var(--vp-c-brand-2);
}

.jkt-login-submit:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent);
  outline-offset: 2px;
}
</style>

<style lang="css">
/* 与 VitePress 的 document.documentElement.classList.toggle('dark') 对齐，不用 prefers-color-scheme */
html.dark .jkt-login-bg-light {
  display: none !important;
}

html:not(.dark) .jkt-login-bg-dark {
  display: none !important;
}

html.dark .jkt-login-grid {
  opacity: 0.2;
}

html:not(.dark) .jkt-login-grid {
  opacity: 0.24;
}
</style>
