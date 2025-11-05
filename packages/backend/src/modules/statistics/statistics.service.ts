import { Observable, fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import { Injectable, Inject } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
  type IStatisticsRepository,
  type IStatisticsService,
} from '@/modules/statistics/interfaces/statistics.interface'
import { StatisticsResponseDto } from '@/modules/statistics/dto/statistics-response.dto'
import { STATISTICS_REPOSITORY_TOKEN } from '@/modules/statistics/statistics.constants'

@Injectable()
export class StatisticsService implements IStatisticsService {
  constructor(
    @Inject(STATISTICS_REPOSITORY_TOKEN)
    private readonly statisticsRepository: IStatisticsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getStatistics(): Promise<StatisticsResponseDto> {
    const data = await this.statisticsRepository.findMany()
    return new StatisticsResponseDto(data)
  }

  getEventStream(eventName: string): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, eventName).pipe(
      map(
        (data: unknown) =>
          new MessageEvent(eventName, {
            data: JSON.stringify(data),
          }),
      ),
    )
  }
}
