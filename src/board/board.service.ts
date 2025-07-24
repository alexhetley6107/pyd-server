import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.model';
import { BOARD_REPOSITORY } from './board.providers';

@Injectable()
export class BoardService {
  constructor(@Inject(BOARD_REPOSITORY) private boardModel: typeof Board) {}

  async create(dto: CreateBoardDto, userId: string) {
    const existing = await this.findByName(dto.name, userId);
    if (existing) {
      throw new HttpException('Such board already exists', HttpStatus.BAD_REQUEST);
    }

    const board = await this.boardModel.create({ ...dto, userId });
    return board?.get({ plain: true });
  }

  async findByName(name: string, userId: string) {
    const board = await this.boardModel.findOne({ where: { name, userId } });
    return board?.get({ plain: true });
  }

  async getAll(userId: string) {
    const boards = await this.boardModel.findAll({ where: { userId } });
    return boards?.map((b) => b?.get({ plain: true }));
  }

  async update(id: string, attrs: Partial<Board>) {
    await this.boardModel.update(attrs, { where: { id } });

    const board = await this.boardModel.findOne({ where: { id } });
    return board?.get({ plain: true });
  }

  async delete(id: string) {
    const board = await this.boardModel.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException('Board not found or not authorized');
    }
    await board.destroy();
  }
}
