import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {}

  @HttpCode(200)
  @Post('login')
  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  login(@Body() body: LoginDto) {
    const user = this.authService.validateUser(body.username, body.password);
    if (!user) return { message: 'Invalid credentials' };

    return this.authService.login(user);
  }

  @Get('test')
  test() {
    return 'test_success';
  }
}
