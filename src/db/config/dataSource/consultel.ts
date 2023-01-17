import { DataSource } from 'typeorm';
import {
  entitiesAgregadores,
  migrationsAgregadores,
} from '../parmetros.config';
import 'dotenv/config';

const { DB_HOST_CTEL, DB_USER_CTEL, DB_PASS_CTEL, DB_DATA_CTEL } = process.env;

const CONSULTELDS = new DataSource({
  type: 'mssql',
  host: DB_HOST_CTEL,
  username: DB_USER_CTEL,
  password: DB_PASS_CTEL,
  database: DB_DATA_CTEL,
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

export default CONSULTELDS;
