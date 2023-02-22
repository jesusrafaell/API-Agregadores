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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregadoresContronller = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const agregadores_service_1 = require("./agregadores.service");
const agregador_entity_1 = require("../db/sitran/models/agregador.entity");
const sitran_dataSource_1 = require("../db/config/sitran_dataSource");
const dataSource_1 = require("../db/config/dataSource");
let AgregadoresContronller = class AgregadoresContronller {
    constructor(agreadoresService, cacheService, DS) {
        this.agreadoresService = agreadoresService;
        this.cacheService = cacheService;
        this.DS = DS;
        const init = async () => {
            for (const item in DS) {
                const dataAgr = DS[item];
                await this.cacheService.set(item, dataAgr);
                const ds = await this.cacheService.get(item);
                console.log(`Cache ${item}  -> `, ds.options.database);
            }
        };
        init();
    }
    getAgregadores(token, req, body) {
        console.log('create', body);
        return this.agreadoresService.all();
    }
    async createAgregador() {
        const newDS = await this.agreadoresService.create();
        await this.cacheService.set(`${newDS.id}`, newDS.DS);
        const DS = await this.cacheService.get(`${newDS.id}`);
        console.log('in agreadores', DS.options.database);
        return { id: newDS.id, name: newDS.DS.options.database };
    }
    async reload() {
        const agregadores = await sitran_dataSource_1.default.getRepository(agregador_entity_1.default).find({
            where: {
                isAgr: 1,
            },
        });
        let listDS;
        for (const index in agregadores) {
            const item = agregadores[index];
            const id = item.id.toString();
            console.log(id);
            const ds = await this.cacheService.get(id);
            console.log(ds);
            if (!ds) {
                console.log('Create', item.db);
                listDS = Object.assign(Object.assign({}, listDS), { [item.id]: (0, dataSource_1.default)(item.host, item.db) });
            }
        }
        return { message: 'Reload Ready', total_agr: 0 };
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AgregadoresContronller.prototype, "getAgregadores", null);
__decorate([
    (0, common_1.Post)('create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgregadoresContronller.prototype, "createAgregador", null);
__decorate([
    (0, common_1.Post)('reload'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgregadoresContronller.prototype, "reload", null);
AgregadoresContronller = __decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Controller)('agregadores'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(2, (0, common_1.Inject)('DS')),
    __metadata("design:paramtypes", [agregadores_service_1.AgregadoresService, Object, Object])
], AgregadoresContronller);
exports.AgregadoresContronller = AgregadoresContronller;
//# sourceMappingURL=agregadores.controller.js.map