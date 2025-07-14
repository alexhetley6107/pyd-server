import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(dto: any) {}

  async signup(dto: CreateUserDto) {
    let candidate = await this.userService.getUserByUsername(dto.userName);
    if (candidate) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const created = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    const createdUser = created.get({ plain: true });
    const loginInfo = await this.generateToken(createdUser);

    const user = {
      id: createdUser.id,
      userName: createdUser.userName,
      email: createdUser.email,
      loginInfo,
    };
    return user;
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, userName: user.userName };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
