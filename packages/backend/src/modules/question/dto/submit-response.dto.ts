import { AnswerEntity } from '@/modules/answer/answer.entity'

export class SubmitResponseDto {
  id: number
  points: number

  constructor({ id, points }: AnswerEntity) {
    Object.assign(this, { id, points })
  }
}
