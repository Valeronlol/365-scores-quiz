import { Inject, Injectable } from '@nestjs/common'
import { sql, eq, sum, desc, gt } from 'drizzle-orm'
import { type IStatisticsRepository } from '@/modules/statistics/interfaces/statistics.interface'
import { quizProgress, user } from '@/core/database/schema'
import { StatisticsEntity } from '@/modules/statistics/statistics.entity'
import { DB_TOKEN, type Database } from '@/core/database/database.module'

@Injectable()
export class StatisticsRepository implements IStatisticsRepository {
  constructor(@Inject(DB_TOKEN) private readonly db: Database) {}

  async findMany(limit: number = 1000): Promise<StatisticsEntity[]> {
    const result = await this.db
      .select({
        userId: quizProgress.userId,
        name: user.name,
        totalScore: sql<number>`sum(${quizProgress.score})`.mapWith(Number),
      })
      .from(quizProgress)
      .leftJoin(user, eq(quizProgress.userId, user.id))
      .having(gt(sum(quizProgress.score), 0))
      .groupBy(quizProgress.userId, user.name)
      .orderBy(desc(sum(quizProgress.score)))
      .limit(limit)

    return StatisticsEntity.fromDBMultiple(result)
  }
}
