import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common'
import type { IUserService } from '@/modules/user/interfaces/user.interface'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'
import { UserResponseDto } from '@/modules/user/dto/user-response.dto'
import { USER_SERVICE_TOKEN } from '@/modules/user/user.constants'

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUserById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto)
  }
}
