import { StatisticsEntity } from '@/modules/statistics/statistics.entity'

export interface IStatisticsResponse {
  userId: string
  name?: string | null
  score: number
}

export class StatisticsResponseDto {
  data: IStatisticsResponse[] = []

  constructor(entities: StatisticsEntity[]) {
    for (const entity of entities) {
      this.data.push({
        userId: entity.userId,
        name: entity.name,
        score: entity.totalScore || 0,
      })
    }
  }
}
