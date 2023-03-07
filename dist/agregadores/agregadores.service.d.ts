import { DataSource, Repository } from 'typeorm';
import Agregador from '../db/sitran/models/agregador.entity';
import { Cache } from 'cache-manager';
export declare class AgregadoresService {
    private cacheService;
    private agregadorRepository;
    constructor(cacheService: Cache, agregadorRepository: Repository<Agregador>);
    all(): Promise<Agregador[]>;
    create(): Promise<{
        id: number;
        DS: DataSource;
    }>;
    saveAgrInCache(item: string, dataAgr: DataSource): Promise<void>;
    start(): Promise<void>;
}
