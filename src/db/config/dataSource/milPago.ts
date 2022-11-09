import { DataSource } from 'typeorm';
import { entitiesAgregadores } from '../parmetros.config';
import 'dotenv/config';

const { DB_HOST_MIL, DB_USER_MIL, DB_PASS_MIL, DB_DATA_MIL } = process.env;

const MilPagosDS = new DataSource({
  type: 'mssql',
  host: DB_HOST_MIL,
  username: DB_USER_MIL,
  password: DB_PASS_MIL,
  database: DB_DATA_MIL,
  options: {
    encrypt: false,
  },
  requestTimeout: 3000000,
  connectionTimeout: 3000000,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: entitiesAgregadores,
  migrations: ['./src/db/migrations/**/*.ts'],
  subscribers: ['./src/db/subscriber/**/*.ts'],
});

export default MilPagosDS;
