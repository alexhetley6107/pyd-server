import { Sequelize } from 'sequelize-typescript';
import { Board } from 'src/board/board.model';
import { Status } from 'src/status/status.model';
import { Task } from 'src/task/task.model';
import { User } from 'src/users/users.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      });

      sequelize.addModels([User, Board, Status, Task]);

      await sequelize.sync();
      return sequelize;
    },
  },
];
