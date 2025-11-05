import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  url: `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT || 5432}/${env.POSTGRES_DB}`,
  minPoolCount: 4,
  maxPoolCount: 10,
}))
