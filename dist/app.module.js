"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const agregadores_module_1 = require("./agregadores/agregadores.module");
const auth_module_1 = require("./auth/auth.module");
const commerce_module_1 = require("./commerce/commerce.module");
const terminals_module_1 = require("./terminals/terminals.module");
const testAPi_module_1 = require("./testAPI/testAPi.module");
let AppModule = AppModule_1 = class AppModule {
    static forRoot(config) {
        const DS = config.DS;
        const cacheOptions = {
            isGlobal: true,
            store: 'memory',
            max: 100,
            ttl: null,
        };
        return {
            module: AppModule_1,
            imports: [common_1.CacheModule.register(cacheOptions)],
            providers: [
                {
                    provide: 'DS',
                    useValue: DS,
                },
            ],
            exports: ['DS'],
        };
    }
};
AppModule = AppModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register({ isGlobal: true }),
            testAPi_module_1.TestApiModule,
            auth_module_1.AuthModule,
            commerce_module_1.CommerceModule,
            terminals_module_1.TerminalsModule,
            agregadores_module_1.AgregadoresModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map