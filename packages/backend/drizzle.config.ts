import { config } from 'dotenv'
import { env } from 'node:process'
import { defineConfig } from 'drizzle-kit';

config({
  path: `.env.${env.NODE_ENV || 'development'}`,
})

const url = `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT || 5432}/${env.POSTGRES_DB}`

export default defineConfig({
  out: './drizzle',
  schema: './src/core/database/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: { url },
});
