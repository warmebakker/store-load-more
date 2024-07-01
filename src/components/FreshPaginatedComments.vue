<script setup lang="ts">
import { onMounted } from 'vue';
import type { Comment } from '@/types/data';
import Card from 'primevue/card';
import BalancedText from '@/components/BalancedText.vue';
import PagableContent from '@/components/PagableContent.vue';
import FlexColumNoOverflow from '@/components/FlexColumNoOverflow.vue';
import SomethingWrong from '@/components/SomethingWrong.vue';
import defineItemsApiStore from '@/utils/pageAndFilterItemsStore';
import ItemCountHeading from '@/components/ItemCountHeading.vue';

const store = defineItemsApiStore<Comment>(
  'posts-comments',
  'https://jsonplaceholder.typicode.com/posts')
  ()

const loadNextPageItems = async () => await store.nextPage()
const reloadPageItems = async () => await store.resetPage('flush')

onMounted(async () => await store.resetPage('keep'))
</script>

<template>
  <Card>
    <template #title>
      <ItemCountHeading heading="No filters just jet" :item-count="store.itemCount" :all-items-shown="!store.hasNextPage" />
    </template>

    <template #content>
      <FlexColumNoOverflow>
        <BalancedText>
          Showcasing a straight forward implementation of pagination with a 'load more' button, vissible below the items. Keep hitting that button until you've found
          what you came here for!
        </BalancedText>
        <PagableContent :loading="store.apiLoading" :disabled="!store.hasNextPage" @load-more="loadNextPageItems" @reset-items="reloadPageItems">
          <pre class="text-sm">{{ store.items }}</pre>
        </PagableContent>
      </FlexColumNoOverflow>
    </template>
  </Card>
  <SomethingWrong v-if="store.apiError" />
</template>
