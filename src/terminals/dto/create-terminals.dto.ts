import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { RifValidation } from '../../commerce/dto/new-commerce.dto';
import error from '../../commerce/dto/messages-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class TerminalValidation implements ValidatorConstraintInterface {
  validate(text: string) {
    return /(^[0-9]+$)/.test(text);
  }

  defaultMessage() {
    return '$property debe tener 8 numeros';
  }
}

@ValidatorConstraint({ name: 'customRange', async: false })
export class SizeZeroOrOne implements ValidatorConstraintInterface {
  validate(num: number) {
    return num == 0 || num == 1;
  }

  defaultMessage() {
    return '$property esta fuera de rango debe ser 0 o 1';
  }
}

export class CreateTerminalsDto {
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(7, 10, error.textLength)
  @Validate(RifValidation)
  comerRif!: string;

  @IsOptional()
  @IsString()
  @Length(20, 20, error.cuentaBanco)
  comerCuentaBanco?: string;

  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(2, 2, error.textLength)
  prefijo!: string;

  @IsNumber()
  @IsNotEmpty(error.textNotEmpty)
  modelo: number;

  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(4, 100, error.textLength)
  serial!: string;

  // @IsNumber()
  // @IsNotEmpty()
  // comerCantPost!: number;
}

export class ParamTermDto {
  @IsString()
  @IsNotEmpty(error.textNotEmpty)
  @Length(8, 8, error.textLength)
  @Validate(TerminalValidation, {
    message: 'El terminal deben ser 8 numeros',
  })
  terminal: string;
}

export class BodyTermStatusDto {
  @IsNumber(
    {},
    {
      message: 'Status debe ser de tipo numerico',
    },
  )
  @IsNotEmpty(error.textNotEmpty)
  @Validate(SizeZeroOrOne)
  status: number;
}
