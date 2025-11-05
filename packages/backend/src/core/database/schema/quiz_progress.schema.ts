import { sql } from 'drizzle-orm'
import {
  pgTable,
  check,
  primaryKey,
  bigint,
  uuid,
  integer,
  boolean,
} from 'drizzle-orm/pg-core'
import { user } from '@/core/database/schema/user.schema'
import { question } from '@/core/database/schema/question.schema'

export const quizProgress = pgTable(
  'quiz_progress',
  {
    userId: uuid('user_id')
      .references(() => user.id)
      .notNull(),
    questionId: bigint('question_id', { mode: 'number' })
      .references(() => question.id)
      .notNull(),
    score: integer().notNull().default(0),
    isAnswered: boolean('is_answered').notNull().default(false),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.questionId] }),
    check('score_positive_check', sql`${table.score} >= 0`),
  ],
)
