import { CommerceService } from '../commerce/commerce.service';
import { AbonoService } from '../abono/abono.service';
import { LogsService } from '../logs/logs.service';
import 'dotenv/config';
import { Header } from '../logs/dto/dto-logs.dto';
import { ITerminalAll } from './dto';
import { ModelPosService } from '../ModeloPos/modeloPos.service';
import { SerialService } from '../SerialPos/serial.service';
export interface RespTerm {
    message: string;
    terminales?: string[];
    terminales_Error?: string[];
    code?: number;
}
export interface RespStatusTerm {
    terminal: string;
    message: string;
}
export interface IPrefijoValue {
    value: number;
}
export declare class TerminalsService {
    private logService;
    private commerceService;
    private abonoService;
    private modelService;
    private serialService;
    constructor(logService: LogsService, commerceService: CommerceService, abonoService: AbonoService, modelService: ModelPosService, serialService: SerialService);
    createTerminals(comerRif: string, comerCuentaBanco: string, prefijo: string, id_modelo: number, serial: string, header: Header): Promise<RespTerm>;
    getAllTerminals(header: Header): Promise<ITerminalAll>;
    updateStatus(terminal: string, status: number, header: Header): Promise<RespStatusTerm>;
    updateAccountNumber(terminal: string, comerCuentaBanco: string, header: Header): Promise<RespStatusTerm>;
}
