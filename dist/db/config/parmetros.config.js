"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationsAgregadores = exports.entitiesAgregadores = exports.globalModels = void 0;
exports.globalModels = __dirname + '/../global/models/**/*.entity{.ts,.js}';
exports.entitiesAgregadores = [
    __dirname + '/../models/**/*.entity{.ts,.js}',
    exports.globalModels,
];
exports.migrationsAgregadores = [
    __dirname + '/../migrations/**/*{.ts,.js}',
];
//# sourceMappingURL=parmetros.config.js.map