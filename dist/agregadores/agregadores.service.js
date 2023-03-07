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
exports.AgregadoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../db/config/dataSource");
const agregador_entity_1 = require("../db/sitran/models/agregador.entity");
const barrProcess_1 = require("../utils/barrProcess");
const typeorm_2 = require("@nestjs/typeorm");
let AgregadoresService = class AgregadoresService {
    constructor(cacheService, agregadorRepository) {
        this.cacheService = cacheService;
        this.agregadorRepository = agregadorRepository;
    }
    async all() {
        return await this.agregadorRepository.find({
            where: {
                isAgr: 1,
                db: (0, typeorm_1.Not)('MILPAGOS'),
            },
        });
    }
    async create() {
        const newAgregador = {
            id: 10,
            name: 'nuevoAgregador',
            key: 10,
            host: '10.198.72.11',
            db: 'NUEVOAGREDADOR',
            isAgr: 1,
            active: 1,
        };
        try {
            console.log('call bug1');
            const newDS = (0, dataSource_1.createTablesAgregador)(newAgregador.host, newAgregador.db);
            console.log('call bug2');
            await newDS.initialize();
            console.log('call bug3');
            console.log('Se creo', newDS.options.database);
            return {
                id: newAgregador.id,
                DS: newDS,
            };
        }
        catch (err) {
            console.log('call bug4');
            console.log(err);
        }
    }
    async saveAgrInCache(item, dataAgr) {
        await this.cacheService.set(item, dataAgr);
        const ds = await this.cacheService.get(item);
        console.log('✅  Cache:', item, '->', ds.options.database);
    }
    async start() {
        try {
            const agregadores = await this.all();
            console.log(agregadores.length, 'Agregadores:');
            let listDS;
            agregadores.forEach((agr) => {
                listDS = Object.assign(Object.assign({}, listDS), { [agr.id]: (0, dataSource_1.default)(agr.host, agr.db) });
            });
            await (0, barrProcess_1.BarProcess)(listDS, async (item, DS) => {
                try {
                    await DS.initialize();
                    await this.cacheService.set(item, DS);
                }
                catch (err) {
                    throw err;
                }
            });
            console.log('Ready, initialize');
            agregadores.forEach(async (item) => {
                const ds = await this.cacheService.get(`${item.id}`);
                console.log('✅  Cache:', item.id, '->', ds.options.database);
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
AgregadoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_2.InjectRepository)(agregador_entity_1.default)),
    __metadata("design:paramtypes", [Object, typeorm_1.Repository])
], AgregadoresService);
exports.AgregadoresService = AgregadoresService;
//# sourceMappingURL=agregadores.service.js.map