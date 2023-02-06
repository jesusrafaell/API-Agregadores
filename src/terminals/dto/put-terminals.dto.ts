import { IsNotEmpty, IsString, Length } from 'class-validator';
import error from '../../commerce/dto/messages-validator';

export class TerminalDto {
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(8, 8, error.textLength)
  terminal!: string;
}

export class CuentaNumeroDto {
  @Length(20, 20, error.cuentaBanco)
  comerCuentaBanco: string;
}
