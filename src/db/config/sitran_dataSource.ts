import { DataSource } from 'typeorm';
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
  entities: ['dist/db/sitran/models/**/*.entity.{ts,js}'],
  migrations: ['./db/sitran/migrations/**/*.ts'],
  subscribers: ['./db/sitran/subscriber/**/*.ts'],
});

export default SitranDS;
