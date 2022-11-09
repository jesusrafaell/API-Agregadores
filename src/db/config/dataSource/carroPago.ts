import { DataSource } from 'typeorm';
import { entitiesAgregadores } from '../parmetros.config';
import 'dotenv/config';

const { DB_HOST_CARRO, DB_USER_CARRO, DB_PASS_CARRO, DB_DATA_CARRO } =
  process.env;

const CarropagoDS = new DataSource({
  type: 'mssql',
  host: DB_HOST_CARRO,
  username: DB_USER_CARRO,
  password: DB_PASS_CARRO,
  database: DB_DATA_CARRO,
  options: {
    encrypt: false,
  },
  requestTimeout: 3000000,
  connectionTimeout: 3000000,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: entitiesAgregadores,
  migrations: ['./db/migrations/**/*.ts'],
  subscribers: ['./db/subscriber/**/*.ts'],
});

export default CarropagoDS;
