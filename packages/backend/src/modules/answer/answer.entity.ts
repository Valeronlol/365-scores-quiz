import { z } from 'zod'
import { createSelectSchema } from 'drizzle-zod'
import { answer } from '@/core/database/schema/answer.schema'

const answerSchema = createSelectSchema(answer)

export type Answer = z.infer<typeof answerSchema>

export class AnswerEntity implements Answer {
  id: number
  content: string
  points: number
  questionId: number

  constructor(data: Answer) {
    Object.assign(this, data)
  }

  static fromDBMultiple(answers: Answer[]): AnswerEntity[] {
    return answers.map((answer) => new AnswerEntity(answer))
  }
}
