"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
require("dotenv/config");
const { DB_HOST_SITRAN, DB_USER_SITRAN, DB_PASS_SITRAN, DB_DATA_SITRAN } = process.env;
const configModule = [
    config_1.ConfigModule.forRoot({ isGlobal: true }),
    typeorm_1.TypeOrmModule.forRootAsync({
        imports: [config_1.ConfigModule],
        inject: [config_1.ConfigService],
        useFactory: () => ({
            type: 'mssql',
            host: DB_HOST_SITRAN,
            username: DB_USER_SITRAN,
            password: DB_PASS_SITRAN,
            database: DB_DATA_SITRAN,
            logging: false,
            options: {
                encrypt: true,
            },
            extra: {
                trustServerCertificate: true,
            },
            migrationsTableName: 'migrations_api_v1',
        }),
    }),
];
exports.default = configModule;
//# sourceMappingURL=configSitran.module.js.map