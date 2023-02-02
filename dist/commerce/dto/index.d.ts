import Comercios from '../../db/models/comercios.entity';
import { TerminalSPAux } from '../../terminals/dto';
export declare class RifDto {
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
