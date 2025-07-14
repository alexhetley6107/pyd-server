import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User Creation' })
  @ApiResponse({ status: 200, type: User })
  @Post('create')
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
