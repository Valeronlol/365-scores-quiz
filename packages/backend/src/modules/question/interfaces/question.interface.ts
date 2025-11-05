import { QuestionResponseDto } from '@/modules/question/dto/question-response.dto'
import { QuestionEntity } from '@/modules/question/question.entity'
import { SubmitResponseDto } from '@/modules/question/dto/submit-response.dto'
import { AnswerEntity } from '@/modules/answer/answer.entity'
import { SubmitDto } from '@/modules/question/dto/submit-question.dto'

export interface IQuestionRepository {
  findQuestionWithAnswers(userId: string): Promise<QuestionEntity | null>
  submit(
    userId: string,
    answerId: number,
    questionId: number,
  ): Promise<AnswerEntity | null>
}

export interface IQuestionService {
  getQuestionByUser(userId: string): Promise<QuestionResponseDto>
  submitQuestion(questionId: number, dto: SubmitDto): Promise<SubmitResponseDto>
}

export interface IStatisticsEventPayload {
  userId: string
}
