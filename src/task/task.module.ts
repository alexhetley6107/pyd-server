import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({ imports: [DatabaseModule], controllers: [TaskController] })
export class TaskModule {}
