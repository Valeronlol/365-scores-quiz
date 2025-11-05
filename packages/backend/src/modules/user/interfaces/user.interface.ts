import { CreateUserDto } from '@/modules/user/dto/create-user.dto'
import { UserEntity } from '@/modules/user/user.entity'
import { UserResponseDto } from '@/modules/user/dto/user-response.dto'

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserEntity>
  findById(id: string): Promise<UserEntity | null>
}

export interface IUserService {
  createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>
  getUserById(id: string): Promise<UserResponseDto>
}
