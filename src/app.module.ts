import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TaskModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [],
})
export class AppModule {}
