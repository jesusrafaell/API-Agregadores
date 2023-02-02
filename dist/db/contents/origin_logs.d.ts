import { DataSource } from 'typeorm';
declare const origin_logs: (appDataSource: DataSource) => Promise<void>;
export default origin_logs;
