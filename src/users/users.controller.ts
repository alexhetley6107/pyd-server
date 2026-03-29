import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAccessGuard } from 'src/jwt-app/guard/jwt-access.guard';

@ApiBearerAuth('jwt')
@UseGuards(JwtAccessGuard)
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User Deleting' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async dalete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
