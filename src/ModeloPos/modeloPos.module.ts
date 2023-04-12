import { Module } from '@nestjs/common';
import { LogsModule } from '../logs/logs.module';
import { ModelPosService } from './modeloPos.service';
import { ModelPosController } from './modelPos.controller';
import Type_pos from '../db/sitran/models/ModelPos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Type_pos]), LogsModule],
  controllers: [ModelPosController],
  providers: [ModelPosService],
  exports: [ModelPosService],
})
export class ModelPosModule {}
