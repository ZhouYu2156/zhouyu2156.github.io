import fs from 'node:fs'
import path from 'node:path'
import type { DefaultTheme } from 'vitepress'

/** 目录/文件名：`01.xxx` → 按 1 排序；展示与 URL 使用 `xxx` */
const ORDER_PREFIX_RE = /^(\d+)\.(.+)$/

/** 拼接站内文档路径（cleanUrls，无 .md 后缀） */
function joinDocLink(prefix: string, segment: string): string {
  const base = prefix.replace(/\/$/, '')
  return `${base}/${segment}`
}

/** 目录对应的索引页链接（尾部带 /） */
function toIndexLink(linkPrefix: string): string {
  const p = linkPrefix.replace(/\/$/, '')
  return `${p}/`
}

/** 去掉单层名称前的 `数字.` 前缀（用于侧栏文案与 URL 段） */
export function stripOrderedSegment(name: string): string {
  const m = name.match(ORDER_PREFIX_RE)
  return m ? m[2] : name
}

/**
 * 将相对 src 的页面路径（与 VitePress `pages` 一致，含 `.md`）中的各段去掉 `数字.` 前缀。
 * 用于 `rewrites`：磁盘仍为 `01.博客/...`，对外路由为 `博客/...`。
 */
export function stripOrderedPagePath(relativePageMd: string): string {
  const norm = relativePageMd.replace(/\\/g, '/')
  const parts = norm.split('/')
  const out = parts.map((part, i) => {
    const last = i === parts.length - 1
    if (last && part.endsWith('.md')) {
      const base = part.slice(0, -3)
      return `${stripOrderedSegment(base)}.md`
    }
    return stripOrderedSegment(part)
  })
  return out.join('/')
}

/** 无数字前缀的条目排在有前缀之后，同前缀再按 zh-CN 全名排序 */
function orderedSortKey(name: string): number {
  const m = name.match(ORDER_PREFIX_RE)
  return m ? parseInt(m[1], 10) : Number.POSITIVE_INFINITY
}

function compareOrderedFileNames(a: string, b: string): number {
  const ka = orderedSortKey(a)
  const kb = orderedSortKey(b)
  if (ka !== kb) return ka - kb
  return a.localeCompare(b, 'zh-CN')
}

function sortDirEntries(a: fs.Dirent, b: fs.Dirent): number {
  return compareOrderedFileNames(a.name, b.name)
}

/**
 * 供 `defineConfig({ rewrites })` 使用：把带排序前缀的源路径映射为对外路径。
 * 必须与侧栏 `link` 使用同一套去前缀规则，否则会出现 404。
 */
export function createOrderedPrefixRewrites(): (page: string) => string {
  return (page: string) => {
    const next = stripOrderedPagePath(page)
    return next !== page ? next : page
  }
}

/**
 * 递归生成某一栏目下的 sidebar 条目
 *
 * @param absDir 当前扫描的绝对路径
 * @param linkPrefix 对应当前目录的 URL 前缀，如 `/博客` 或 `/博客/写作`
 * @param skipRootIndex 为 true 时忽略当前目录下的 `index.md`（用于栏目根目录，入口已由 nav 承担）
 * @param depth 相对当前栏目侧栏根的分组深度；仅 depth===0 的分组带 `collapsed`，避免多一层缩进线
 */
