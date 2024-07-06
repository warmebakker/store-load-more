const pageLimitDefault = 5
const pageDefault = 0

interface PagedRequest {
  pageIndex: number
  pageSize: number
}

const paginatedItemsManager = () => {
  const pageRequest: PagedRequest = {
    pageIndex: pageDefault,
    pageSize: pageLimitDefault,
  }

  const hasNextPage = (lastPageItemCount: number): boolean => {
    return lastPageItemCount === pageRequest.pageSize
  }

  const nextPage = (): PagedRequest => {
    pageRequest.pageIndex++
    return pageRequest
  }

  const prevPage = (): PagedRequest => {
    pageRequest.pageIndex--
    return pageRequest
  }

  const resetPage = (): PagedRequest => {
    pageRequest.pageIndex = pageDefault
    pageRequest.pageSize = pageLimitDefault
    return pageRequest
  }

  return { hasNextPage, nextPage, prevPage, resetPage }
}

export default paginatedItemsManager