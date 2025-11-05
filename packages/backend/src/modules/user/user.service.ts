import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import {
  type IUserRepository,
  type IUserService,
} from '@/modules/user/interfaces/user.interface'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'
import { UserResponseDto } from '@/modules/user/dto/user-response.dto'
import { USER_REPOSITORY_TOKEN } from '@/modules/user/user.constants'

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.create(createUserDto)

    return new UserResponseDto(user)
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return new UserResponseDto(user)
  }
}
