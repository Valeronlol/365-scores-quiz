import { env } from 'node:process'
import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { ZodValidationPipe, ZodSerializerInterceptor } from 'nestjs-zod'
import { ConfigModule } from '@nestjs/config'
import mainConfig from '@/core/config/main'
import databaseConfig from '@/core/config/database'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { DatabaseModule } from '@/core/database/database.module'
import { SeedCommand } from '@/core/database/seeds/cli-seed.command'
import { UserModule } from '@/modules/user/user.module'
import { QuestionModule } from '@/modules/question/question.module'
import { StatisticsModule } from '@/modules/statistics/statistics.module'
import { HttpExceptionFilter } from '@/common/exceptions/http-exception'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${env.NODE_ENV || 'development'}`,
      load: [mainConfig, databaseConfig],
    }),
    DatabaseModule,
    UserModule,
    QuestionModule,
    StatisticsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    SeedCommand,
  ],
})
export class AppModule {}
