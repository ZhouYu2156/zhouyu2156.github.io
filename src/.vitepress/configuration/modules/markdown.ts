import { MarkdownOptions } from 'vitepress'

export const markdown: MarkdownOptions = {
  lineNumbers: true, // 开启行数显示
  container: {
    tipLabel: '提示：',
    warningLabel: '注意：',
    dangerLabel: '危险：',
    infoLabel: '说明：',
    detailsLabel: '详情：',
  },
  image: {
    // 默认禁用图片懒加载
    lazyLoading: true,
  },
  codeCopyButtonTitle: '复制',
}
