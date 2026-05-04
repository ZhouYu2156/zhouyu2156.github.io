<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme'

defineProps<{
  members: {
    name: string
    avatar: string
    link: string
    title: string
    org: string
    orgLink: string
    desc: string
    links: { icon: string; link: string }[]
    sponsor: string
    actionText: string
  }[]
}>()
</script>

<template>
  <VPTeamMembers
    :members="members"
    :size="'small'" />
</template>
