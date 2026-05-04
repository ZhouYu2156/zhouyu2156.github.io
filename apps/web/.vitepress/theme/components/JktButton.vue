<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export type JktButtonVariant = 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'
export type JktButtonTone = 'solid' | 'outline' | 'ghost' | 'soft'
export type JktButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type JktButtonRounded = 'none' | 'md' | 'lg' | 'full'

type Combo = `${JktButtonVariant}-${JktButtonTone}`

const props = withDefaults(
  defineProps<{
    variant?: JktButtonVariant
    tone?: JktButtonTone
    size?: JktButtonSize
    rounded?: JktButtonRounded
    disabled?: boolean
    loading?: boolean
    block?: boolean
    nativeType?: 'button' | 'submit' | 'reset'
    href?: string
    target?: string
    rel?: string
  }>(),
  {
    variant: 'primary',
    tone: 'solid',
    size: 'md',
    rounded: 'md',
    disabled: false,
    loading: false,
    block: false,
    nativeType: 'button',
    target: undefined,
    rel: undefined,
  },
)

const attrs = useAttrs()

const tag = computed(() => (props.href ? 'a' : 'button'))
const inactive = computed(() => props.disabled || props.loading)

const passthrough = computed(() => {
  if (tag.value === 'a') {
    return {
      href: inactive.value ? undefined : props.href,
      target: props.target,
      rel: props.rel ?? (props.target === '_blank' ? 'noopener noreferrer' : undefined),
      'aria-disabled': inactive.value ? 'true' : undefined,
      tabindex: inactive.value ? -1 : undefined,
    }
  }
  return {
    type: props.nativeType,
    disabled: inactive.value || undefined,
  }
})

const rootClass = computed(() => {
  const combo = `${props.variant}-${props.tone}` as Combo
  return [
    'jkt-btn',
    `jkt-btn--${combo}`,
    `jkt-btn--size-${props.size}`,
    `jkt-btn--rounded-${props.rounded}`,
    props.block && 'jkt-btn--block',
    props.loading && 'jkt-btn--loading',
  ].filter(Boolean)
})

function onClick(e: MouseEvent) {
  if (tag.value === 'a' && inactive.value) e.preventDefault()
}
</script>

<template>
  <component
    :is="tag"
    v-bind="{ ...attrs, ...passthrough }"
    :class="rootClass"
    :aria-busy="loading ? 'true' : undefined"
    @click="onClick">
    <span
      v-if="loading"
      class="jkt-btn__spinner"
      aria-hidden="true">
      <svg
        class="jkt-btn__svg"
        viewBox="0 0 24 24"
        fill="none">
        <circle
          class="jkt-btn__track"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3" />
        <path
          class="jkt-btn__arc"
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round" />
      </svg>
    </span>

    <span
      v-if="$slots.icon"
      class="jkt-btn__icon"
      :class="{ 'jkt-btn__slot--ghost': loading }">
      <slot name="icon" />
    </span>

    <span
      class="jkt-btn__label"
      :class="{ 'jkt-btn__slot--ghost': loading }">
      <slot />
    </span>

    <span
      v-if="$slots.trailing"
      class="jkt-btn__trailing"
      :class="{ 'jkt-btn__slot--ghost': loading }">
      <slot name="trailing" />
    </span>
  </component>
</template>

<style scoped lang="css">
@reference '../style.css';

/* -------------------------------------------------------------------------- layout */

.jkt-btn {
  @apply relative inline-flex max-w-full shrink-0 cursor-pointer items-center justify-center gap-2 border border-solid font-medium leading-tight no-underline transition-colors duration-150 ease-out;
  @apply transition-[color,background-color,border-color,box-shadow,opacity] duration-150 ease-out;
  @apply outline-none [-webkit-tap-highlight-color:transparent];
  @apply focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950;
  @apply disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50;
  @apply aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50;
}

.jkt-btn--block {
  @apply w-full;
}

.jkt-btn--loading {
  @apply cursor-wait;
}

.jkt-btn--size-xs {
  @apply min-h-7 gap-1.5 px-2.5 py-1 text-xs;
}
.jkt-btn--size-sm {
  @apply min-h-8 gap-1.5 px-3 py-1.5 text-sm;
}
.jkt-btn--size-md {
  @apply min-h-9 gap-2 px-4 py-2 text-sm;
}
.jkt-btn--size-lg {
  @apply min-h-11 gap-2 px-5 py-2.5 text-base;
}

.jkt-btn--rounded-none {
  @apply rounded-none;
}
.jkt-btn--rounded-md {
  @apply rounded-lg;
}
.jkt-btn--rounded-lg {
  @apply rounded-xl;
}
.jkt-btn--rounded-full {
  @apply rounded-full;
}

/* -------------------------------------------------------------------------- primary */

