import type { BlogPost } from '@/types/data';
import defineItemsApiStore from '@/utils/pageAndFilterItemsStore';
import { defineStore } from 'pinia';

const useBaseStore = defineItemsApiStore<BlogPost>(
  'blog-posts',
  'https://jsonplaceholder.typicode.com/posts')

const useExtendedStore = defineStore('extended', {
  state: () => ({
    grandTotal: 0,
  }),
  getters: {
    tripleCount: (state) => state.grandTotal * 3
  },
  actions: {
    decrement() {
      this.grandTotal--
    },
    addBlogPostItemsCount() {
      const base = useBaseStore()
      const total = base.itemCount
      this.grandTotal += total
    },
    removeBlogPost(id: number) {
      const base = useBaseStore()
      base.items = base.items.filter(item => item.id !== id)
    }
  },
});

const useEnrichedBlogpostStore = () => {
  return {
    blogPostList: useBaseStore(),
    totals: useExtendedStore()
  }
}

export default useEnrichedBlogpostStore