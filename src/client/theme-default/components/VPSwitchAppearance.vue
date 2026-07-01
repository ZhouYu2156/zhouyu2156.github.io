<script lang="ts" setup>
import { inject, nextTick, ref, watchPostEffect } from 'vue'
import { useData } from '../composables/data'
import VPSwitch from './VPSwitch.vue'

const { isDark, theme } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

const toggleAppearance = inject('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  // isDark.value = !isDark.value

  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 400,
      easing: 'ease-in-out',
      fill: 'both',
      pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
    }
  )
})

const switchTitle = ref('')

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})

</script>

<template>
  <VPSwitch :title="switchTitle" class="VPSwitchAppearance" :aria-checked="isDark" @click="toggleAppearance">
    <span class="vpi-sun sun" />
    <span class="vpi-moon moon" />
  </VPSwitch>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
