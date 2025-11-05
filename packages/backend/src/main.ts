import { env } from 'node:process'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(env.GLOBAL_API_PREFIX || '/api/v1')
  await app.listen(env.PORT || 4000)
}
bootstrap()
