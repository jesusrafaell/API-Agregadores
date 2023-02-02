import { ValidatorConstraintInterface } from 'class-validator';
export declare class RifValidation implements ValidatorConstraintInterface {
    validate(text: string): boolean;
    defaultMessage(): string;
}
export declare class SizeOneOrTwo implements ValidatorConstraintInterface {
    validate(num: number): boolean;
    defaultMessage(): string;
}
export declare class LocationDTO {
    estado: string;
    municipio: string;
    ciudad: string;
    parroquia: string;
}
declare class Days {
    Lun: boolean;
    Mar: boolean;
    Mie: boolean;
    Jue: boolean;
    Vie: boolean;
    Sab: boolean;
    Dom: boolean;
}
declare class Contact {
    contNombres: string;
    contApellidos: string;
    contTelefLoc: string;
    contTelefMov: string;
    contMail: string;
}
declare class CommerceData {
    comerRif: string;
    idActivityXAfiliado: string;
    comerDesc: string;
    comerTipoPer: number;
    comerCuentaBanco: string;
    comerCodTipoCont: number;
    comerObservaciones?: string;
    comerCodigoBanco2?: string;
    comerCuentaBanco2?: string;
    comerCodigoBanco3?: string;
    comerCuentaBanco3?: string;
    locationCommerce: LocationDTO;
    locationContact: LocationDTO;
    locationPos: LocationDTO;
    daysOperacion: Days;
}
export declare class CommerceDto {
    commerce: CommerceData;
    contacto: Contact;
}
export {};
