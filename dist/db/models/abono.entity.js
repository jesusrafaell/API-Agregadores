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
let Abonos = class Abonos {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Abonos.prototype, "aboCod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Abonos.prototype, "aboTerminal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Abonos.prototype, "aboCodAfi", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Abonos.prototype, "aboCodComercio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Abonos.prototype, "aboCodBanco", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Abonos.prototype, "aboNroCuenta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Abonos.prototype, "aboTipoCuenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Abonos.prototype, "aboFreg", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Abonos.prototype, "estatusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Abonos.prototype, "pagoContado", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'NOW()' }),
    __metadata("design:type", Date)
], Abonos.prototype, "fechaPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Abonos.prototype, "montoEquipoUSD", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Abonos.prototype, "ivaEquipoBs", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], Abonos.prototype, "montoTotalEquipoBs", void 0);
Abonos = __decorate([
    (0, typeorm_1.Entity)({ synchronize: false })
], Abonos);
exports.default = Abonos;
//# sourceMappingURL=abono.entity.js.map