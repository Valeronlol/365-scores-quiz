import { Observable } from 'rxjs'
import {
  Controller,
  Get,
  Sse,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common'
import type { IStatisticsService } from '@/modules/statistics/interfaces/statistics.interface'
import { StatisticsResponseDto } from '@/modules/statistics/dto/statistics-response.dto'
import {
  STATISTICS_NOTIFICATION_EVENT_NAME,
  STATISTICS_SERVICE_TOKEN,
} from '@/modules/statistics/statistics.constants'

@Controller('statistics')
export class StatisticsController {
  constructor(
    @Inject(STATISTICS_SERVICE_TOKEN)
    private readonly statisticsService: IStatisticsService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getStatistics(): Promise<StatisticsResponseDto> {
    return this.statisticsService.getStatistics()
  }

  @Sse('stream')
  stream(): Observable<MessageEvent> {
    return this.statisticsService.getEventStream(
      STATISTICS_NOTIFICATION_EVENT_NAME,
    )
  }
}
