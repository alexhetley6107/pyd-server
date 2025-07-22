import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user?.get({ plain: true });
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user?.get({ plain: true });
  }

  async findByUsername(userName: string) {
    const user = await this.userRepository.findOne({ where: { userName } });
    return user?.get({ plain: true });
  }

  async findByResetToken(token: string) {
    const user = await this.userRepository.findOne({ where: { resetToken: token } });
    return user?.get({ plain: true });
  }

  async updateUser(id: string, attrs: Partial<User>): Promise<void> {
    await this.userRepository.update(attrs, { where: { id } });
  }
}
