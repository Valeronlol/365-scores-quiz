import { pgTable, text, bigint } from 'drizzle-orm/pg-core'

export const question = pgTable('question', {
  id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  content: text().notNull(),
})
