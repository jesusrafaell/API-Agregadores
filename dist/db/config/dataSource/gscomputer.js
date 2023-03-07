"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const parmetros_config_1 = require("../parmetros.config");
require("dotenv/config");
const { DB_HOST_GSC, DB_USER_GSC, DB_PASS_GSC, DB_DATA_GSC } = process.env;
const MilPagosDS = new typeorm_1.DataSource({
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
    entities: parmetros_config_1.entitiesAgregadores,
    migrations: parmetros_config_1.migrationsAgregadores,
    subscribers: ['./src/db/subscriber/**/*.ts'],
    migrationsTableName: 'migrations_api_v1',
});
exports.default = MilPagosDS;
//# sourceMappingURL=gscomputer.js.map