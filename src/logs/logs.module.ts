import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LogsService } from './logs.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
