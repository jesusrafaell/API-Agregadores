import { DataSource } from 'typeorm';
import Agregador from '../sitran/models/agregador.entity';
export declare const listAgregadores: Agregador[];
declare const agregadores: (db: DataSource) => Promise<void>;
export default agregadores;
