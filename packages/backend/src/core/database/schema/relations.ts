import { relations } from 'drizzle-orm'
import { question } from '@/core/database/schema/question.schema'
import { answer } from '@/core/database/schema/answer.schema'

export const questionRelations = relations(question, ({ many }) => ({
  answers: many(answer),
}))

export const answerRelations = relations(answer, ({ one }) => ({
  question: one(question, {
    fields: [answer.questionId],
    references: [question.id],
  }),
}))
