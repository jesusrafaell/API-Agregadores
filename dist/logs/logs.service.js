"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const general_logs_api_entity_1 = require("../db/global/models/general_logs_api.entity");
let LogsService = class LogsService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.getDataTokenCache = async (headerToken, req, cacheService) => {
            try {
                const token = headerToken.replace('Bearer ', '');
                const decode = this.jwtService.decode(token);
                const { sub, agr } = decode;
                console.log('id Agr:', agr.id);
                const DS = await cacheService.get(`${agr.id}`);
                console.log('Agredador en cache DS', DS.options.database);
                if (!DS) {
                    console.log('No existe el agreador');
                    throw new common_1.BadRequestException(`No existe el agreador`);
                }
                return {
                    DS: DS,
                    agr: agr.name,
                    idAgr: agr.id,
                    token,
                    log: {
                        id: sub,
                        method: req.method,
                        path: req.url,
                        msg: '',
                    },
                };
            }
            catch (err) {
                throw new common_1.UnauthorizedException(err.mesasge || 'Agredaor no autorizado');
            }
        };
    }
    async saveLogsToken(log) {
        console.log(log);
    }
    async saveLogs(log, DS) {
        const { id, method, path, msg } = log;
        const dataLog = {
            id_user: id,
            descript: `[method:${method}]::[path:${path}]::[msg:${msg}]`,
            id_origin_logs: 1,
        };
        try {
            await DS.getRepository(general_logs_api_entity_1.default).save(dataLog);
        }
        catch (err) {
            console.log({ msg: `Error en guardar en log`, log: dataLog });
        }
    }
};
LogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], LogsService);
exports.LogsService = LogsService;
//# sourceMappingURL=logs.service.js.map