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
    comerCantPost: number;
    comerCuentaBanco?: string;
    prefijo: string;
}
export declare class ParamTermDto {
    terminal: string;
}
export declare class BodyTermStatusDto {
    status: number;
}
