import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
