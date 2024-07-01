import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const useAxiosFetch = <T>(baseUrl: string) => {
  const api = useAxios<T>(axios.create({
    baseURL: baseUrl
  }))

  const fetchWithQueryPrams = async (method: 'GET' | 'PUT' | 'POST', params: object): Promise<T | undefined> => {
    const result = await api.execute('', { method, params: { ...params } })
    if (result.error.value || !result.data?.value) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data', result.error.value);
      // eslint-disable-next-line no-alert
      alert('Error fetching data')
      return undefined
    }
    return result.data.value
  }

  return {
    data: api.data,
    loading: api.isLoading,
    finished: api.isFinished,
    error: api.error,
    fetch: fetchWithQueryPrams
  }
}

export default useAxiosFetch