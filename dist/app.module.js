"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const agregadores_module_1 = require("./agregadores/agregadores.module");
const auth_module_1 = require("./auth/auth.module");
const commerce_module_1 = require("./commerce/commerce.module");
const terminals_module_1 = require("./terminals/terminals.module");
const config_1 = require("@nestjs/config");
const agregador_entity_1 = require("./db/sitran/models/agregador.entity");
const usuarios_entity_1 = require("./db/sitran/models/usuarios.entity");
const status_entity_1 = require("./db/sitran/models/status.entity");
const profile_entity_1 = require("./db/sitran/models/profile.entity");
const department_entity_1 = require("./db/sitran/models/department.entity");
const roles_entity_1 = require("./db/sitran/models/roles.entity");
const general_logs_api_entity_1 = require("./db/global/models/general_logs_api.entity");
const origin_logs_api_entity_1 = require("./db/global/models/origin_logs_api.entity");
const cache_module_1 = require("./cache/cache.module");
require("dotenv/config");
const modeloPos_module_1 = require("./ModeloPos/modeloPos.module");
const { DB_HOST_SITRAN, DB_USER_SITRAN, DB_PASS_SITRAN, DB_DATA_SITRAN } = process.env;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
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
                    entities: [
                        usuarios_entity_1.default,
                        status_entity_1.default,
                        profile_entity_1.default,
                        agregador_entity_1.default,
                        department_entity_1.default,
                        roles_entity_1.default,
                        general_logs_api_entity_1.default,
                        origin_logs_api_entity_1.default,
                    ],
                    migrationsTableName: 'migrations_api_v1',
                }),
            }),
            cache_module_1.MyCacheModule,
            agregadores_module_1.AgregadoresModule,
            auth_module_1.AuthModule,
            commerce_module_1.CommerceModule,
            terminals_module_1.TerminalsModule,
            modeloPos_module_1.ModelPosModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map