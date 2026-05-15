import fs from 'node:fs'
import path from 'node:path'

/**
 * 与 `vitepress-plugin-group-icons` 在 md 产物里用 `data-title` 收集的标签一致：
 * 代码块首行在「语言 / 高亮 meta」之后带 ` [标题]`，例如：
 * - ` ```typescript [config.ts]`
 * - ` ```sh [npm]`
 * - ` ```vue{7,9,14,18,22} [Layout.vue]`（Shiki 行高亮 `{…}` 也常见，旧正则 `[\w.#+-]*` 扫不到）
 *
 * 生产构建时，主题会过早 `import 'virtual:group-icons.css'`，插件内部 `matches` 常仍为空，
 * 虚拟模块首次 `load` 被 Rollup 缓存成无图标 CSS。官方插件提供 **`defaultLabels`**（见 npm 包 `Options`）
 * 在 `generateCSS` 时与 `matches` 合并；这里预扫磁盘作为 `defaultLabels` 传入，属于官方支持的用法。
 *
 * 若仍有漏网标题，可在 `groupIconVitePlugin({ defaultLabels: [...] })` 里手工补几项。
 */
const FENCE_WITH_TAB_LABEL = /^```(.+?)\s+\[([^\]]+)\]/gm

export function collectGroupIconTabLabels(srcRoot: string): string[] {
  const labels = new Set<string>()

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name.startsWith('.')) continue
      const abs = path.join(dir, ent.name)
      if (ent.isDirectory()) walk(abs)
      else if (ent.name.endsWith('.md')) {
        const content = fs.readFileSync(abs, 'utf8')
        let m: RegExpExecArray | null
        FENCE_WITH_TAB_LABEL.lastIndex = 0
        while ((m = FENCE_WITH_TAB_LABEL.exec(content)) !== null) {
          const t = m[2].trim()
          if (t) labels.add(t)
        }
      }
    }
  }

  walk(srcRoot)
  return [...labels]
}
