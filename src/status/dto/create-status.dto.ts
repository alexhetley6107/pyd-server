import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
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