function collectSidebarItems(
  absDir: string,
  linkPrefix: string,
  skipRootIndex: boolean,
  excludeDirs: Set<string>,
  depth = 0
): DefaultTheme.SidebarItem[] {
  if (!fs.existsSync(absDir)) return []

  const entries = fs.readdirSync(absDir, { withFileTypes: true })
  const dirs = entries
    .filter((e) => e.isDirectory())
    .filter((e) => !e.name.startsWith('.') && !excludeDirs.has(e.name))
    .sort(sortDirEntries)

  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.md'))

  const hasIndex = files.some((f) => f.name === 'index.md')
  const looseMd = files
    .filter((f) => f.name !== 'index.md')
    .sort(sortDirEntries)

  const items: DefaultTheme.SidebarItem[] = []

  if (!skipRootIndex && hasIndex) {
    items.push({
      text: '概述',
      link: toIndexLink(linkPrefix)
    })
  }

  for (const d of dirs) {
    const subAbs = path.join(absDir, d.name)
    const slug = stripOrderedSegment(d.name)
    const subLink = joinDocLink(linkPrefix, slug)
    const nested = collectSidebarItems(
      subAbs,
      subLink,
      false,
      excludeDirs,
      depth + 1
    )
    const subHasIndex = fs.existsSync(path.join(subAbs, 'index.md'))

    if (nested.length > 0) {
      const group: DefaultTheme.SidebarItem = {
        text: slug,
        items: nested
      }
      if (depth === 0) {
        group.collapsed = false
      }
      items.push(group)
    } else if (subHasIndex) {
      items.push({
        text: slug,
        link: toIndexLink(subLink)
      })
    }
  }

  for (const f of looseMd) {
    const rawBase = f.name.replace(/\.md$/i, '')
    const slug = stripOrderedSegment(rawBase)
    items.push({
      text: slug,
      link: joinDocLink(linkPrefix, slug)
    })
  }

  return items
}

export interface ResolveDirectoriesResult {
  nav: DefaultTheme.NavItem[]
  /** 按路径前缀划分的侧栏，键需以 `/` 结尾以便与 VitePress 前缀匹配 */
  sidebar: DefaultTheme.SidebarMulti
  /**
   * 写入 `defineConfig({ rewrites })`，使去掉数字前缀后的 `link` 能解析到真实 `.md` 路径。
   */
  rewrites: (page: string) => string
}

/**
 * 根据 src 目录结构生成 nav 与 sidebar
 *
 * 规则：
 * - `src` 下**一级目录**且存在 `index.md` → 生成顶部导航项，`link` 为 `/<目录名>/`
 * - 每个这样的栏目对应 `sidebar['/<目录名>/']`：**直接**为一级分组数组（不再包一层栏目名），与手写 `themeConfig.sidebar` 结构一致
 * - 栏目根目录的 `index.md` 不在侧栏重复列出（由 nav 进入）；子目录的 `index.md` 显示为「概述」
 * - 仅栏目下**第一层**子目录分组带 `collapsed: false`；更深层分组不带 `collapsed`，避免侧栏多出一道层级线
 * - 目录与 `.md` 文件名若匹配 `数字.` 前缀（如 `01.写作`、`02.Django.md`）：**排序**按该数字；**导航文案与 URL** 去掉此前缀。须配合返回的 `rewrites` 写入配置。
 */
export function resolveDirectories(
  srcDir: string,
  excludeDirs: string[] = ['public']
): ResolveDirectoriesResult {
  const exclude = new Set(excludeDirs)
  const nav: DefaultTheme.NavItem[] = []
  const sidebar: DefaultTheme.SidebarMulti = {}
  const rewrites = createOrderedPrefixRewrites()

  if (!fs.existsSync(srcDir)) {
    return { nav, sidebar, rewrites }
  }

  const top = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .filter((e) => !e.name.startsWith('.') && !exclude.has(e.name))
    .sort(sortDirEntries)

  for (const ent of top) {
    const sectionAbs = path.join(srcDir, ent.name)
    const indexPath = path.join(sectionAbs, 'index.md')
    if (!fs.existsSync(indexPath)) continue

    const sectionSlug = stripOrderedSegment(ent.name)
    const sectionLinkPrefix = `/${sectionSlug}`

    nav.push({
      text: sectionSlug,
      link: toIndexLink(sectionLinkPrefix)
    })

    let sectionItems = collectSidebarItems(
      sectionAbs,
      sectionLinkPrefix,
      true,
      exclude
    )

    if (sectionItems.length === 0) {
      sectionItems = [
        {
          text: '概述',
          link: toIndexLink(sectionLinkPrefix)
        }
      ]
    }

    sidebar[toIndexLink(sectionLinkPrefix)] = sectionItems
  }

  return { nav, sidebar, rewrites }
}
