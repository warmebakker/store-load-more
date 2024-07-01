<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button :class="['iconify flex justify-items-center', isDark ? 'mdi--moon-and-stars' : 'mdi--white-balance-sunny']" @click="toggleDark()" />
</template>
