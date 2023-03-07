"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const parmetros_config_1 = require("../parmetros.config");
require("dotenv/config");
const { DB_HOST_LIBRE, DB_USER_LIBRE, DB_PASS_LIBRE, DB_DATA_LIBRE } = process.env;
const LibrepagoDS = new typeorm_1.DataSource({
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
    entities: parmetros_config_1.entitiesAgregadores,
    migrations: parmetros_config_1.migrationsAgregadores,
    subscribers: ['./db/subscriber/**/*.ts'],
    migrationsTableName: 'migrations_api_v2',
});
exports.default = LibrepagoDS;
//# sourceMappingURL=librePago.js.map