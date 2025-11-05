import { UserEntity } from '@/modules/user/user.entity'

export class UserResponseDto {
  id: string
  name: string | null

  constructor(entity: UserEntity) {
    this.id = entity.id
    this.name = entity.name
  }
}
