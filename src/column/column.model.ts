import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { CreateColumnDto } from './dto/create-column.dto';

@Table({ tableName: 'columns' })
export class BoardColumn extends Model<BoardColumn, CreateColumnDto> {
  @ApiProperty({
    example: 'e8b5a51c-cf3b-4a43-9d57-d1d6aeb3cdd3',
    description: 'Board Column ID (UUID)',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: 'To Do', description: 'Name of the board column' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;
}
