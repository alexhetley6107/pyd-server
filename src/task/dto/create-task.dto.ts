import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Tilte', description: 'Title of the task' })
  readonly title: string;
}
