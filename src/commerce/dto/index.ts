import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import Comercios from '../../db/models/comercios.entity';
import { TerminalSPAux } from '../../terminals/dto';
import error from './messages-validator';
import { RifValidation } from './new-commerce.dto';

export class RifDto {
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(7, 10, error.textLength)
  @Validate(RifValidation, {
    message: 'Rif debe con una sola letra Ej:V,J,R',
  })
  comerRif: string;
}

export interface ICommerceGet {
  message: string;
  comerRif: string;
  nombre: string;
  email: string;
  fecha: string;
  terminales: TerminalSPAux[];
}

export interface ICommerceAll {
  message: string;
  comercios: Comercios[];
}
