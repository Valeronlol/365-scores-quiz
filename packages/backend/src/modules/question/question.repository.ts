import { Inject, Injectable } from '@nestjs/common'
import { sql, asc, eq, and, not, inArray } from 'drizzle-orm'
import { QuestionEntity } from '@/modules/question/question.entity'
import { DB_TOKEN, type Database } from '@/core/database/database.module'
import { IQuestionRepository } from '@/modules/question/interfaces/question.interface'
import { answer } from '@/core/database/schema/answer.schema'
import { AnswerEntity } from '@/modules/answer/answer.entity'
import { question, quizProgress } from '@/core/database/schema'

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  constructor(@Inject(DB_TOKEN) private readonly db: Database) {}

  findQuestionWithAnswers(userId: string): Promise<QuestionEntity | null> {
    return this.db.transaction(async (tx) => {
      const isProgressQuestions = await tx
        .select({ questionId: quizProgress.questionId })
        .from(quizProgress)
        .where(
          and(
            eq(quizProgress.userId, userId),
            eq(quizProgress.isAnswered, true),
          ),
        )

      const isProgressIds = isProgressQuestions.map(
        ({ questionId }) => questionId,
      )
      const currentQuestion = await tx.query.question.findFirst({
        orderBy: sql`RANDOM()`,
        where: not(inArray(question.id, isProgressIds)),
        with: {
          answers: {
            orderBy: sql`RANDOM()`,
          },
        },
      })

      if (!currentQuestion) {
        return null
      }

      await tx
        .insert(quizProgress)
        .values({ questionId: currentQuestion.id, userId })
        .onConflictDoNothing()

      return new QuestionEntity(currentQuestion)
    })
  }

  async submit(
    userId: string,
    answerId: number,
    questionId: number,
  ): Promise<AnswerEntity | null> {
    const currentAnswer = await this.db.query.answer.findFirst({
      where: eq(answer.id, answerId),
    })

    if (!currentAnswer) {
      return null
    }

    await this.db
      .update(quizProgress)
      .set({
        isAnswered: true,
        score: currentAnswer.points,
      })
      .where(
        and(
          eq(quizProgress.questionId, questionId),
          eq(quizProgress.userId, userId),
        ),
      )

    return new AnswerEntity(currentAnswer)
  }
}
