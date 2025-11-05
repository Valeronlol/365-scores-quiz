import { sql } from 'drizzle-orm'
import { pgTable, check, integer, text, bigint } from 'drizzle-orm/pg-core'
import { question } from '@/core/database/schema/question.schema'

export const answer = pgTable(
  'answer',
  {
    id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    questionId: bigint('question_id', { mode: 'number' })
      .references(() => question.id)
      .notNull(),
    content: text().notNull(),
    points: integer().notNull().default(0),
  },
  (table) => [check('points_positive_check', sql`${table.points} >= 0`)],
)
