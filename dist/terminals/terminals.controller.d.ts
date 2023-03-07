import { Request } from 'express';
import { LogsService } from '../logs/logs.service';
import { BodyTermStatusDto, CreateTerminalsDto, ParamTermDto } from './dto/create-terminals.dto';
import { CuentaNumeroDto, TerminalDto } from './dto/put-terminals.dto';
import { RespStatusTerm, RespTerm, TerminalsService } from './terminals.service';
import { Cache } from 'cache-manager';
export declare class TerminalsController {
    private readonly _TerminalsService;
    private readonly logService;
    private cacheService;
    constructor(_TerminalsService: TerminalsService, logService: LogsService, cacheService: Cache);
    createTerminals(token: string, req: Request, body: CreateTerminalsDto): Promise<RespTerm>;
    getAllTerminal(token: string, req: Request): Promise<RespTerm>;
    PutChangeBank(token: string, params: TerminalDto, body: CuentaNumeroDto, req: Request): Promise<RespStatusTerm>;
    PutChangeStatus(token: string, req: Request, params: ParamTermDto, body: BodyTermStatusDto): Promise<RespStatusTerm>;
}
