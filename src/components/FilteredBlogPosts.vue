<script setup lang="ts">
import { onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import SomethingWrong from '@/components/SomethingWrong.vue'
import BlogPostFilter from '@/components/BlogPostFilter.vue';
import FlexColumNoOverflow from '@/components/FlexColumNoOverflow.vue';
import BalancedText from '@/components/BalancedText.vue';
import PagableContent from '@/components/PagableContent.vue';
import ItemCountHeading from '@/components/ItemCountHeading.vue';
import useEnrichedBlogpostStore from '@/stores/enrichedBlogpostApiStore';

const store = useEnrichedBlogpostStore()

const fetchItems = async () => await store.blogPostList.nextPage()
const filterChange = async () => await store.blogPostList.resetPage('flush')
onMounted(async () => await store.blogPostList.resetPage('keep'))
</script>

<template>
  <Card>
    <template #title>
      <ItemCountHeading heading="Stop scrolling — just filter that data!" :item-count="store.blogPostList.itemCount" :all-items-shown="!store.blogPostList.hasNextPage" />
    </template>

    <template #content>
      <FlexColumNoOverflow>
        <BalancedText>
          <p>
            Whitness this demonstartion of a Pinia store implementation for data persistencs, combined with pagination and filtering. The filter should help find what you're
            looking
            for, faster! The button to load the next set of records can be found below the items. And don't worry — the configured filter and data are stll here after visiting one
            of the other
            pages.
          </p>
          <p class="pt-4">
            Besides the generic store for the list of items, the store keeps track of additional state (a 'count'). The additional state can access the list items state,
            demonstarted by the 'add items count'.
          </p>
          <div class="flex items-center gap-2">
            <h2 class="font-bold">
              total x 3 = <span class="underline">{{ store.totals.tripleCount }}</span>
            </h2>
            <Button text label="Decrement 3" @click="store.totals.decrement" />
            <Button text label="Add items #" @click="store.totals.addBlogPostItemsCount" />
          </div>
        </BalancedText>
        <BlogPostFilter :filter="store.blogPostList.filters" @filter-changed="filterChange" />
        <PagableContent :loading="store.blogPostList.apiLoading" :disabled="!store.blogPostList.hasNextPage" @load-more="fetchItems" @reset-items="filterChange">
          <pre class="text-sm">{{ store.blogPostList.items }}</pre>
        </PagableContent>
      </FlexColumNoOverflow>
    </template>
  </Card>
  <SomethingWrong v-if="store.blogPostList.apiError" />
</template>
