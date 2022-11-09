import { DataSource } from 'typeorm';
import { entitiesAgregadores } from '../parmetros.config';
import 'dotenv/config';

const { DB_HOST_GSC, DB_USER_GSC, DB_PASS_GSC, DB_DATA_GSC } = process.env;

const GSComputerDS = new DataSource({
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
  migrations: ['./src/db/migrations/**/*.ts'],
  subscribers: ['./src/db/subscriber/**/*.ts'],
});

export default GSComputerDS;
