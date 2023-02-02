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
let Parametro_Terminal = class Parametro_Terminal {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Parametro_Terminal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Parametro_Terminal.prototype, "prefijo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Parametro_Terminal.prototype, "provedor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Parametro_Terminal.prototype, "tipoPos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Parametro_Terminal.prototype, "modo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Parametro_Terminal.prototype, "tecladoAbierto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Parametro_Terminal.prototype, "usuarioResponsable", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Parametro_Terminal.prototype, "updatedAt", void 0);
Parametro_Terminal = __decorate([
    (0, typeorm_1.Entity)('Parametro_Terminal', { synchronize: false })
], Parametro_Terminal);
exports.default = Parametro_Terminal;
//# sourceMappingURL=parametro_terminal.entity.js.map