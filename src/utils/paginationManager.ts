const pageLimitDefault = 8
const pageDefault = 1

interface PagedRequest {
  _page: number
  _limit: number
}

const usePaginationManager = () => {
  const pageRequest: PagedRequest = {
    _page: pageDefault,
    _limit: pageLimitDefault,
  }

  const hasNextPage = (lastPageItemCount: number): boolean => {
    return lastPageItemCount === pageRequest._limit
  }

  const nextPage = (): PagedRequest => {
    pageRequest._page++
    return pageRequest
  }

  const prevPage = (): PagedRequest => {
    pageRequest._page--
    return pageRequest
  }

  const resetPage = (): PagedRequest => {
    pageRequest._page = pageDefault
    pageRequest._limit = pageLimitDefault
    return pageRequest
  }

  return { hasNextPage, nextPage, prevPage, resetPage }
}

export default usePaginationManager