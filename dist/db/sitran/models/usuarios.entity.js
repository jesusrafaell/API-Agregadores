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
const agregador_entity_1 = require("./agregador.entity");
const profile_entity_1 = require("./profile.entity");
const status_entity_1 = require("./status.entity");
let Usuarios = class Usuarios {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuarios.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "id_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "ident", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Usuarios.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Usuarios.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => status_entity_1.default, (status) => status.usuarios),
    __metadata("design:type", status_entity_1.default)
], Usuarios.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profile_entity_1.default, (profile) => profile.usuarios),
    __metadata("design:type", profile_entity_1.default)
], Usuarios.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agregador_entity_1.default, (agr) => agr.usuarios),
    __metadata("design:type", agregador_entity_1.default)
], Usuarios.prototype, "agregador", void 0);
Usuarios = __decorate([
    (0, typeorm_1.Entity)({ synchronize: false })
], Usuarios);
exports.default = Usuarios;
//# sourceMappingURL=usuarios.entity.js.map