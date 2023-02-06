import { Module } from '@nestjs/common';
import { AbonoService } from './abono.service';

@Module({
  providers: [AbonoService],
  exports: [AbonoService],
})
export class AbonoModule {}