.jkt-btn--primary-solid {
  @apply border-violet-600 bg-violet-600 text-white shadow-sm;
  @apply hover:border-violet-500 hover:bg-violet-500 active:border-violet-700 active:bg-violet-700;
  @apply focus-visible:ring-violet-500;
}
.jkt-btn--primary-outline {
  @apply border-violet-500 bg-transparent text-violet-700;
  @apply hover:bg-violet-50 active:bg-violet-100;
  @apply dark:border-violet-500/80 dark:text-violet-300 dark:hover:bg-violet-950/40 dark:active:bg-violet-950/60;
  @apply focus-visible:ring-violet-500;
}
.jkt-btn--primary-ghost {
  @apply border-transparent bg-transparent text-violet-700;
  @apply hover:bg-violet-50 active:bg-violet-100/80;
  @apply dark:text-violet-300 dark:hover:bg-violet-950/40 dark:active:bg-violet-950/60;
  @apply focus-visible:ring-violet-500;
}
.jkt-btn--primary-soft {
  @apply border-transparent bg-violet-100 text-violet-900;
  @apply hover:bg-violet-200/90 active:bg-violet-200;
  @apply dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-950/75 dark:active:bg-violet-950;
  @apply focus-visible:ring-violet-500;
}

/* -------------------------------------------------------------------------- secondary */

.jkt-btn--secondary-solid {
  @apply border-slate-600 bg-slate-600 text-white shadow-sm;
  @apply hover:border-slate-500 hover:bg-slate-500 active:border-slate-700 active:bg-slate-700;
  @apply focus-visible:ring-slate-500;
}
.jkt-btn--secondary-outline {
  @apply border-slate-300 bg-transparent text-slate-800;
  @apply hover:bg-slate-50 active:bg-slate-100;
  @apply dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800/50 dark:active:bg-slate-800;
  @apply focus-visible:ring-slate-500;
}
.jkt-btn--secondary-ghost {
  @apply border-transparent bg-transparent text-slate-700;
  @apply hover:bg-slate-100 active:bg-slate-200/80;
  @apply dark:text-slate-200 dark:hover:bg-slate-800/50 dark:active:bg-slate-800;
  @apply focus-visible:ring-slate-500;
}
.jkt-btn--secondary-soft {
  @apply border-transparent bg-slate-100 text-slate-900;
  @apply hover:bg-slate-200/90 active:bg-slate-200;
  @apply dark:bg-slate-800/45 dark:text-slate-100 dark:hover:bg-slate-800/80 dark:active:bg-slate-800;
  @apply focus-visible:ring-slate-500;
}

/* -------------------------------------------------------------------------- neutral */

.jkt-btn--neutral-solid {
  @apply border-zinc-400 bg-zinc-200 text-zinc-900 shadow-sm;
  @apply hover:border-zinc-400 hover:bg-zinc-300 active:border-zinc-500 active:bg-zinc-400/90;
  @apply dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600 dark:active:bg-zinc-700;
  @apply focus-visible:ring-zinc-400;
}
.jkt-btn--neutral-outline {
  @apply border-zinc-300 bg-transparent text-zinc-900;
  @apply hover:bg-zinc-50 active:bg-zinc-100;
  @apply dark:border-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-800/40 dark:active:bg-zinc-800;
  @apply focus-visible:ring-zinc-400;
}
.jkt-btn--neutral-ghost {
  @apply border-transparent bg-transparent text-zinc-800;
  @apply hover:bg-zinc-100 active:bg-zinc-200/70;
  @apply dark:text-zinc-100 dark:hover:bg-zinc-800/40 dark:active:bg-zinc-800;
  @apply focus-visible:ring-zinc-400;
}
.jkt-btn--neutral-soft {
  @apply border-transparent bg-zinc-100 text-zinc-900;
  @apply hover:bg-zinc-200/90 active:bg-zinc-200;
  @apply dark:bg-zinc-800/35 dark:text-zinc-100 dark:hover:bg-zinc-800/65 dark:active:bg-zinc-800;
  @apply focus-visible:ring-zinc-400;
}

/* -------------------------------------------------------------------------- success */

.jkt-btn--success-solid {
  @apply border-emerald-600 bg-emerald-600 text-white shadow-sm;
  @apply hover:border-emerald-500 hover:bg-emerald-500 active:border-emerald-700 active:bg-emerald-700;
  @apply focus-visible:ring-emerald-500;
}
.jkt-btn--success-outline {
  @apply border-emerald-600 bg-transparent text-emerald-700;
  @apply hover:bg-emerald-50 active:bg-emerald-100;
  @apply dark:text-emerald-300 dark:hover:bg-emerald-950/40 dark:active:bg-emerald-950/60;
  @apply focus-visible:ring-emerald-500;
}
.jkt-btn--success-ghost {
  @apply border-transparent bg-transparent text-emerald-700;
  @apply hover:bg-emerald-50 active:bg-emerald-100/80;
  @apply dark:text-emerald-300 dark:hover:bg-emerald-950/40 dark:active:bg-emerald-950/60;
  @apply focus-visible:ring-emerald-500;
}
.jkt-btn--success-soft {
  @apply border-transparent bg-emerald-100 text-emerald-900;
  @apply hover:bg-emerald-200/90 active:bg-emerald-200;
  @apply dark:bg-emerald-950/45 dark:text-emerald-100 dark:hover:bg-emerald-950/70 dark:active:bg-emerald-950;
  @apply focus-visible:ring-emerald-500;
}

