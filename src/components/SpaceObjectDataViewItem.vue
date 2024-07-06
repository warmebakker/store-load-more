<script setup lang="ts">
import type { SpaceObject, UserFavorite } from '@/types/data'
import Tag from 'primevue/tag'

const props = defineProps<{
  item: SpaceObject & UserFavorite
  index: number
}>()

interface Emits {
  (event: 'favorite', id: number): void;
  (event: 'unfavorite', id: number): void;
}
const emits = defineEmits<Emits>()
const favorite = () => emits('favorite', props.item.id)
const unfavorite = () => emits('unfavorite', props.item.id)

const toggleFavi = () => {
  props.item.favorite ? unfavorite() : favorite()
}
</script>

<template>
  <div class="py-4 px-6">
    <div class="flex justify-between ">
      <h1 class="text-3xl font-bold">
        <span class="font-thin pr-4"># {{ props.index + 1 }}</span>
        {{ item.name }}
      </h1>
      <a v-ripple class="p-2 cursor-pointer" :class="{ 'opacity-30': !$props.item.favorite }" @click="toggleFavi">
        <i :class="['text-2xl iconify', props.item.favorite ? 'mdi--star' : 'mdi--star-outline']" />
      </a>
    </div>
    <div class="pt-2 flex justify-between">
      <Tag>Launch: {{ item.launchYear }}</Tag>
      <Tag severity="info" class="opacity-60">Id: {{ item.id }}</Tag>
    </div>
    <p class="py-4 mb-2 truncate">{{ item.objectiveSummary }}</p>
    <div class="border-b-2 border-slate-300 dark:border-slate-600 " />
  </div>
</template>