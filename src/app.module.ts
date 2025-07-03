import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { databaseProviders } from './configs/database.providers';

@Module({
  imports: [ConfigModule.forRoot(), TaskModule],
  controllers: [],
  providers: [...databaseProviders],
})
export class AppModule {}
