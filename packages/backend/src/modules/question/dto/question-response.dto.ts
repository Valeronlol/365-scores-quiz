import { AskedAnswerResponseDto } from '@/modules/answer/dto/asked-answer-response.dto'
import { QuestionEntity } from '@/modules/question/question.entity'

interface IQuestionResponseData {
  id: number
  content: string
  answers: AskedAnswerResponseDto[]
}

export class QuestionResponseDto {
  data: IQuestionResponseData | null = null

  constructor(entity?: QuestionEntity | null) {
    if (entity) {
      this.data = {
        id: entity.id,
        content: entity.content,
        answers: AskedAnswerResponseDto.fromEntities(entity.answers),
      }
    }
  }
}
