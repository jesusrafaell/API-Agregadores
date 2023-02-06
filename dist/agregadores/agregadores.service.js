"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregadoresService = void 0;
const common_1 = require("@nestjs/common");
const dataSource_1 = require("../db/config/dataSource");
const sitran_dataSource_1 = require("../db/config/sitran_dataSource");
const agregador_entity_1 = require("../db/sitran/models/agregador.entity");
let AgregadoresService = class AgregadoresService {
    async all() {
        return await sitran_dataSource_1.default.getRepository(agregador_entity_1.default).find();
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
};
AgregadoresService = __decorate([
    (0, common_1.Injectable)()
], AgregadoresService);
exports.AgregadoresService = AgregadoresService;
//# sourceMappingURL=agregadores.service.js.map