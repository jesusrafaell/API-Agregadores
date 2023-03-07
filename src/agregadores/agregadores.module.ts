import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Agregador from '../db/sitran/models/agregador.entity';
import { LogsModule } from '../logs/logs.module';
import { AgregadoresContronller } from './agregadores.controller';
import { AgregadoresService } from './agregadores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agregador]), LogsModule],
  controllers: [AgregadoresContronller],
  providers: [AgregadoresService],
  exports: [AgregadoresService],
})
export class AgregadoresModule {}
