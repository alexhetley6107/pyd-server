import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/users.model';
import { BoardColumn } from 'src/column/column.model';

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, CreateTaskDto> {
  @ApiProperty({
    example: 'e8b5a51c-cf3b-4a43-9d57-d1d6aeb3cdd3',
    description: 'Task ID (UUID)',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: 'Buy Milk', description: 'Title of the task' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Buy Milk In Store', description: 'Description of the task' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => BoardColumn)
  @Column({ type: DataType.UUID, allowNull: true })
  columnId: string | null;

  @BelongsTo(() => BoardColumn)
  column: BoardColumn | null;
}
