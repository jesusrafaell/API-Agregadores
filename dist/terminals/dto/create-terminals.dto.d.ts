import { ValidatorConstraintInterface } from '@nestjs/class-validator';
export declare class TerminalValidation implements ValidatorConstraintInterface {
    validate(text: string): boolean;
    defaultMessage(): string;
}
export declare class SizeZeroOrOne implements ValidatorConstraintInterface {
    validate(num: number): boolean;
    defaultMessage(): string;
}
export declare class CreateTerminalsDto {
    comerRif: string;
    comerCuentaBanco?: string;
    prefijo: string;
    modelo: number;
    serial: string;
}
export declare class ParamTermDto {
    terminal: string;
}
export declare class BodyTermStatusDto {
    status: number;
}
