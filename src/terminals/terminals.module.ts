import { Module } from '@nestjs/common';
import { TerminalsService } from './terminals.service';
import { TerminalsController } from './terminals.controller';
import { AbonoModule } from '../abono/abono.module';
import { CommerceModule } from '../commerce/commerce.module';
import { LogsModule } from '../logs/logs.module';
import { SerialModule } from '../SerialPos/serial.module';
import { ModelPosModule } from '../ModeloPos/modeloPos.module';

@Module({
  imports: [
    CommerceModule,
    AbonoModule,
    LogsModule,
    SerialModule,
    ModelPosModule,
  ],
  controllers: [TerminalsController],
  providers: [TerminalsService],
  exports: [TerminalsService],
})
export class TerminalsModule {}
