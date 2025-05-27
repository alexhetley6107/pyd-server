import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      username: 'hetley',
      email: 'string@mail.com',
      password: '$2b$10$.TnD2/XjnTngTM.3OeoYqu2aUWs5w9ww3/0il1WmxyMSgvlpA9bJS',
    },
  ];

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  async create(dto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10); // 10 salt rounds

    const newUser: User = {
      id: this.users.length + 1,
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return newUser;
  }
}
