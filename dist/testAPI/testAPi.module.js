"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApiModule = void 0;
const common_1 = require("@nestjs/common");
const TestApi_service_1 = require("./TestApi.service");
const testApi_controller_1 = require("./testApi.controller");
let TestApiModule = class TestApiModule {
};
TestApiModule = __decorate([
    (0, common_1.Module)({
        controllers: [testApi_controller_1.TestApiController],
        providers: [TestApi_service_1.TestApiService],
        exports: [TestApi_service_1.TestApiService],
    })
], TestApiModule);
exports.TestApiModule = TestApiModule;
//# sourceMappingURL=testAPi.module.js.map