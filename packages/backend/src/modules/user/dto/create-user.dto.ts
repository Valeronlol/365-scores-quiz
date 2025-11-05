import { createZodDto } from 'nestjs-zod'
import { createInsertSchema } from 'drizzle-zod'
import { user } from '@/core/database/schema/user.schema'

const createUserSchema = createInsertSchema(user, {
  name: (schema) => schema.max(255).optional(),
})

export class CreateUserDto extends createZodDto(createUserSchema) {}
