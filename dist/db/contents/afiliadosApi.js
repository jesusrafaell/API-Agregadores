"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const afiliados_api_entity_1 = require("../models/afiliados_api.entity");
async function default_1(DS, data) {
    const valid = await DS.getRepository(afiliados_api_entity_1.default).find();
    if (!valid.length)
        await DS.getRepository(afiliados_api_entity_1.default).save(data);
    console.log('Listo afiliados');
}
exports.default = default_1;
//# sourceMappingURL=afiliadosApi.js.map