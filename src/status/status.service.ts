import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { STATUS_REPOSITORY } from './status.providers';
import { Status } from './status.model';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusService {
  constructor(@Inject(STATUS_REPOSITORY) private statusModel: typeof Status) {}

  async getAll(userId: string) {
    const statuses = await this.statusModel.findAll({
      where: { userId },
      order: [['order', 'ASC']],
    });
    return statuses?.map((b) => b?.get({ plain: true }));
  }

  async create(dto: CreateStatusDto, userId: string) {
    const existing = await this.statusModel.findOne({
      where: { name: dto.name, userId },
    });
    if (existing) {
      throw new HttpException('Such status already exists', HttpStatus.BAD_REQUEST);
    }

    const all = await this.getAll(userId);
    if (all.length >= 15) {
      throw new HttpException('Max statuses amount is 15', HttpStatus.BAD_REQUEST);
    }

    const body = { ...dto, userId, order: all.length + 1 };
    const status = await this.statusModel.create(body);
    return status?.get({ plain: true });
  }

  async delete(id: string, userId: string) {
    const status = await this.statusModel.findOne({ where: { id } });
    if (!status) {
      throw new NotFoundException('Status not found or not authorized');
    }
    await status.destroy();

    const all = await this.getAll(userId);
    await Promise.all(
      all.map((s, i) =>
        this.statusModel.update({ order: i + 1 }, { where: { id: s.id } }),
      ),
    );

    return await this.getAll(userId);
  }

  async changeOrder(userId: string, id: string, newOrder: number) {
    const all = await this.getAll(userId);

    const current = all.find((b) => b.id === id);
    if (!current) {
      throw new NotFoundException('Status not found or not authorized');
    }

    const reordered = all.filter((s) => s.order !== current.order);
    const needIndex = newOrder - 1;
    reordered.splice(needIndex, 0, current);

    await Promise.all(
      reordered.map((s, i) =>
        this.statusModel.update({ order: i + 1 }, { where: { id: s.id } }),
      ),
    );

    return await this.getAll(userId);
  }
}
