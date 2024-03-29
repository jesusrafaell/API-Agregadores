import { DataSource } from 'typeorm';
import {
  entitiesAgregadores,
  migrationsAgregadores,
} from '../parmetros.config';
import 'dotenv/config';

const { DB_HOST_GSC, DB_USER_GSC, DB_PASS_GSC, DB_DATA_GSC } = process.env;

const MilPagosDS = new DataSource({
  type: 'mssql',
  host: DB_HOST_GSC,
  username: DB_USER_GSC,
  password: DB_PASS_GSC,
  database: DB_DATA_GSC,
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

export default MilPagosDS;
