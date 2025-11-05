import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { user } from '@/core/database/schema/user.schema'

const userSchema = createSelectSchema(user)

export type User = z.infer<typeof userSchema>

export class UserEntity implements User {
  id: string
  name: string | null

  constructor(data: User) {
    Object.assign(this, data)
  }
}
