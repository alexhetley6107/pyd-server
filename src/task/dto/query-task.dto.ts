import { ApiPropertyOptional } from '@nestjs/swagger';

export class TaskQueryDto {
  @ApiPropertyOptional()
  boardId?: string;

  @ApiPropertyOptional()
  statusId?: string;

  @ApiPropertyOptional()
  priority?: string;

  @ApiPropertyOptional()
  search?: string;
}
