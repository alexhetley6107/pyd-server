import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findByUsername(userName: string) {
    const user = await this.userRepository.findOne({ where: { userName } });
    return user;
  }
}
