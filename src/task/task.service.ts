import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from './task.providers';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Op } from 'sequelize';

@Injectable()
export class TaskService {
  constructor(@Inject(TASK_REPOSITORY) private taskModel: typeof Task) {}

  async getAll(
    userId: string,
    filters: { boardId?: string; statusId?: string; priority?: string; search?: string },
  ) {
    const where: Record<string, unknown> = { userId };

    if (filters.statusId) where.statusId = filters.statusId;
    if (filters.priority) where.priority = filters.priority;
    if (filters.search) {
      where.title = { [Op.iLike]: `%${filters.search}%` };
    }

    const tasks = await this.taskModel.findAll({ where });
    return tasks?.map((b) => b?.get({ plain: true }));
  }

  async create(dto: CreateTaskDto, userId: string) {
    const task = await this.taskModel.create({ ...dto, userId });
    return task?.get({ plain: true });
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
