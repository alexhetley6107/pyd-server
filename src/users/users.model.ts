import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType } from 'sequelize-typescript';

export interface UserCreationAttrs {
  email: string;
  userName: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  // @ApiProperty({ example: '1', description: 'User id' })
  // @Column({
  //   type: DataType.INTEGER,
  //   unique: true,
  //   autoIncrement: true,
  //   primaryKey: true,
  // })
  // declare id: number;

  @ApiProperty({ example: 'test@email.com', description: 'User email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @Column({ type: DataType.STRING, allowNull: false })
  userName: string;

  @ApiProperty({ example: 'Test123!', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
