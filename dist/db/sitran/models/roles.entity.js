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
const profile_entity_1 = require("./profile.entity");
let Roles = class Roles {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Roles.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Roles.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => profile_entity_1.default, (profile) => profile.rol),
    __metadata("design:type", Array)
], Roles.prototype, "profiles", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Roles.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Roles.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Roles.prototype, "updatedAt", void 0);
Roles = __decorate([
    (0, typeorm_1.Entity)({ synchronize: false })
], Roles);
exports.default = Roles;
//# sourceMappingURL=roles.entity.js.map