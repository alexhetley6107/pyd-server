import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { CreateBoardDto } from './dto/create-user.dto';

@Table({ tableName: 'boards' })
export class User extends Model<User, CreateBoardDto> {
  @ApiProperty({
    example: 'e8b5a51c-cf3b-4a43-9d57-d1d6aeb3cdd3',
    description: 'Board ID (UUID)',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: 'Green Project', description: 'Name of your project board' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;
}
