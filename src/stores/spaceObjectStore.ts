import { defineStore } from 'pinia';
import useAxiosFetch from '@/utils/axiosFetch';
import definePaginatedItemsStore from '@/utils/paginatedItemsStore';
import type { SpaceObject, UserFavorite } from '@/types/data';

const baseUrl = 'https://localhost:7251/spaceobject'
const simulatedUniqueKeyForUser = 'd528bad2-5585-467f-8ded-93636075da9c'

const useItemsStore = definePaginatedItemsStore<SpaceObject & UserFavorite>(
  'spaceobjects',
  `${baseUrl}/u/${simulatedUniqueKeyForUser}`)

const favoriteApi = useAxiosFetch<null>(`${baseUrl}/favorite/${simulatedUniqueKeyForUser}`)

const updateFavorite = async (favId: number, httpMethod: 'PUT' | 'DELETE') => {
  const store = useItemsStore()
  const newValue = httpMethod === 'PUT'
  const restoreValue = store.items.find(i => i.id === favId)!.favorite
  store.items.find(i => i.id === favId)!.favorite = newValue
  const result = await favoriteApi.fetch(`/${favId}`, {
    method: httpMethod
  })
  if (!result.success) {
    store.items.find(i => i.id === favId)!.favorite = restoreValue
  }
}

const useExtendedStore = defineStore('spaceObjects', {
  state: () => ({
    apiError: favoriteApi.error,
    loading: favoriteApi.loading,
  }),
  actions: {
    async markAsFavorite(spaceObjectId: number) {
      await updateFavorite(spaceObjectId, 'PUT')
    },
    async unmarkAsFavorite(spaceObjectId: number) {
      await updateFavorite(spaceObjectId, 'DELETE')
    },
  }
})

const useSpaceItemStore = () => {
  return {
    list: useItemsStore(),
    favorite: useExtendedStore()
  }
}

export default useSpaceItemStore