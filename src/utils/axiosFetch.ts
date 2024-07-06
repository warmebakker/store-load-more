import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import type { ProblemDetailsRfc7807 } from '@/types/ProblemDetailsRfc7807';
import toastsBus from '@/utils/toasting';

const unknownError = (status: number): ProblemDetailsRfc7807 => {
  return {
    title: 'Something went wrong',
    detail: `with code: ${status}`,
    status: status,
    errors: {},
    instance: '',
    type: ''
  }
};

const emitErrorToast = (title: string, details: string) => {
  toastsBus.emit({
    options: {
      severity: 'error',
      summary: title,
      detail: details,
      life: 5000,
    }
  });
}

/* 
 * Axios: Any status codes that falls outside the range of 2xx cause this function to trigger
 */
const rejectedInterceptor = (error: AxiosError) => {
  if (!error.response)
    error.response = {} as AxiosResponse;

  if (!error.response.data) {
    error.response.data = unknownError(error.response.status || -9_999);
  }

  const problem = error.response.data as ProblemDetailsRfc7807;

  if (!problem.title || !problem.detail || !problem.status) {
    // spread unknown error into problem
    Object.assign(problem, unknownError(error.response.status || -9_999));
  }

  emitErrorToast(problem.title, problem.detail);
  return Promise.reject(error);
}

type FetchResult<T> = {
  success: boolean,
  data: T | undefined
}

const useAxiosFetch = <TResult>(baseUrl: string) => {
  const fetcher = axios.create({ baseURL: baseUrl })
  fetcher.interceptors.response.use(null, rejectedInterceptor);
  const reactiveApi = useAxios<TResult>(fetcher)

  const fetch = async<TReqest>(
    url: string,
    config?: AxiosRequestConfig<TReqest>
  ): Promise<FetchResult<TResult | undefined>> => {
    try {
      if (reactiveApi.isLoading.value) {
        emitErrorToast('Request in progress', 'Please wait for the current request to finish');
        return { success: false, data: undefined }
      }

      const result = await reactiveApi.execute(url, config)
      return {
        success: result.error.value == null,
        data: result.data.value
      }
    } catch (error) {
      // Try to handle the error gracefully if it is a problem-detail
      reactiveApi.error.value = (error as AxiosError)?.response?.data as ProblemDetailsRfc7807 ?? undefined
      if (reactiveApi.error.value) {
        return {
          success: false,
          data: undefined
        }
      }
      throw error
    }
  }

  return {
    data: reactiveApi.data,
    loading: reactiveApi.isLoading,
    finished: reactiveApi.isFinished,
    error: reactiveApi.error,
    fetch: fetch
  }
}

export default useAxiosFetch