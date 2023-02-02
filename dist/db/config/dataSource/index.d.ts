import { DataSource } from 'typeorm';
import 'dotenv/config';
declare const agredadorDS: (host: string, db: string) => DataSource;
export declare const createNewDatabase: (dbName: string) => Promise<void>;
export declare const createTablesDatabase: (dbName: string) => Promise<void>;
export declare const createTablesAgregador: (host: string, db: string) => DataSource;
export default agredadorDS;
