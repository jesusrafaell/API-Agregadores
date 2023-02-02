import { Request } from 'express';
import { IAgregadoresDS } from '../db/config/dto';
import { AgregadoresService } from './agregadores.service';
import Agregador from '../db/sitran/models/agregador.entity';
import { Cache } from 'cache-manager';
export declare class AgregadoresContronller {
    private readonly agreadoresService;
    private cacheService;
    private DS;
    constructor(agreadoresService: AgregadoresService, cacheService: Cache, DS: IAgregadoresDS);
    getAgregadores(token: string, req: Request, body: {
        name: string;
        host: string;
    }): Promise<Agregador[]>;
    createAgregador(): Promise<{
        id: number;
        name: string;
    }>;
}
