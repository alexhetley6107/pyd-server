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
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Board } from './board.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { BoardService } from './board.service';
import { UpdateBoardDto } from './dto/update-board.dto';
import { RequestWithUser } from 'src/auth/types/requestWithUser';

@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @ApiOperation({ summary: 'Get All User Boards' })
  @ApiResponse({ status: 200, type: [Board] })
  @Get()
  async getAll(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.boardService.getAll(userId);
  }

  @ApiOperation({ summary: 'Board Creation' })
  @ApiResponse({ status: 200, type: Board })
  @Post()
  async create(@Body() dto: CreateBoardDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.boardService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Board Updating' })
  @ApiResponse({ status: 200, type: Board })
  @Patch()
  async update(@Body() dto: UpdateBoardDto) {
    return this.boardService.update(dto.id, dto);
  }

  @ApiOperation({ summary: 'Board Deleting' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async dalete(@Param('id') id: string) {
    return this.boardService.delete(id);
  }
}
