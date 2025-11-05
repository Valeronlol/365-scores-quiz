import { apiClient } from '@/api/http-client'

// Might be generated via OpenAPIv3/GraphQL/gRPC generators
export interface User {
  id: string
  name?: string
}

export const usersApi = {
  createUser: (user: Pick<User, 'name'>): Promise<User> =>
    apiClient.post('/users', user),
}
