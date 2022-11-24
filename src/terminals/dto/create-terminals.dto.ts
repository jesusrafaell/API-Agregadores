import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Validate,
} from '@nestjs/class-validator';
import { RifValidation } from '../../commerce/dto/new-commerce.dto';
import error from '../../commerce/dto/messages-validator';

export class CreateTerminalsDto {
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(6, 10, error.textLength)
  @Validate(RifValidation)
  comerRif!: string;

  @IsNumber()
  @IsNotEmpty()
  comerCantPost!: number;

  @IsOptional()
  @IsString()
  @Length(20, 20, error.cuentaBanco)
  comerCuentaBanco?: string;

  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(2, 2, error.textLength)
  prefijo!: string;
}
