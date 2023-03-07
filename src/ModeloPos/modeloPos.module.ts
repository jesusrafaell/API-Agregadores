import { Module } from '@nestjs/common';
import { LogsModule } from '../logs/logs.module';
import { ModelPosService } from './modeloPos.service';
import { ModelPosController } from './modelPos.controller';

@Module({
  imports: [LogsModule],
  controllers: [ModelPosController],
  providers: [ModelPosService],
  exports: [ModelPosService],
})
export class ModelPosModule {}
