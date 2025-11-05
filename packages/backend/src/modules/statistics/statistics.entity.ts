import { z } from 'zod'
import { createSelectSchema } from 'drizzle-zod'
import { quizProgress } from '@/core/database/schema/quiz_progress.schema'

const quizProgressSchema = createSelectSchema(quizProgress)

export type QuizProgress = z.infer<typeof quizProgressSchema>

export class StatisticsEntity implements Pick<QuizProgress, 'userId'> {
  userId: string
  name: string | null
  totalScore?: number

  constructor(data: Partial<StatisticsEntity>) {
    Object.assign(this, data)
  }

  static fromDBMultiple(
    dbData: Partial<StatisticsEntity>[],
  ): StatisticsEntity[] {
    return dbData.map((data) => new StatisticsEntity(data))
  }
}
