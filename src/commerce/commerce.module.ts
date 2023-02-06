import { Module } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { CommerceController } from './commerce.controller';
import { LogsModule } from '../logs/logs.module';
import { AbonoModule } from '../abono/abono.module';

@Module({
  imports: [LogsModule, AbonoModule],
  controllers: [CommerceController],
  providers: [CommerceService],
  exports: [CommerceService],
})
export class CommerceModule {}
