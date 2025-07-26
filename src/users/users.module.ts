import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';
import { BoardModule } from 'src/board/board.module';
import { StatusModule } from 'src/status/status.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [DatabaseModule, BoardModule, StatusModule, TaskModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
