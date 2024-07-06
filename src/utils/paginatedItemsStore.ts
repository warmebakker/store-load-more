import { computed, ref, unref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import paginatedItemsManager from '@/utils/paginatedItemsManager'
import useAxiosFetch from '@/utils/axiosFetch'
import type { PaginatedResponse } from '@/types/data'

export type Filter = string | number | boolean

const definePaginatedItemsStore = <T>(storeId: string, baseUrl: string) => {
  const store = defineStore(storeId + "_paginatedItemsStore", () => {

    const pager = paginatedItemsManager()
    const api = useAxiosFetch<PaginatedResponse<T>>(baseUrl)

    // state
    const items = ref<T[]>([]) as Ref<T[]>
    const filters = ref<Record<string, Filter>>({})

    // getters
    const itemCount = computed(() => items.value.length)
    const hasNextPage = computed(() => pager.hasNextPage(api.data.value?.items.length ?? 0))
    const filtersCount = computed(() => Object.keys(filters.value).length)

    // actions
    async function nextPage() {
      if (itemCount.value === 0) {
        await resetPage("flush")
        return
      }
      const result = await api.fetch('', { method: 'GET', params: { ...pager.nextPage(), ...filters.value } })
      result.success && result.data
        ? items.value.push(...unref(result.data.items))
        : pager.prevPage()
    }

    async function resetPage(persistData: "flush" | "keep") {
      if (persistData === "keep" && itemCount.value > 0) {
        return
      }
      const result = await api.fetch('', { method: 'GET', params: { ...pager.resetPage(), ...filters.value } })
      result.success && result.data
        ? items.value = unref(result.data.items)
        : pager.prevPage()
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

export default definePaginatedItemsStore