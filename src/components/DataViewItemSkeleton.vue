<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>

<template>
  <div class="py-4 px-6">
    <Skeleton width="30%" height="3rem" />
    <Skeleton width="6rem" class="my-2" />
    <Skeleton width="80%" height="1rem" class="py-4 mb-2" />
    <div class="border-b-2 border-slate-300 dark:border-slate-600 " />
  </div>
</template>