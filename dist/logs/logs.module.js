"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const general_logs_api_entity_1 = require("../db/global/models/general_logs_api.entity");
const logs_service_1 = require("./logs.service");
let LogsModule = class LogsModule {
};
LogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([general_logs_api_entity_1.default]),
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_KEY,
                signOptions: { expiresIn: '4h' },
            }),
        ],
        providers: [logs_service_1.LogsService],
        exports: [logs_service_1.LogsService],
    })
], LogsModule);
exports.LogsModule = LogsModule;
//# sourceMappingURL=logs.module.js.map