import { Request } from 'express';
import { IAgregadoresDS } from '../db/config/dto';
import { AgregadoresService } from './agregadores.service';
import Agregador from '../db/sitran/models/agregador.entity';
import { Cache } from 'cache-manager';
import { IListStatus } from './dto';
export declare class AgregadoresContronller {
    private readonly agreadoresService;
    private cacheService;
    constructor(agreadoresService: AgregadoresService, cacheService: Cache);
    saveAgrInCache(_DS?: IAgregadoresDS): Promise<string[]>;
    getAgregadores(token: string, req: Request, body: {
        name: string;
        host: string;
    }): Promise<Agregador[]>;
    createAgregador(): Promise<{
        id: number;
        name: string;
    }>;
    reload(): Promise<{
        message: string;
        new_agr?: string[];
    }>;
    status(): Promise<{
        listStatus: IListStatus;
    }>;
    restartConnection(): Promise<{
        message: string;
        list_resets?: string[];
    }>;
}
