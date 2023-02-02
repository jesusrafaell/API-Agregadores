import { DataSource } from 'typeorm';
import Agregador from '../db/sitran/models/agregador.entity';
export declare class AgregadoresService {
    all(): Promise<Agregador[]>;
    create(): Promise<{
        id: number;
        DS: DataSource;
    }>;
}
