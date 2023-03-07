import { DataSource } from 'typeorm';
import {
  entitiesAgregadores,
  migrationsAgregadores,
} from '../parmetros.config';
import 'dotenv/config';
import * as sql from 'mssql';
// import Bancos from '../../newAgregador/sql/Bancos.sql';

const { DB_USER, DB_PASS } = process.env;

const agredadorDS = (host: string, db: string): DataSource => {
  return new DataSource({
    type: 'mssql',
    host: host,
    username: DB_USER,
    password: DB_PASS,
    database: db,
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
    migrationsTableName: 'migrations_api_v1',
  });
};

const config = {
  user: DB_USER,
  password: DB_PASS,
  server: '10.198.72.11',
  // port: 1433,
  // database: 'master',
  encrypt: false, // for azure
  trustServerCertificate: false,
  pool: {
    max: 20,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

export const createNewDatabase = async (dbName: string) => {
  const pool = new sql.ConnectionPool(config);
  // console.log(pool);
  await pool.connect().then(async () => {
    await pool
      .request()
      .query(`CREATE DATABASE ${dbName}`)
      .then(() => console.log('Created'))
      .catch((err) => {
        console.log(err);
        pool.close();
      });
  });
};

export const createTablesDatabase = async (dbName: string) => {
  const pool = new sql.ConnectionPool({ ...config, database: dbName });
  console.log(pool);
  // console.log(pool);
  // await pool.connect().then(async () => {
  //   await pool
  //     .request()
  //     .query(Bancos)
  //     .then(() => console.log('Created banco'))
  //     .catch((err) => {
  //       console.log(err);
  //       // pool.close();
  //     });
  // });
};

export const createTablesAgregador = (host: string, db: string): DataSource => {
  return new DataSource({
    type: 'mssql',
    host: host,
    username: DB_USER,
    password: DB_PASS,
    database: db,
    options: {
      encrypt: false,
    },
    requestTimeout: 3000000,
    connectionTimeout: 3000000,
    synchronize: true,
    migrationsRun: true,
    logging: false,
    entities: entitiesAgregadores,
    migrations: migrationsAgregadores,
    subscribers: ['./db/subscriber/**/*.ts'],
    migrationsTableName: 'migrations_api_v1',
  });
};

export default agredadorDS;
