import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Board } from './board.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { BoardService } from './board.service';

@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @ApiOperation({ summary: 'Board Creation' })
  @ApiResponse({ status: 200, type: Board })
  @Post()
  async create(@Body() dto: CreateBoardDto, @Req() req: any) {
    const userId = req.user.id;
    return this.boardService.create(dto, userId);
  }
}
