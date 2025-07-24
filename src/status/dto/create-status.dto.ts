import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @ApiProperty({
    example: 'To Do',
    description: 'Name of project board column',
  })
  readonly name: string;
}
