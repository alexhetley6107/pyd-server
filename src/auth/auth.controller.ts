import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  //
  @HttpCode(200)
  @Post('signup')
  async signup(@Body() dto: SignupDto) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {}
}
