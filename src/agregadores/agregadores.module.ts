import { Module } from '@nestjs/common';
import { LogsModule } from '../logs/logs.module';
import { AgregadoresContronller } from './agregadores.controller';
import { AgregadoresService } from './agregadores.service';

@Module({
  imports: [LogsModule],
  controllers: [AgregadoresContronller],
  providers: [AgregadoresService],
  exports: [AgregadoresService],
})
export class AgregadoresModule {}
