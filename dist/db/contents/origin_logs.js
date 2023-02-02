"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const origin_logs_api_entity_1 = require("../global/models/origin_logs_api.entity");
const data = {
    name: 'API TRANRED',
};
const origin_logs = async (appDataSource) => {
    const valid = await appDataSource
        .getRepository(origin_logs_api_entity_1.default)
        .findOne({ where: data });
    if (!valid)
        await appDataSource.getRepository(origin_logs_api_entity_1.default).save(data);
    console.log('Listo origin_logs');
};
exports.default = origin_logs;
//# sourceMappingURL=origin_logs.js.map