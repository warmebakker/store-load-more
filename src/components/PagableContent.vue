<script setup lang="ts">
import Button from 'primevue/button';

const props = defineProps<{
  loading: boolean
  disabled: boolean
}>()

const emits = defineEmits(['load-more', 'reset-items'])
</script>

<template>
  <slot />

  <div class="flex gap-4 p-1">
    <Button class="flex-grow" label="Load More" :loading="props.loading" :disabled="props.disabled" @click="emits('load-more')" />
    <Button outlined :loading="props.loading" @click="emits('reset-items')">
      <span class="iconify mdi--reload scale-150" />
    </Button>
  </div>
</template>