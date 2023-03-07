"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conections = void 0;
const sitran_dataSource_1 = require("./sitran_dataSource");
const Conections = async () => {
    try {
        await sitran_dataSource_1.default.initialize();
        console.log('✅ DB:SITRAN');
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
exports.Conections = Conections;
//# sourceMappingURL=index.js.map