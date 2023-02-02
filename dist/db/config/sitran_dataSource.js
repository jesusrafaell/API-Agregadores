"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv/config");
const parmetros_config_1 = require("./parmetros.config");
const { DB_HOST_SITRAN, DB_USER_SITRAN, DB_PASS_SITRAN, DB_DATA_SITRAN } = process.env;
const SitranDS = new typeorm_1.DataSource({
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
    entities: [
        __dirname + '/../sitran/models/**/*.entity.{ts,js}',
        parmetros_config_1.globalModels,
    ],
    migrations: [__dirname + '/../sitran/migrations/**/*{.ts,.js}'],
    migrationsTableName: 'migrations_api_v1',
});
exports.default = SitranDS;
//# sourceMappingURL=sitran_dataSource.js.map