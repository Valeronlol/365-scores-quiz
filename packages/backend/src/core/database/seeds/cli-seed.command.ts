import { exit } from 'node:process'
import { Inject } from '@nestjs/common'
import { Command, CommandRunner } from 'nest-commander'
import { Logger } from '@nestjs/common'
import { type Database, DB_TOKEN } from '@/core/database/database.module'
import * as schema from '@/core/database/schema'
import { mockData } from '@/core/database/seeds/mock.data'

@Command({
  name: 'content',
  description: 'Seed database with initial data',
})
export class SeedCommand extends CommandRunner {
  private readonly logger: Logger
  private readonly possiblePoints: number[]

  constructor(@Inject(DB_TOKEN) private readonly db: Database) {
    super()
    this.logger = new Logger(SeedCommand.name)
    this.possiblePoints = [1, 3, 5, 7, 10]
  }

  async run() {
    try {
      await this.db.transaction(async (tx) => {
        for (const { question, answers } of mockData) {
          const [questionResult] = await tx
            .insert(schema.question)
            .values({ content: question })
            .returning()

          for (const { content, isCorrect } of answers) {
            const points = isCorrect ? this.getRandPoint() : 0
            await tx.insert(schema.answer).values({
              questionId: questionResult.id,
              content,
              points,
            })
          }
        }
      })
    } catch (e) {
      this.logger.error(`Migration failed: ${e}`)
      return
    }

    this.logger.log('Migration completed successfully')
    exit(0)
  }

  private getRandPoint(): number {
    return this.possiblePoints[
      Math.floor(Math.random() * this.possiblePoints.length)
    ]
  }
}
