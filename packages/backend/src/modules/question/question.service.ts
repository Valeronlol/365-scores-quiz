import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import type {
  IStatisticsEventPayload,
  IQuestionRepository,
  IQuestionService,
} from '@/modules/question/interfaces/question.interface'
import { QuestionResponseDto } from '@/modules/question/dto/question-response.dto'
import { QUESTION_REPOSITORY_TOKEN } from '@/modules/question/question.constants'
import { SubmitResponseDto } from '@/modules/question/dto/submit-response.dto'
import { SubmitDto } from '@/modules/question/dto/submit-question.dto'
import { STATISTICS_NOTIFICATION_EVENT_NAME } from '../statistics/statistics.constants'

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getQuestionByUser(userId: string): Promise<QuestionResponseDto> {
    const question = await this.questionRepository.findQuestionWithAnswers(userId)

    if (!question) {
      const payload: IStatisticsEventPayload = { userId }
      await this.eventEmitter.emitAsync(
        STATISTICS_NOTIFICATION_EVENT_NAME,
        payload,
      )
    }

    return new QuestionResponseDto(question)
  }

  async submitQuestion(
    questionId: number,
    { answerId, userId }: SubmitDto,
  ): Promise<SubmitResponseDto> {
    const response = await this.questionRepository.submit(
      userId,
      answerId,
      questionId,
    )

    if (!response) {
      throw new NotFoundException("Can't submit answer")
    }

    return new SubmitResponseDto(response)
  }

  @OnEvent(STATISTICS_NOTIFICATION_EVENT_NAME)
  handleOrderCreatedEvent({ userId }: IStatisticsEventPayload) {
    // TODO It's written in the task, "If the user’s score qualifies for the top 100, it is ​​immediately added​ ​to the table​​." 
    // I'm not sure what it meant, what table should we update? Because every time enybody completes a quiz, the entire Finish page table is updated.
    // Anyway this is good place for this custom logic.
  }
}
