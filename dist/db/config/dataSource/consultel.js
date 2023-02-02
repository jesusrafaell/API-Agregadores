"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const parmetros_config_1 = require("../parmetros.config");
require("dotenv/config");
const { DB_HOST_CTEL, DB_USER_CTEL, DB_PASS_CTEL, DB_DATA_CTEL } = process.env;
const CONSULTELDS = new typeorm_1.DataSource({
    type: 'mssql',
    host: DB_HOST_CTEL,
    username: DB_USER_CTEL,
    password: DB_PASS_CTEL,
    database: DB_DATA_CTEL,
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
exports.default = CONSULTELDS;
//# sourceMappingURL=consultel.js.map