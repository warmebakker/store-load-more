<script setup lang="ts">
import ViewLayout from '@/components/ViewLayout.vue';
import FilteredBlogPosts from '@/components/FilteredBlogPosts.vue';
</script>

<template>
  <ViewLayout window-title="Filtered data" view-title="Brand new data ready to be found" icon="iconify mdi--home-circle">
    <FilteredBlogPosts />
  </ViewLayout>
</template>
