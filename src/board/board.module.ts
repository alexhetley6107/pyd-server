import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { DatabaseModule } from 'src/database/database.module';
import { boardsProviders } from './board.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [BoardService, ...boardsProviders],
  controllers: [BoardController],
})
export class BoardModule {}
