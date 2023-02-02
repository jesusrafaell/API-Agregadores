"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAgregadores = void 0;
const agregador_entity_1 = require("../sitran/models/agregador.entity");
exports.listAgregadores = [
    {
        name: 'Carropago',
        key: 1,
        host: '10.198.72.11',
        db: 'CARROPAGO',
        isAgr: 1,
    },
    {
        name: 'Milpagos',
        key: 2,
        host: '10.198.72.11',
        db: 'MILPAGOS',
        isAgr: 0,
    },
    {
        name: 'Librepago',
        key: 3,
        host: '10.198.72.11',
        db: 'LIBREPAGO',
        isAgr: 1,
    },
    {
        name: 'GSComputer',
        key: 4,
        host: '10.198.72.11',
        db: 'GSCOMPUTER',
        isAgr: 1,
    },
    {
        name: 'Tranred',
        key: 5,
        host: '10.198.72.11',
        db: 'SITRAN',
        isAgr: 0,
    },
    {
        name: 'DisGlobal',
        key: 5,
        host: '10.198.72.11',
        db: 'DISGLOBAL',
        isAgr: 1,
    },
    {
        name: 'ConsulTel',
        key: 5,
        host: '10.198.72.11',
        db: 'CONSULTEL',
        isAgr: 1,
    },
];
const agregadores = async (db) => {
    const valid = await db
        .getRepository(agregador_entity_1.default)
        .find({ where: exports.listAgregadores });
    if (!valid.length)
        await db.getRepository(agregador_entity_1.default).save(exports.listAgregadores);
    console.log('Agregadores ✅');
};
exports.default = agregadores;
//# sourceMappingURL=agregadores.js.map