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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Agenda = class Agenda {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ primary: true, type: 'int' }),
    __metadata("design:type", Number)
], Agenda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.EntityColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Agenda.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.EntityColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Agenda.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.EntityColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Agenda.prototype, "idComercio", void 0);
__decorate([
    (0, typeorm_1.EntityColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Agenda.prototype, "idAliado", void 0);
__decorate([
    (0, typeorm_1.EntityColumn)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], Agenda.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.EntityColumn)({ type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], Agenda.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.EntityForeignKey)(() => Aliados, 'id'),
    __metadata("design:type", typeof (_a = typeof Aliados !== "undefined" && Aliados) === "function" ? _a : Object)
], Agenda.prototype, "fk_Agenda_Aliados", void 0);
__decorate([
    (0, typeorm_1.EntityForeignKey)(() => Comercios, 'comerCod'),
    __metadata("design:type", typeof (_b = typeof Comercios !== "undefined" && Comercios) === "function" ? _b : Object)
], Agenda.prototype, "fk_Agenda_Comercios", void 0);
Agenda = __decorate([
    (0, typeorm_1.Entity)()
], Agenda);
exports.default = Agenda;
//# sourceMappingURL=agenda.entity%20copy.js.map