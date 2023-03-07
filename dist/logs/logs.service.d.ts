import { Header, Log } from './dto/dto-logs.dto';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import general_logs_api from '../db/global/models/general_logs_api.entity';
import { Cache } from 'cache-manager';
export declare class LogsService {
    private readonly jwtService;
    private generalLogRepository;
    constructor(jwtService: JwtService, generalLogRepository: Repository<general_logs_api>);
    saveLogsToken(log: Log): Promise<void>;
    saveLogsSitran(log: Log): Promise<void>;
    saveLogs(log: Log, DS: DataSource): Promise<void>;
    getDataTokenCache: (headerToken: string, req: Request, cacheService: Cache) => Promise<Header>;
}
