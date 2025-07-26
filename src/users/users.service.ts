import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from './users.providers';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user?.get({ plain: true });
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user?.get({ plain: true });
  }

  async findByNickname(nickname: string) {
    const user = await this.userRepository.findOne({ where: { nickname } });
    return user?.get({ plain: true });
  }

  async findByResetToken(token: string) {
    const user = await this.userRepository.findOne({ where: { resetToken: token } });
    return user?.get({ plain: true });
  }

  async update(id: string, attrs: Partial<User>): Promise<void> {
    await this.userRepository.update(attrs, { where: { id } });
  }

  async delete(id: string, attrs: Partial<User>): Promise<void> {
    await this.userRepository.update(attrs, { where: { id } });
  }
}
