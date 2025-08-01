import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    return this.getLoggedInUser(user);
  }

  async signup(dto: CreateUserDto) {
    let candidate = await this.userService.findByNickname(dto.nickname);
    if (candidate) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    candidate = await this.userService.findByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const createdUser = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    const user = await this.getLoggedInUser(createdUser);
    return user;
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, nickname: user.nickname };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getLoggedInUser(u: User) {
    const loginInfo = await this.generateToken(u);

    return {
      id: u.id,
      nickname: u.nickname,
      email: u.email,
      loginInfo,
    };
  }

  async validateUser(dto: LoginDto) {
    let candidate = await this.userService.findByNickname(dto.login);

    if (!candidate) {
      candidate = await this.userService.findByEmail(dto.login);
    }

    const paswordMatch = await bcrypt.compare(dto.password, candidate?.password ?? '');
    if (!candidate || !paswordMatch) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }
    return candidate;
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException('Such email not found', HttpStatus.BAD_REQUEST);
    }

    const token = this.jwtService.sign({ userId: user.id }, { expiresIn: '1h' });

    await this.userService.update(user.id, {
      resetToken: token,
      resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
    });

    await this.mailService.sendResetPassword(email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    const user = await this.userService.findByResetToken(token);

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Token expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userService.update(user.id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return { message: 'Password has been reset successfully' };
  }
}
