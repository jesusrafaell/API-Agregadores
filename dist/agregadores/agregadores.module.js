"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregadoresModule = void 0;
const common_1 = require("@nestjs/common");
const logs_module_1 = require("../logs/logs.module");
const agregadores_controller_1 = require("./agregadores.controller");
const agregadores_service_1 = require("./agregadores.service");
let AgregadoresModule = class AgregadoresModule {
};
AgregadoresModule = __decorate([
    (0, common_1.Module)({
        imports: [logs_module_1.LogsModule],
        controllers: [agregadores_controller_1.AgregadoresContronller],
        providers: [agregadores_service_1.AgregadoresService],
        exports: [agregadores_service_1.AgregadoresService],
    })
], AgregadoresModule);
exports.AgregadoresModule = AgregadoresModule;
//# sourceMappingURL=agregadores.module.js.map