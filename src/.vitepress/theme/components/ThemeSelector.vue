<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'

// 获取VitePress的黑暗模式状态
const { isDark } = useData()

// 定义主题列表
const themes = [
  {
    id: 'default',
    name: '默认蓝',
    color: 'linear-gradient(120deg, #bd34fe 30%, #41d1ff)',
    bgColor: '#f6f6f7',
  },
  {
    id: 'emerald',
    name: '翡翠绿',
    color: 'linear-gradient(120deg, #059669 30%, #34d399)',
    bgColor: '#f0f7f4',
  },
  {
    id: 'ruby',
    name: '宝石红',
    color: 'linear-gradient(120deg, #b91c1c 30%, #fb7185)',
    bgColor: '#faf1f1',
  },
  {
    id: 'amber',
    name: '琥珀黄',
    color: 'linear-gradient(120deg, #d97706 30%, #fbbf24)',
    bgColor: '#fdf7e9',
  },
  {
    id: 'sapphire',
    name: '宝石蓝',
    color: 'linear-gradient(120deg, #1d4ed8 30%, #60a5fa)',
    bgColor: '#f0f5fb',
  },
  {
    id: 'amethyst',
    name: '紫水晶',
    color: 'linear-gradient(120deg, #6d28d9 30%, #a78bfa)',
    bgColor: '#f5f1fb',
  },
  {
    id: 'mint',
    name: '薄荷绿',
    color: 'linear-gradient(120deg, #0d9488 30%, #5eead4)',
    bgColor: '#f0f9f8',
  },
  {
    id: 'ocean',
    name: '海洋蓝',
    color: 'linear-gradient(120deg, #0369a1 30%, #22d3ee)',
    bgColor: '#f0f7fb',
  },
  {
    id: 'coral',
    name: '珊瑚橙',
    color: 'linear-gradient(120deg, #c2410c 30%, #fdba74)',
    bgColor: '#faf3ef',
  },
  {
    id: 'graphite',
    name: '石墨黑',
    color: 'linear-gradient(120deg, #374151 30%, #9ca3af)',
    bgColor: '#f1f2f4',
  },
  {
    id: 'sakura',
    name: '樱花粉',
    color: 'linear-gradient(120deg, #be185d 30%, #f9a8d4)',
    bgColor: '#fbf0f5',
  },
  // 新增主题
  {
    id: 'starry',
    name: '星河紫',
    color: 'linear-gradient(120deg, #4c1d95 30%, #c4b5fd)',
    bgColor: '#f5f0ff',
  },
  {
    id: 'deep-ocean',
    name: '深海蓝',
    color: 'linear-gradient(120deg, #0c4a6e 30%, #38bdf8)',
    bgColor: '#f0f9ff',
  },
  {
    id: 'forest-green',
    name: '森林绿',
    color: 'linear-gradient(120deg, #166534 30%, #86efac)',
    bgColor: '#f0fbf0',
  },
  {
    id: 'warm-gold',
    name: '暖阳金',
    color: 'linear-gradient(120deg, #b45309 30%, #fcd34d)',
    bgColor: '#fffbeb',
  },
  {
    id: 'rose',
    name: '玫瑰红',
    color: 'linear-gradient(120deg, #9f1239 30%, #fb7185)',
    bgColor: '#fff1f5',
  },
]

// 为暗色模式增加背景色
const themesWithDarkBg = computed(() => {
  return themes.map(theme => {
    const darkBgMap: Record<string, string> = {
      default: '#1b1b1f',
      emerald: '#0f1a17',
      ruby: '#1e1415',
      amber: '#1e1a14',
      sapphire: '#111827',
      amethyst: '#17131f',
      mint: '#0f1b1a',
      ocean: '#0a1721',
      coral: '#1e1712',
      graphite: '#1a1b1e',
      sakura: '#1e111b',
      // 新增主题的暗色背景
      starry: '#17122a',
      'deep-ocean': '#051a2b',
      'forest-green': '#0a2014',
      'warm-gold': '#271c08',
      rose: '#260d16',
    }

    return {
      ...theme,
      bgColor: isDark.value ? darkBgMap[theme.id] || '#1b1b1f' : theme.bgColor,
    }
  })
})

// 当前主题
const currentTheme = ref('default')

// 计算当前主题的颜色和名称
const currentThemeColor = computed(() => {
  const theme = themes.find(t => t.id === currentTheme.value)
  return theme ? theme.color : themes[0].color
})

const currentThemeName = computed(() => {
  const theme = themes.find(t => t.id === currentTheme.value)
  return theme ? theme.name : themes[0].name
})

// 处理主题切换
const handleThemeChange = (themeId: string) => {
  try {
    if (typeof themeId !== 'string') {
      console.error('主题ID必须是字符串', themeId)
      return
    }

    // 移除所有主题类
    themes.forEach(theme => {
      document.documentElement.classList.remove(`theme-${theme.id}`)
    })

    // 添加新的主题类
    if (themeId !== 'default') {
      document.documentElement.classList.add(`theme-${themeId}`)
    }

    // 保存到localStorage
    localStorage.setItem('vitepress-theme', themeId)
    currentTheme.value = themeId
  } catch (err) {
    console.error('切换主题时出错:', err)
  }
}

// 组件加载时，恢复之前保存的主题
onMounted(() => {
  try {
    const savedTheme = localStorage.getItem('vitepress-theme')
    if (savedTheme) {
      handleThemeChange(savedTheme)
    }
  } catch (err) {
    console.error('加载保存的主题时出错:', err)
  }
})
</script>

<template>
  <div class="theme-selector">
    <!-- 使用Element Plus的下拉菜单实现主题切换 -->
    <el-dropdown trigger="click" @command="handleThemeChange">
      <div class="theme-display">
        <div class="theme-color-display" :style="{ background: currentThemeColor }"></div>
        <span class="theme-name">{{ currentThemeName }}</span>
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="theme in themesWithDarkBg"
            :key="theme.id"
            :command="theme.id"
            :class="{ 'is-active': currentTheme === theme.id }">
            <div class="theme-item">
              <div class="theme-preview">
                <div class="theme-preview-bg" :style="{ background: theme.bgColor }">
                  <div class="theme-preview-content" :style="{ background: theme.color }"></div>
                </div>
              </div>
              <span class="theme-label">{{ theme.name }}</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.theme-selector {
  margin: 0 0.5rem;
}

.theme-display {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
  border: 1px solid var(--vp-c-divider);
}

.theme-display:hover {
  background-color: var(--vp-c-bg-soft);
}

.theme-color-display {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.theme-name {
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.theme-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;
}

.theme-preview {
  width: 36px;
  height: 24px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.theme-preview-bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-preview-content {
  width: 60%;
  height: 60%;
  border-radius: 2px;
}

.theme-label {
  font-size: 14px;
  margin-left: 4px;
}

.mode-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-dropdown-item {
  display: block;
  padding: 5px 16px;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  outline: none;
  border-radius: 0;
}

.custom-dropdown-item:hover {
  background-color: var(--vp-c-bg-soft);
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: var(--vp-c-bg-soft);
}

:deep(.el-dropdown-menu__item:not(.is-disabled):focus),
:deep(.el-dropdown-menu__item:not(.is-disabled):hover) {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

:deep(.el-dropdown-menu__item.is-active) {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

:deep(.el-dropdown-menu__item.is-active:hover) {
  background-color: var(--vp-c-brand-soft);
}

:deep(.el-dropdown-menu) {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
}

:deep(.el-popper.is-dark) {
  color: var(--vp-c-text-1);
}

:deep(.el-popper__arrow::before) {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
}
</style>
