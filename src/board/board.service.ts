import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.model';
import { BOARD_REPOSITORY } from './board.providers';

@Injectable()
export class BoardService {
  constructor(@Inject(BOARD_REPOSITORY) private boards: typeof Board) {}

  async create(dto: CreateBoardDto, userId: string) {
    const user = await this.boards.create({ ...dto, userId });
    return user?.get({ plain: true });
  }
}
