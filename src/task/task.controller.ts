import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get User Tasks' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  async getAll(@Req() req: any) {
    const userId = req.user.id;
    return this.taskService.getAll(userId);
  }

  @ApiOperation({ summary: 'Add new Task' })
  @ApiResponse({ status: 200, type: Task })
  @Post()
  async create(@Body() dto: CreateTaskDto, @Req() req: any) {
    const userId = req.user.id;
    return this.taskService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Task Updating' })
  @ApiResponse({ status: 200, type: Task })
  @Patch()
  async update(@Body() dto: UpdateTaskDto) {
    return this.taskService.update(dto.id, dto);
  }

  @ApiOperation({ summary: 'Task Deleting' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async dalete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
