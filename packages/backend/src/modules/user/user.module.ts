import { Module } from '@nestjs/common'
import { UserController } from '@/modules/user/user.controller'
import { UserService } from '@/modules/user/user.service'
import { UserRepository } from '@/modules/user/user.repository'
import {
  USER_REPOSITORY_TOKEN,
  USER_SERVICE_TOKEN,
} from '@/modules/user/user.constants'

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
