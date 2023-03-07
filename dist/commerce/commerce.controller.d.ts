import { CommerceDto } from './dto/new-commerce.dto';
import { CommerceService, Resp } from './commerce.service';
import { Request } from 'express';
import { LogsService } from '../logs/logs.service';
import { ICommerceAll, ICommerceGet, RifDto } from './dto';
import { Cache } from 'cache-manager';
export declare class CommerceController {
    private readonly _commerceService;
    private readonly logService;
    private cacheService;
    constructor(_commerceService: CommerceService, logService: LogsService, cacheService: Cache);
    createCommerce(token: string, req: Request, body: CommerceDto): Promise<Resp>;
    getCommerce(token: string, req: Request, params: RifDto): Promise<ICommerceGet>;
    getCommercePost(token: string, req: Request, params: RifDto): Promise<ICommerceGet>;
    getAllCommerce(token: string, req: Request): Promise<ICommerceAll>;
}
