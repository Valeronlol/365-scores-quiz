import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { type IUserRepository } from '@/modules/user/interfaces/user.interface'
import { user } from '@/core/database/schema/user.schema'
import { UserEntity } from '@/modules/user/user.entity'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'
import { DB_TOKEN, type Database } from '@/core/database/database.module'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(DB_TOKEN) private readonly db: Database) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const [data] = await this.db.insert(user).values(createUserDto).returning()
    return new UserEntity(data)
  }

  async findById(id: string): Promise<UserEntity | null> {
    const [data] = await this.db.select().from(user).where(eq(user.id, id))
    return user ? new UserEntity(data) : null
  }
}
