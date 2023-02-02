"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const carroPago_1 = require("../config/dataSource/carroPago");
const consultel_1 = require("../config/dataSource/consultel");
const disglobal_1 = require("../config/dataSource/disglobal");
const gscomputer_1 = require("../config/dataSource/gscomputer");
const librePago_1 = require("../config/dataSource/librePago");
const sitran_dataSource_1 = require("../config/sitran_dataSource");
const afi_carropago_1 = require("./afiliados/afi_carropago");
const afi_gscomputer_1 = require("./afiliados/afi_gscomputer");
const afi_librepago_1 = require("./afiliados/afi_librepago");
const afiliadosApi_1 = require("./afiliadosApi");
const origin_logs_1 = require("./origin_logs");
sitran_dataSource_1.default.initialize()
    .then(async (DS) => {
    console.log('Sitran');
    await (0, origin_logs_1.default)(DS);
    await librePago_1.default.initialize()
        .then(async (DS) => {
        console.log('LibrePago');
        await (0, afiliadosApi_1.default)(DS, afi_librepago_1.default);
        await (0, origin_logs_1.default)(DS);
    })
        .catch((error) => {
        console.log(error);
        process.exit();
    });
    await carroPago_1.default.initialize()
        .then(async (DS) => {
        console.log('Carropago');
        await (0, afiliadosApi_1.default)(DS, afi_carropago_1.default);
        await (0, origin_logs_1.default)(DS);
    })
        .catch((error) => {
        console.log(error);
        process.exit();
    });
    await gscomputer_1.default.initialize()
        .then(async (DS) => {
        console.log('GSComputer');
        await (0, afiliadosApi_1.default)(DS, afi_gscomputer_1.default);
        await (0, origin_logs_1.default)(DS);
    })
        .catch((error) => {
        console.log(error);
        process.exit();
    });
    await disglobal_1.default.initialize()
        .then(async (DS) => {
        console.log('Disglobal');
        await (0, afiliadosApi_1.default)(DS, afi_gscomputer_1.default);
        await (0, origin_logs_1.default)(DS);
    })
        .catch((error) => {
        console.log(error);
        process.exit();
    });
    await consultel_1.default.initialize()
        .then(async (DS) => {
        console.log('Consultel');
        await (0, afiliadosApi_1.default)(DS, afi_gscomputer_1.default);
        await (0, origin_logs_1.default)(DS);
    })
        .catch((error) => {
        console.log(error);
        process.exit();
    });
    process.exit();
})
    .catch((err) => {
    console.log(err);
    process.exit();
});
//# sourceMappingURL=index.js.map