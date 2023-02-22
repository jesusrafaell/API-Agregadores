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
const barrProcess_1 = require("../utils/barrProcess");
const afiliados_api_entity_1 = require("../db/models/afiliados_api.entity");
let AgregadoresContronller = class AgregadoresContronller {
    constructor(agreadoresService, cacheService, DS) {
        this.agreadoresService = agreadoresService;
        this.cacheService = cacheService;
        this.DS = DS;
        const init = async () => this.saveAgrInCache();
        init();
    }
    async saveAgrInCache(_DS) {
        const DS = _DS ? _DS : this.DS;
        const list = [];
        for (const item in DS) {
            const dataAgr = DS[item];
            await this.cacheService.set(item, dataAgr);
            list.push(dataAgr.options.database);
            const ds = await this.cacheService.get(item);
            console.log('Cache', item, '->', ds.options.database);
        }
        return list;
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
            const ds = await this.cacheService.get(id);
            if (!ds) {
                console.log('Create', id, item.db);
                listDS = Object.assign(Object.assign({}, listDS), { [item.id]: (0, dataSource_1.default)(item.host, item.db) });
            }
        }
        if (listDS) {
            try {
                await (0, barrProcess_1.default)(listDS);
                const new_agr = await this.saveAgrInCache(listDS);
                return { message: 'Reload Ready', new_agr };
            }
            catch (err) {
                return { message: `Error in Init DB ${err.msg}` };
            }
        }
        else {
            return { message: 'No hay nuevo agregador' };
        }
    }
    async status() {
        const agregadores = await sitran_dataSource_1.default.getRepository(agregador_entity_1.default).find({
            where: {
                isAgr: 1,
            },
        });
        let listDS;
        for (const index in agregadores) {
            const item = agregadores[index];
            const id = item.id.toString();
            const ds = await this.cacheService.get(id);
            let testDB = false;
            if (ds) {
                try {
                    await ds.getRepository(afiliados_api_entity_1.default).find();
                    testDB = true;
                }
                catch (err) {
                    console.log('Error DB');
                }
            }
            listDS = Object.assign(Object.assign({}, listDS), { [item.db]: {
                    cache: ds ? 'On' : 'Off',
                    db: testDB ? 'On' : 'Off',
                } });
        }
        return { listStatus: listDS };
    }
    async restartConnection() {
        const agregadores = await sitran_dataSource_1.default.getRepository(agregador_entity_1.default).find({
            where: {
                isAgr: 1,
            },
        });
        let listDS;
        for (const index in agregadores) {
            const item = agregadores[index];
            const id = item.id.toString();
            const ds = await this.cacheService.get(id);
            if (ds) {
                try {
                    await ds.getRepository(afiliados_api_entity_1.default).find();
                }
                catch (err) {
                    console.log('Add for reInit', id, item.db);
                    listDS = Object.assign(Object.assign({}, listDS), { [item.id]: (0, dataSource_1.default)(item.host, item.db) });
                }
            }
        }
        if (listDS) {
            try {
                await (0, barrProcess_1.default)(listDS);
                const list_resets = await this.saveAgrInCache(listDS);
                return { message: 'Reload Ready', list_resets };
            }
            catch (err) {
                return { message: 'Error in reset DB' };
            }
        }
        return { message: 'Not DB Reset' };
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
    (0, common_1.Get)('reload'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgregadoresContronller.prototype, "reload", null);
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgregadoresContronller.prototype, "status", null);
__decorate([
    (0, common_1.Get)('restartConnection'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgregadoresContronller.prototype, "restartConnection", null);
AgregadoresContronller = __decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Controller)('agregadores'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(2, (0, common_1.Inject)('DS')),
    __metadata("design:paramtypes", [agregadores_service_1.AgregadoresService, Object, Object])
], AgregadoresContronller);
exports.AgregadoresContronller = AgregadoresContronller;
//# sourceMappingURL=agregadores.controller.js.map