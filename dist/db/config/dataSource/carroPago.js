"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const parmetros_config_1 = require("../parmetros.config");
require("dotenv/config");
const { DB_HOST_CARRO, DB_USER_CARRO, DB_PASS_CARRO, DB_DATA_CARRO } = process.env;
const CarropagoDS = new typeorm_1.DataSource({
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
    entities: parmetros_config_1.entitiesAgregadores,
    migrations: parmetros_config_1.migrationsAgregadores,
    subscribers: ['./db/subscriber/**/*.ts'],
    migrationsTableName: 'migrations_api_v1',
});
exports.default = CarropagoDS;
//# sourceMappingURL=carroPago.js.map