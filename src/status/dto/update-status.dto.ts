import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({ example: '1', description: 'Status column order' })
  readonly order: number;

  @ApiProperty({
    example: '8c446d00-a6aa-4225-b836-afdb9586d551',
    description: 'ID of the status column',
  })
  readonly id: string;
}
