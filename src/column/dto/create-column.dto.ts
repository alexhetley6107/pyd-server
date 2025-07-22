import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({
    example: 'Board ID',
    description: 'Id of project board',
  })
  readonly boardId: string;

  @ApiProperty({
    example: 'Board Column Name',
    description: 'Name of project board column',
  })
  readonly name: string;
}
