interface RouteItem {
  /** 侧栏、面包屑、页签标题 */
  title: string
  /** 菜单图标名（Element Plus 图标） */
  icon: string
  /** 角色白名单 */
  roles: string[]
  /** 权限码白名单 */
  permissions: string[]
  /** 是否固定在标签页 */
  affix: boolean
  /** 是否隐藏 */
  hidden: boolean
  /** 侧栏该节点是否始终显示父级 */
  alwaysShow: boolean
  /** 与 keep-alive 相反语义 */
  noCache: boolean
  /** 面包屑是否显示该级 */
  breadcrumb: boolean
  /** 高亮侧栏时用 */
  activeMenu: string
  /** 外链地址 */
  link: string
}

interface RouteList extends Array<RouteItem> {}
