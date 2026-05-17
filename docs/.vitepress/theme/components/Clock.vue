<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const useLiveDateTime = (interval: number = 1000) => {
  const now = ref(new Date())
  let timer: NodeJS.Timeout | null = null

  const padZero = (n: number): string => n.toString().padStart(2, '0')

  const start = () => {
    timer = setInterval(() => {
      now.value = new Date()
    }, interval)
  }

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const dateTime = computed(() => {
    const d = now.value
    return {
      // 日期
      calendar: `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`,
      // 时间
      time: `${padZero(d.getHours())} : ${padZero(d.getMinutes())} : ${padZero(d.getSeconds())}`,
      // 其他格式
      iso: d.toISOString(),
      localeString: d.toLocaleString('zh-CN'),
      timestamp: d.getTime(),
      // 组件
      year: d.getFullYear(),
      month: padZero(d.getMonth() + 1),
      day: padZero(d.getDate()),
      hour: padZero(d.getHours()),
      minute: padZero(d.getMinutes()),
      second: padZero(d.getSeconds()),
    }
  })

  onMounted(start)
  onUnmounted(stop)

  return { dateTime, now, start, stop }
}

const { dateTime, now, start, stop } = useLiveDateTime()
</script>

<template>
  <div class="tomato">
    <p class="date">{{ dateTime.calendar }}</p>
    <p class="time">
      {{ dateTime.time }}
    </p>
  </div>
</template>

<style scoped lang="css">
@reference 'tailwindcss';

.tomato {
  @apply w-full h-full flex flex-col items-center justify-center;

  .date {
    @apply pt-64 2xl:pt-80 text-2xl font-bold sm:text-3xl md:text-4xl;
  }

  .time {
    @apply py-12 text-4xl font-bold sm:text-6xl md:text-8xl;
  }
}
</style>
