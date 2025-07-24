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
import { Status } from 'src/status/status.model';
import { Board } from 'src/board/board.model';

type CreateBoardAttrs = CreateTaskDto & { userId: string };

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, CreateBoardAttrs> {
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
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  description: string;

  @ApiProperty({ example: 'Important', description: 'Task priority' })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  priority: string;

  @ApiProperty({ example: 'Date', description: 'Task date' })
  @Column({ type: DataType.DATE, unique: false, allowNull: true })
  date: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Board)
  @Column({ type: DataType.UUID, allowNull: true })
  boardId: string | null;

  @BelongsTo(() => Board)
  board: Board | null;

  @ForeignKey(() => Status)
  @Column({ type: DataType.UUID, allowNull: true })
  statusId: string | null;

  @BelongsTo(() => Status)
  status: Status | null;
}
