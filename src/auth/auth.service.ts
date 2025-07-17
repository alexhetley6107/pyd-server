import {
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
    let candidate = await this.userService.findByUsername(dto.userName);
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
    const createdUser = await this.userService
      .createUser({
        ...dto,
        password: hashPassword,
      })
      .then((u) => u?.get({ plain: true }));

    const user = await this.getLoggedInUser(createdUser);
    return user;
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, userName: user.userName };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getLoggedInUser(u: User) {
    const loginInfo = await this.generateToken(u);

    return {
      id: u.id,
      userName: u.userName,
      email: u.email,
      loginInfo,
    };
  }

  async validateUser(dto: LoginDto) {
    const candidate = await this.userService
      .findByUsername(dto.userName)
      .then((u) => u?.get({ plain: true }));

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
    user.resetToken = token;

    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    await this.mailService.sendResetPassword(email, token);
  }
}
