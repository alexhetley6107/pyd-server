import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { DatabaseModule } from 'src/database/database.module';
import { statusProviders } from './status.providers';

@Module({
  imports: [DatabaseModule],
  providers: [StatusService, ...statusProviders],
  controllers: [StatusController],
  exports: [StatusService],
})
export class StatusModule {}
