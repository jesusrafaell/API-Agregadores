import { DataSource } from 'typeorm';
import { IAgregadoresDS } from '../db/config/dto';
export default function ProcessPrint(listInitDS: IAgregadoresDS): Promise<void>;
export declare function BarProcess(listInitDS: IAgregadoresDS, callback: (item: string, dataAgr: DataSource) => Promise<void>): Promise<void>;
