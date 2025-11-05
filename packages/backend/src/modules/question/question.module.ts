import { Module } from '@nestjs/common'
import { QuestionController } from '@/modules/question/question.controller'
import { QuestionService } from '@/modules/question/question.service'
import { QuestionRepository } from '@/modules/question/question.repository'
import {
  QUESTION_REPOSITORY_TOKEN,
  QUESTION_SERVICE_TOKEN,
} from '@/modules/question/question.constants'

@Module({
  controllers: [QuestionController],
  providers: [
    {
      provide: QUESTION_SERVICE_TOKEN,
      useClass: QuestionService,
    },
    {
      provide: QUESTION_REPOSITORY_TOKEN,
      useClass: QuestionRepository,
    },
  ],
})
export class QuestionModule {}
