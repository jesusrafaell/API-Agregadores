"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const configModule = [
    config_1.ConfigModule.forRoot({ isGlobal: true }),
    typeorm_1.TypeOrmModule.forRootAsync({
        imports: [config_1.ConfigModule],
        inject: [config_1.ConfigService],
        useFactory: () => ({
            type: 'mssql',
            host: process.env.DB_HOST,
            database: process.env.DB_DATA,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            logging: false,
            options: {
                encrypt: true,
            },
            extra: {
                trustServerCertificate: true,
            },
        }),
    }),
];
exports.default = configModule;
//# sourceMappingURL=configSitran.module.js.map