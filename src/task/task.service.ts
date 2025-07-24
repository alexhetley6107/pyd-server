import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from './task.providers';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject(TASK_REPOSITORY) private taskModel: typeof Task) {}

  async create(dto: CreateTaskDto, userId: string) {
    const task = await this.taskModel.create({ ...dto, userId });
    return task?.get({ plain: true });
  }

  async getAll(userId: string) {
    const tasks = await this.taskModel.findAll({ where: { userId } });
    return tasks?.map((b) => b?.get({ plain: true }));
  }

  async delete(id: string) {
    const task = await this.taskModel.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }
    await task.destroy();
  }

  async update(id: string, dto: Partial<UpdateTaskDto>) {
    await this.taskModel.update(dto, { where: { id } });

    const task = await this.taskModel.findOne({ where: { id } });
    return task?.get({ plain: true });
  }
}
