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
import { JwtAuthGuard } from 'src/jwt-app/guard/jwt-auth.guard';
import { Status } from './status.model';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RequestWithUser } from 'src/jwt-app/types/requestWithUser';

@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @ApiOperation({ summary: 'Get All User Board columns' })
  @ApiResponse({ status: 200, type: [Status] })
  @Get()
  async getAll(@Req() req: any) {
    const userId = req.user.id;
    return this.statusService.getAll(userId);
  }

  @ApiOperation({ summary: 'Board Creation' })
  @ApiResponse({ status: 200, type: Status })
  @Post()
  async create(@Body() dto: CreateStatusDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.statusService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Board Updating' })
  @ApiResponse({ status: 200, type: Status })
  @Patch()
  async upadate(@Body() dto: UpdateStatusDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.statusService.changeOrder(userId, dto.id, dto.order);
  }

  @ApiOperation({ summary: 'Board Deleting' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async dalete(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.statusService.delete(id, userId);
  }
}
