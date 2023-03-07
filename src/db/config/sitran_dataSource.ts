import { DataSource } from 'typeorm';
import { globalModels } from './parmetros.config';

import 'dotenv/config';
const { DB_HOST_SITRAN, DB_USER_SITRAN, DB_PASS_SITRAN, DB_DATA_SITRAN } =
  process.env;

const SitranDS = new DataSource({
  type: 'mssql',
  host: DB_HOST_SITRAN,
  username: DB_USER_SITRAN,
  password: DB_PASS_SITRAN,
  database: DB_DATA_SITRAN,
  options: {
    encrypt: false,
  },
  requestTimeout: 3000000,
  connectionTimeout: 3000000,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: [
    __dirname + '/../sitran/models/**/*.entity.{ts,js}',
    globalModels,
    // __dirname + '/../sitran/newModels/**/*.entity.{ts,js}',
  ],
  migrations: [__dirname + '/../sitran/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations_api_v1',
});

export default SitranDS;
