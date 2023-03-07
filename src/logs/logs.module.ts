import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import general_logs_api from '../db/global/models/general_logs_api.entity';
import { LogsService } from './logs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([general_logs_api]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
