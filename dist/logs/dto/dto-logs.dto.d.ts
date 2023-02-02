import { DataSource } from 'typeorm';
export declare class Log {
    id: number;
    method: string;
    path: string;
    msg: string;
}
export declare class Header {
    DS: DataSource;
    agr: string;
    idAgr: number;
    token: string;
    log: Log;
}
