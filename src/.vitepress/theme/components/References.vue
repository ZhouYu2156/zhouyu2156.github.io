<script setup lang="ts">
import { PropType } from 'vue'
import type { ReferenceItems } from '../../configuration/'

const props = defineProps({
  items: {
    type: Array as PropType<ReferenceItems>,
    required: true,
  },
})
</script>

<template>
  <div class="table">
    <div style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap">
      <a
        v-for="item in props.items"
        :key="item.id"
        :href="item.link"
        style="
          max-width: fit-content;
          min-width: 80px;
          height: 120px;
          border: 1px solid lightblue;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          text-decoration: none;
          margin: 5px;
          padding: 2px 3px;
        "
        target="_blank">
        <span style="padding: 2px 5px">{{ item.title }}</span>
        <span>
          <img :src="item.icon" :alt="item.title" width="50" />
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped></style>
