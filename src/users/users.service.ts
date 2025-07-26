import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from './users.providers';
import { StatusService } from 'src/status/status.service';
import { BoardService } from 'src/board/board.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    private statusService: StatusService,
    private boardService: BoardService,
  ) {}

  async create(dto: CreateUserDto) {
    const userModel = await this.userRepository.create(dto);
    const user = userModel?.get({ plain: true });
    await this.statusService.createInitials(user.id);
    await this.boardService.create({ name: 'First Project' }, user.id);

    return user;
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

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // TODO: delete user's boards, statuses and tasks
    await user.destroy();
  }
}
