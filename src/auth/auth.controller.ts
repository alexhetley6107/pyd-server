import { UserService } from 'src/user/user.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
      },
    },
  })
  async register(@Body() dto: RegisterDto) {
    const { username, email } = dto;

    const existingUsername = this.userService.findOne(username);
    if (existingUsername) {
      return { message: 'This user is already exists' };
    }

    const existingEmail = this.userService.findOneByEmail(email);
    if (existingEmail) {
      return { message: 'This email is already used' };
    }

    const user = await this.userService.create(dto);
    return this.authService.login(user);
  }

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
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) return { message: 'Invalid credentials' };

    return this.authService.login(user);
  }
}
