"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conections = void 0;
const typeorm_1 = require("typeorm");
const barrProcess_1 = require("../../utils/barrProcess");
const agregador_entity_1 = require("../sitran/models/agregador.entity");
const dataSource_1 = require("./dataSource");
const sitran_dataSource_1 = require("./sitran_dataSource");
const Conections = async () => {
    try {
        await sitran_dataSource_1.default.initialize();
        console.log('✅ DB:SITRAN');
        const agregadores = await sitran_dataSource_1.default.getRepository(agregador_entity_1.default).find({
            where: {
                isAgr: 1,
                db: (0, typeorm_1.Not)('DISGLOBAL'),
            },
        });
        console.log(agregadores.length, 'Agregadores:');
        let listDS;
        agregadores.forEach((agr) => {
            listDS = Object.assign(Object.assign({}, listDS), { [agr.id]: (0, dataSource_1.default)(agr.host, agr.db) });
        });
        await (0, barrProcess_1.default)(listDS);
        console.log('Connected');
        agregadores.forEach((item) => {
            console.log('✅ DB:' + item.db);
        });
        return listDS;
    }
    catch (err) {
        console.log(err);
        throw err.msg ? { msg: err.msg } : err;
    }
};
exports.Conections = Conections;
//# sourceMappingURL=index.js.map