/* -------------------------------------------------------------------------- warning */

.jkt-btn--warning-solid {
  @apply border-amber-400 bg-amber-400 text-amber-950 shadow-sm;
  @apply hover:border-amber-300 hover:bg-amber-300 active:border-amber-500 active:bg-amber-500;
  @apply focus-visible:ring-amber-400;
}
.jkt-btn--warning-outline {
  @apply border-amber-500 bg-transparent text-amber-900;
  @apply hover:bg-amber-50 active:bg-amber-100;
  @apply dark:text-amber-200 dark:hover:bg-amber-950/35 dark:active:bg-amber-950/55;
  @apply focus-visible:ring-amber-400;
}
.jkt-btn--warning-ghost {
  @apply border-transparent bg-transparent text-amber-900;
  @apply hover:bg-amber-50 active:bg-amber-100/80;
  @apply dark:text-amber-200 dark:hover:bg-amber-950/35 dark:active:bg-amber-950/55;
  @apply focus-visible:ring-amber-400;
}
.jkt-btn--warning-soft {
  @apply border-transparent bg-amber-100 text-amber-950;
  @apply hover:bg-amber-200/90 active:bg-amber-200;
  @apply dark:bg-amber-950/40 dark:text-amber-50 dark:hover:bg-amber-950/65 dark:active:bg-amber-950;
  @apply focus-visible:ring-amber-400;
}

/* -------------------------------------------------------------------------- danger */

.jkt-btn--danger-solid {
  @apply border-rose-600 bg-rose-600 text-white shadow-sm;
  @apply hover:border-rose-500 hover:bg-rose-500 active:border-rose-700 active:bg-rose-700;
  @apply focus-visible:ring-rose-500;
}
.jkt-btn--danger-outline {
  @apply border-rose-600 bg-transparent text-rose-700;
  @apply hover:bg-rose-50 active:bg-rose-100;
  @apply dark:text-rose-300 dark:hover:bg-rose-950/40 dark:active:bg-rose-950/60;
  @apply focus-visible:ring-rose-500;
}
.jkt-btn--danger-ghost {
  @apply border-transparent bg-transparent text-rose-700;
  @apply hover:bg-rose-50 active:bg-rose-100/80;
  @apply dark:text-rose-300 dark:hover:bg-rose-950/40 dark:active:bg-rose-950/60;
  @apply focus-visible:ring-rose-500;
}
.jkt-btn--danger-soft {
  @apply border-transparent bg-rose-100 text-rose-900;
  @apply hover:bg-rose-200/90 active:bg-rose-200;
  @apply dark:bg-rose-950/45 dark:text-rose-100 dark:hover:bg-rose-950/70 dark:active:bg-rose-950;
  @apply focus-visible:ring-rose-500;
}

/* -------------------------------------------------------------------------- info */

.jkt-btn--info-solid {
  @apply border-sky-600 bg-sky-600 text-white shadow-sm;
  @apply hover:border-sky-500 hover:bg-sky-500 active:border-sky-700 active:bg-sky-700;
  @apply focus-visible:ring-sky-500;
}
.jkt-btn--info-outline {
  @apply border-sky-600 bg-transparent text-sky-700;
  @apply hover:bg-sky-50 active:bg-sky-100;
  @apply dark:text-sky-300 dark:hover:bg-sky-950/40 dark:active:bg-sky-950/60;
  @apply focus-visible:ring-sky-500;
}
.jkt-btn--info-ghost {
  @apply border-transparent bg-transparent text-sky-700;
  @apply hover:bg-sky-50 active:bg-sky-100/80;
  @apply dark:text-sky-300 dark:hover:bg-sky-950/40 dark:active:bg-sky-950/60;
  @apply focus-visible:ring-sky-500;
}
.jkt-btn--info-soft {
  @apply border-transparent bg-sky-100 text-sky-900;
  @apply hover:bg-sky-200/90 active:bg-sky-200;
  @apply dark:bg-sky-950/45 dark:text-sky-100 dark:hover:bg-sky-950/70 dark:active:bg-sky-950;
  @apply focus-visible:ring-sky-500;
}

/* -------------------------------------------------------------------------- slots + spinner */

.jkt-btn__spinner {
  @apply pointer-events-none absolute inset-0 flex items-center justify-center;
}

.jkt-btn__svg {
  @apply size-[1.125em] shrink-0 animate-spin;
}

.jkt-btn__track {
  @apply opacity-25;
}

.jkt-btn__arc {
  @apply opacity-90;
}

.jkt-btn__icon,
.jkt-btn__trailing {
  @apply inline-flex size-[1.15em] shrink-0 items-center justify-center [&>svg]:size-full;
}

.jkt-btn__label {
  @apply inline-flex min-w-0 items-center justify-center truncate;
}

.jkt-btn__slot--ghost {
  @apply invisible;
}
</style>
