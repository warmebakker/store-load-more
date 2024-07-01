<script setup lang="ts">

const props = defineProps<{
  title: string;
  icon: string;
}>()
</script>

<template>
  <h1 class="flex place-items-center gap-2 text-3xl font-semibold">
    <span :class="props.icon" class="opacity-90" />
    {{ props.title }}
  </h1>
  <div :class="props.icon" class="absolute fade-in text-3xl -z-40" />
</template>

<style scoped>
.fade-in {
  animation: fadeInBounce .5s ease forwards;
}

@keyframes fadeInBounce {
  0% {
    opacity: 0;
    transform: rotate(15deg) scale(2);
  }

  70% {
    opacity: 0.05;
    transform: rotate(-45deg) scale(11);
  }

  100% {
    opacity: 0.15;
    transform: rotate(-10deg) scale(9);
  }
}
</style>