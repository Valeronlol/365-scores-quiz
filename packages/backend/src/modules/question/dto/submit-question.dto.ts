import { z } from 'zod'
import { createZodDto } from 'nestjs-zod'

const SubmitSchema = z.object({
  answerId: z.number(),
  userId: z.uuid(),
})

export class SubmitDto extends createZodDto(SubmitSchema) {}
