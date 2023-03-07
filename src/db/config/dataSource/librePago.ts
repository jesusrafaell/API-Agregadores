import { DataSource } from 'typeorm';
import {
  entitiesAgregadores,
  migrationsAgregadores,
} from '../parmetros.config';
import 'dotenv/config';

const { DB_HOST_LIBRE, DB_USER_LIBRE, DB_PASS_LIBRE, DB_DATA_LIBRE } =
  process.env;

const LibrepagoDS = new DataSource({
  type: 'mssql',
  host: DB_HOST_LIBRE,
  username: DB_USER_LIBRE,
  password: DB_PASS_LIBRE,
  database: DB_DATA_LIBRE,
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
  subscribers: ['./db/subscriber/**/*.ts'],
  migrationsTableName: 'migrations_api_v2',
});

export default LibrepagoDS;
