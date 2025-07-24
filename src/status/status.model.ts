import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CreateStatusDto } from './dto/create-status.dto';
import { Task } from 'src/task/task.model';
import { User } from 'src/users/users.model';

type CreateStatusAttrs = CreateStatusDto & { userId: string; order: number };

@Table({ tableName: 'statuses' })
export class Status extends Model<Status, CreateStatusAttrs> {
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

  @ApiProperty({ example: '1', description: 'Order number' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  order: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Task)
  tasks: Task[];
}
