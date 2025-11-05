import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '@/core/database/schema'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

export const DB_TOKEN = Symbol('DB')

export type Database = NodePgDatabase<typeof schema>

@Global()
@Module({
  providers: [
    {
      provide: DB_TOKEN,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow<string>('database.url'),
          min: configService.getOrThrow<number>('database.minPoolCount'),
          max: configService.getOrThrow<number>('database.maxPoolCount'),
        })
        return drizzle(pool, { schema })
      },
      inject: [ConfigService],
    },
  ],
  exports: [DB_TOKEN],
})
export class DatabaseModule {}
