import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';
import { DataSource } from 'typeorm';

export class Log {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  method!: string;

  @IsString()
  @IsNotEmpty()
  path!: string;

  @IsString()
  @IsNotEmpty()
  msg!: string;
}

export class Header {
  DS: DataSource;
  agr: string;
  log: Log;
}
