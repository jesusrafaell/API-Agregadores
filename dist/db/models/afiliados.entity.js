"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Afiliados = class Afiliados {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], Afiliados.prototype, "afiCod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliados.prototype, "afiDesc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Afiliados.prototype, "afiCodTipoPer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliados.prototype, "afiFreg", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliados.prototype, "afiCodBan", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Afiliados.prototype, "afiNroCuenta", void 0);
Afiliados = __decorate([
    (0, typeorm_1.Entity)({ synchronize: false })
], Afiliados);
exports.default = Afiliados;
//# sourceMappingURL=afiliados.entity.js.map