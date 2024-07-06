<script setup lang="ts">
import { onMounted } from 'vue';
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import BalancedText from '@/components/BalancedText.vue';
import PagableContent from '@/components/PagableContent.vue';
import FlexColumNoOverflow from '@/components/FlexColumNoOverflow.vue';
import SomethingWrong from '@/components/SomethingWrong.vue';
import useSpaceItemStore from '@/stores/spaceObjectStore';
import ItemCountHeading from '@/components/ItemCountHeading.vue';
import SpaceObjectFilter from '@/components/SpaceObjectFilter.vue';
import SpaceObjectDataViewItem from '@/components/SpaceObjectDataViewItem.vue';
import DataViewItemSkeleton from '@/components/DataViewItemSkeleton.vue';
import SadSatellite from '@/components/SadSatellite.vue';

const store = useSpaceItemStore()

const loadNextPageItems = async () => await store.list.nextPage()
const reloadPageItems = async () => await store.list.resetPage('flush')

onMounted(async () => await store.list.resetPage('keep'))

const addFavorite = async (id: number) => {
  store.favorite.markAsFavorite(id)
}

const removeFavorite = async (id: number) => {
  store.favorite.unmarkAsFavorite(id)
}
</script>

<template>
  <Card>
    <template #title>
      <ItemCountHeading heading="Satellites, telescopes and more..." :item-count="store.list.itemCount" :all-items-shown="!store.list.hasNextPage" />
    </template>

    <template #content>
      <FlexColumNoOverflow>
        <BalancedText>
          NASA started launching stuff into space in 1958. This is a list of all those objects they've launched. Nasa was not the only one to launch something into
          space, but they
          were the first to do so.
          The Russians were the first to launch a satellite into space, but the Americans were the first to land on the moon.
        </BalancedText>
        <SpaceObjectFilter :filter="store.list.filters" @filter-changed="reloadPageItems" />
        <PagableContent :loading="store.list.apiLoading" :disabled="!store.list.hasNextPage" @load-more="loadNextPageItems" @reset-items="reloadPageItems">
          <DataView :value="store.list.items" data-key="id" :lazy="true">
            <template #list="slotProps">
              <SpaceObjectDataViewItem v-for="(item, index) in slotProps.items" :key="item.id" :item="item" :index="index" @favorite="addFavorite" @unfavorite="removeFavorite" />
              <div v-if="store.list.apiLoading">
                <DataViewItemSkeleton v-for="i in 3" :key="i" />
              </div>
            </template>
            <template #empty>
              <SadSatellite />
            </template>
          </dataview>
        </PagableContent>
      </FlexColumNoOverflow>
    </template>
  </Card>
  <SomethingWrong v-if="store.list.apiError" />
  <SomethingWrong v-if="store.favorite.apiError" />
</template>
