import { Observable } from 'rxjs'
import { StatisticsEntity } from '@/modules/statistics/statistics.entity'
import { StatisticsResponseDto } from '@/modules/statistics/dto/statistics-response.dto'

export interface IStatisticsRepository {
  findMany(limit?: number): Promise<StatisticsEntity[]>
}

export interface IStatisticsService {
  getStatistics(): Promise<StatisticsResponseDto>
  getEventStream(eventName: string): Observable<MessageEvent>
}
