import { apiClient } from '@/api/http-client'
import type { Answer } from '@/api/resources/answers'

// Might be generated via OpenAPIv3/GraphQL/gRPC generators
export interface Question {
  data: {
    id: number
    content: string
    answers: Answer[]
  }
}

// Might be generated via OpenAPIv3/GraphQL/gRPC generators
export interface SubmitQuestionResponse {
  id: string
  points: number
}

export const questionsApi = {
  getQuestion: (userId: string): Promise<Question> =>
    apiClient.get(`/questions/user/${userId}`),
  submitQuestion: (
    questionId: number,
    answerId: number,
    userId: string,
  ): Promise<SubmitQuestionResponse> =>
    apiClient.post(`/questions/${questionId}`, {
      answerId,
      userId,
    }),
}
