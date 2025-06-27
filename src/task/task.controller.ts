import { Body, Controller, Delete, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TaskModel } from './task.model';
import { FindTaskDto } from './dto/find-task.dto';

@Controller('task')
export class TaskController {
  //
  @Post('create')
  async create(@Body() dto: Omit<TaskModel, '_id'>) {}

  @Post(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TaskModel) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTaskDto) {}
}
