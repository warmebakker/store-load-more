<script setup lang="ts">
import ViewLayout from '@/components/ViewLayout.vue';
import FreshPaginatedComments from '@/components/FreshPaginatedComments.vue';
</script>

<template>
  <ViewLayout window-title="Fresh from the store" view-title="Paginated data fresh from the store" icon="iconify mdi--star-circle">
    <FreshPaginatedComments />
  </viewlayout>
</template>
