import { AnswerEntity } from '@/modules/answer/answer.entity'

export class AskedAnswerResponseDto {
  id: number
  content: string

  constructor(entity: AnswerEntity) {
    this.id = entity.id
    this.content = entity.content
  }

  static fromEntity(entity: AnswerEntity): AskedAnswerResponseDto {
    return new AskedAnswerResponseDto(entity)
  }

  static fromEntities(entities: AnswerEntity[] = []): AskedAnswerResponseDto[] {
    return entities.map((entity) => new AskedAnswerResponseDto(entity))
  }
}
