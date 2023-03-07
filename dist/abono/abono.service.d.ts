import { DataSource } from 'typeorm';
import Abonos from '../db/models/abono.entity';
import Comercios from '../db/models/comercios.entity';
import Bancos from '../db/models/bancos.entity';
export interface RespAbono {
    message: string;
    terminal?: string;
    terminales_Error?: string[];
    code?: number;
}
export declare class AbonoService {
    createAbono(terminal: string, commerce: Comercios, cxaCodAfi: string, aboNroCuenta: string, DS: DataSource): Promise<RespAbono>;
    createAbonos(terminals: string[], commerce: Comercios, cxaCodAfi: string, aboNroCuenta: string, DS: DataSource): Promise<RespAbono>;
    validAccountNumber(comerCuentaBanco: string, DS: DataSource): Promise<Bancos>;
    getAbonosByCommerce(comerCod: number, DS: DataSource): Promise<Abonos[]>;
}
