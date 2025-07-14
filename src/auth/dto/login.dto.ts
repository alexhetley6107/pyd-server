import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'JohnDoe', description: 'User name' })
  readonly userName: string;
  @ApiProperty({ example: 'Test123!', description: 'User password' })
  readonly password: string;
}
