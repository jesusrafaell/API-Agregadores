"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalsModule = void 0;
const common_1 = require("@nestjs/common");
const terminals_service_1 = require("./terminals.service");
const terminals_controller_1 = require("./terminals.controller");
const abono_module_1 = require("../abono/abono.module");
const commerce_module_1 = require("../commerce/commerce.module");
const logs_module_1 = require("../logs/logs.module");
let TerminalsModule = class TerminalsModule {
};
TerminalsModule = __decorate([
    (0, common_1.Module)({
        imports: [commerce_module_1.CommerceModule, abono_module_1.AbonoModule, logs_module_1.LogsModule],
        controllers: [terminals_controller_1.TerminalsController],
        providers: [terminals_service_1.TerminalsService],
        exports: [terminals_service_1.TerminalsService],
    })
], TerminalsModule);
exports.TerminalsModule = TerminalsModule;
//# sourceMappingURL=terminals.module.js.map