import { Module } from '@nestjs/common'
import { StatisticsController } from '@/modules/statistics/statistics.controller'
import { StatisticsService } from '@/modules/statistics/statistics.service'
import { StatisticsRepository } from '@/modules/statistics/statistics.repository'
import {
  STATISTICS_REPOSITORY_TOKEN,
  STATISTICS_SERVICE_TOKEN,
} from '@/modules/statistics/statistics.constants'

@Module({
  controllers: [StatisticsController],
  providers: [
    {
      provide: STATISTICS_SERVICE_TOKEN,
      useClass: StatisticsService,
    },
    {
      provide: STATISTICS_REPOSITORY_TOKEN,
      useClass: StatisticsRepository,
    },
  ],
})
export class StatisticsModule {}
