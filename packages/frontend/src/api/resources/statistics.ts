import { apiClient } from '@/api/http-client'

// Might be generated via OpenAPIv3/GraphQL/gRPC generators
export interface IStatisticsResponse {
  userId: string
  name?: string | null
  score: number
}

export const statisticsApi = {
  getStatistics: (): Promise<{ data: IStatisticsResponse[] }> => apiClient.get('/statistics'),
  getEventStream: (): EventSource => apiClient.sse('/statistics/stream'),
}
