<script setup lang="ts">
import BouncyIconHeading from '@/components/BouncyIconHeading.vue';
import { useTitle } from '@vueuse/core'

const props = defineProps<{
  windowTitle: string
  viewTitle: string
  icon: string
}>()

const title = useTitle()
title.value = props.windowTitle
</script>

<template>
  <main class="flex flex-col gap-8">
    <BouncyIconHeading :title="viewTitle" :icon="icon" />
    <slot />
  </main>
</template>