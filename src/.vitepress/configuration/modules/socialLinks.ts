interface SocialLink {
  icon: SocialLinkIcon
  link: string
  ariaLabel?: string
}

type SocialLinkIcon =
  | 'discord'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'mastodon'
  | 'npm'
  | 'slack'
  | 'twitter'
  | 'x'
  | 'youtube'
  | { svg: string }

export const socialLinks: SocialLink[] = [
  {
    icon: {
      svg: '<img class="social-link-icon" src="/social-icons/gitee.svg">',
    },
    link: 'https://gitee.com/zhouyu2156',
  },
  {
    icon: {
      svg: '<img class="social-link-icon" src="/social-icons/github.svg">',
    },
    link: 'https://github.com/ZhouYu2156',
  },
  {
    icon: {
      svg: '<img class="social-link-icon" src="/social-icons/fish.png">',
    },
    link: 'https://www.zhouyu2156.cn/Programming/',
  },
  {
    icon: {
      svg: '<img class="social-link-icon" src="/social-icons/bilibili.svg">',
    },
    link: 'https://space.bilibili.com/431828034',
  },
]
