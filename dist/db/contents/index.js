"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const barrProcess_1 = require("../../utils/barrProcess");
const dataSource_1 = require("../config/dataSource");
const sitran_dataSource_1 = require("../config/sitran_dataSource");
const agregador_entity_1 = require("../sitran/models/agregador.entity");
sitran_dataSource_1.default.initialize()
    .then(async (DS) => {
    try {
        console.log('Sitran');
        const agregadores = await DS.getRepository(agregador_entity_1.default).find({
            where: {
                isAgr: 1,
                db: (0, typeorm_1.Not)('MILPAGOS'),
            },
        });
        console.log(agregadores.length, 'Agregadores:');
        let listDS;
        agregadores.forEach((agr) => {
            listDS = Object.assign(Object.assign({}, listDS), { [agr.id]: (0, dataSource_1.default)(agr.host, agr.db) });
        });
        await (0, barrProcess_1.BarProcess)(listDS, async (item, DS) => {
            try {
                await DS.initialize();
            }
            catch (err) {
                console.log(`Error in int ${DS.options.database}`, err);
                throw err;
            }
        });
        console.log('Ready, initialize');
        for (let i = 0; i < Object.keys(listDS).length; i++) {
            const DS = Object.values(listDS)[i];
            console.log(DS.options.database);
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    console.log('OK');
    process.exit();
})
    .catch((err) => {
    console.log(err);
    process.exit();
});
//# sourceMappingURL=index.js.map