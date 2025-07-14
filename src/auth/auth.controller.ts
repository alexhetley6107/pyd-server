import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({ status: 200, type: User })
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({ status: 200, type: User })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    // return this.usersService.createUser(dto);
  }
}
