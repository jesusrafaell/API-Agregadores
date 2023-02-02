import { DataSource } from 'typeorm';
import {
  entitiesAgregadores,
  migrationsAgregadores,
} from '../parmetros.config';
import 'dotenv/config';

const { DB_HOST_DISG, DB_USER_DISG, DB_PASS_DISG, DB_DATA_DISG } = process.env;

const DISGLOBALDS = new DataSource({
  // type: 'mssql',
  type: 'mssql',
  host: DB_HOST_DISG,
  username: DB_USER_DISG,
  password: DB_PASS_DISG,
  database: DB_DATA_DISG,
  options: {
    encrypt: false,
  },
  requestTimeout: 3000000,
  connectionTimeout: 3000000,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: entitiesAgregadores,
  migrations: migrationsAgregadores,
  subscribers: ['./src/db/subscriber/**/*.ts'],
  migrationsTableName: 'migrations_api_v1',
});

export default DISGLOBALDS;
