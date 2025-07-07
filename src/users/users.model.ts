import { Model, Table, Column, DataType } from 'sequelize-typescript';

export interface UserCreationAttrs {
  email: string;
  userName: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  userName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
