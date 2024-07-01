import { computed, ref, unref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import usePaginationManager from '@/utils/paginationManager'
import useAxiosFetch from '@/utils/axiosFetch'

const defineItemsApiStore = <T>(storeId: string, baseUrl: string) => {
  const store = defineStore(storeId + "_pagedItemsStore", () => {

    const pager = usePaginationManager()
    const api = useAxiosFetch<T[]>(baseUrl)

    // state
    const items = ref<T[]>([]) as Ref<T[]>
    const filters = ref<Record<string, string | number | boolean>>({})

    // getters
    const itemCount = computed(() => items.value.length)
    const hasNextPage = computed(() => pager.hasNextPage(api.data.value?.length ?? 0))
    const filtersCount = computed(() => Object.keys(filters.value).length)

    // actions
    async function nextPage() {
      if (itemCount.value === 0) {
        await resetPage("flush")
        return
      }
      const moreItems = await api.fetch('GET', { ...pager.nextPage(), ...filters.value })
      if (!moreItems) {
        // do something with error
        pager.prevPage()
        return
      }
      items.value.push(...unref(moreItems))
    }

    async function resetPage(persistData: "flush" | "keep") {
      if (persistData === "keep" && itemCount.value > 0) {
        return
      }
      const firstItems = await api.fetch('GET', { ...pager.resetPage(), ...filters.value })
      if (!firstItems) {
        items.value = []
        // do something with error
        return
      }
      items.value = unref(firstItems)
    }

    return {
      // state
      items,
      filters,
      apiLoading: api.loading,
      apiFinished: api.finished,
      apiError: api.error,
      // getters
      itemCount,
      filtersCount,
      hasNextPage,
      // actions
      nextPage,
      resetPage,
    }
  })

  return store
}

export default defineItemsApiStore