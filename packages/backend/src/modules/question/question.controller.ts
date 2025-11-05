import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import type { IQuestionService } from '@/modules/question/interfaces/question.interface'
import { QuestionResponseDto } from '@/modules/question/dto/question-response.dto'
import { QUESTION_SERVICE_TOKEN } from '@/modules/question/question.constants'
import { SubmitResponseDto } from '@/modules/question/dto/submit-response.dto'
import { SubmitDto } from '@/modules/question/dto/submit-question.dto'

@Controller('questions')
export class QuestionController {
  constructor(
    @Inject(QUESTION_SERVICE_TOKEN)
    private readonly questionService: IQuestionService,
  ) {}

  @Get('/user/:user_id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('user_id') userId: string): Promise<QuestionResponseDto> {
    return this.questionService.getQuestionByUser(userId)
  }

  @Post('/:question_id')
  @HttpCode(HttpStatus.CREATED)
  submit(
    @Param('question_id') questionId: string,
    @Body() dto: SubmitDto,
  ): Promise<SubmitResponseDto> {
    return this.questionService.submitQuestion(Number(questionId), dto)
  }
}
