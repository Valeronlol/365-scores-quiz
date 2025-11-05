import { sql } from 'drizzle-orm'
import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: uuid()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: varchar({ length: 255 }),
})
