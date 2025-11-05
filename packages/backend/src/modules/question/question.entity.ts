import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { question } from '@/core/database/schema/question.schema'
import { Answer, AnswerEntity } from '@/modules/answer/answer.entity'

const questionSchema = createSelectSchema(question)

export type Question = z.infer<typeof questionSchema>

export type QuestionWithAnswers = Question & {
  answers: Answer[]
}

export class QuestionEntity implements Question {
  id: number
  content: string
  answers: AnswerEntity[] = []

  constructor({ id, content, answers }: QuestionWithAnswers) {
    Object.assign(this, { id, content })
    this.answers = AnswerEntity.fromDBMultiple(answers)
  }
}
