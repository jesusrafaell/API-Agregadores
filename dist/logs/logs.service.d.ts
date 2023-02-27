import { Header, Log } from './dto/dto-logs.dto';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Cache } from 'cache-manager';
export declare class LogsService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    saveLogsToken(log: Log): Promise<void>;
    saveLogs(log: Log, DS: DataSource): Promise<void>;
    getDataTokenCache: (headerToken: string, req: Request, cacheService: Cache) => Promise<Header>;
}
