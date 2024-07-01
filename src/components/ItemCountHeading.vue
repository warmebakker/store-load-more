<script setup lang="ts">
const props = defineProps<{
  heading: string
  itemCount: number
  allItemsShown: boolean
}>()
</script>

<template>
  <div class="flex flex-wrap justify-between items-baseline">
    <h2>{{ props.heading }}</h2>
    <div class="text-sm">
      Showing {{ props.itemCount }} <span v-if="props.allItemsShown"> of {{ props.itemCount }}</span>
      items
    </div>
  </div>
</template>