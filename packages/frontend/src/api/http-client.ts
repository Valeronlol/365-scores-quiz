import { API_PREFIX } from '@/constants'

const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  // JWT auth can be added here, like: `Bearer ${localStorage.getItem(AUTH_KEY)}`
})

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.text().catch(() => null)
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorData || response.statusText}`,
    )
  }

  const contentLength = response.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > 0) {
    return response.json()
  }

  return {} as T
}

const buildUrl = (endpoint: string): string => {
  endpoint = endpoint.replace(/^\/+/, '')
  return `${API_PREFIX}/${endpoint}`
}

export const apiClient = {
  get: async <T>(url: string, options?: RequestInit): Promise<T> => {
    const fullUrl = buildUrl(url)
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: getDefaultHeaders(),
      ...options,
    })

    return handleResponse<T>(response)
  },

  post: async <T>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ): Promise<T> => {
    const fullUrl = buildUrl(url)
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })

    return handleResponse<T>(response)
  },

  put: async <T>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ): Promise<T> => {
    const fullUrl = buildUrl(url)
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: getDefaultHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })

    return handleResponse<T>(response)
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ): Promise<T> => {
    const fullUrl = buildUrl(url)
    const response = await fetch(fullUrl, {
      method: 'PATCH',
      headers: getDefaultHeaders(),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })

    return handleResponse<T>(response)
  },

  delete: async <T>(url: string, options?: RequestInit): Promise<T> => {
    const fullUrl = buildUrl(url)
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: getDefaultHeaders(),
      ...options,
    })

    return handleResponse<T>(response)
  },

  sse: (url: string): EventSource => {
    const fullUrl = buildUrl(url)
    return new EventSource(fullUrl)
  },
}
