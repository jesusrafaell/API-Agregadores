"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const parmetros_config_1 = require("../parmetros.config");
require("dotenv/config");
const { DB_HOST_DISG, DB_USER_DISG, DB_PASS_DISG, DB_DATA_DISG } = process.env;
const DISGLOBALDS = new typeorm_1.DataSource({
    type: 'mssql',
    host: DB_HOST_DISG,
    username: DB_USER_DISG,
    password: DB_PASS_DISG,
    database: DB_DATA_DISG,
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
    subscribers: ['./src/db/subscriber/**/*.ts'],
    migrationsTableName: 'migrations_api_v1',
});
exports.default = DISGLOBALDS;
//# sourceMappingURL=disglobal.js.map