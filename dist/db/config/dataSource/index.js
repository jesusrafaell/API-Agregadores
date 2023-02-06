"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTablesAgregador = exports.createTablesDatabase = exports.createNewDatabase = void 0;
const typeorm_1 = require("typeorm");
const parmetros_config_1 = require("../parmetros.config");
require("dotenv/config");
const sql = require("mssql");
const { DB_USER, DB_PASS } = process.env;
const agredadorDS = (host, db) => {
    return new typeorm_1.DataSource({
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
        entities: parmetros_config_1.entitiesAgregadores,
        migrations: parmetros_config_1.migrationsAgregadores,
        subscribers: ['./db/subscriber/**/*.ts'],
        migrationsTableName: 'migrations_api_v1',
    });
};
const config = {
    user: DB_USER,
    password: DB_PASS,
    server: '10.198.72.11',
    encrypt: false,
    trustServerCertificate: false,
    pool: {
        max: 20,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};
const createNewDatabase = async (dbName) => {
    const pool = new sql.ConnectionPool(config);
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
exports.createNewDatabase = createNewDatabase;
const createTablesDatabase = async (dbName) => {
    const pool = new sql.ConnectionPool(Object.assign(Object.assign({}, config), { database: dbName }));
};
exports.createTablesDatabase = createTablesDatabase;
const createTablesAgregador = (host, db) => {
    return new typeorm_1.DataSource({
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
        entities: parmetros_config_1.entitiesAgregadores,
        migrations: parmetros_config_1.migrationsAgregadores,
        subscribers: ['./db/subscriber/**/*.ts'],
        migrationsTableName: 'migrations_api_v1',
    });
};
exports.createTablesAgregador = createTablesAgregador;
exports.default = agredadorDS;
//# sourceMappingURL=index.js.map