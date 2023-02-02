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
const department_entity_1 = require("./department.entity");
const roles_entity_1 = require("./roles.entity");
const usuarios_entity_1 = require("./usuarios.entity");
let Profile = class Profile {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usuarios_entity_1.default, (usuario) => usuario.profile),
    __metadata("design:type", Array)
], Profile.prototype, "usuarios", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.default, (department) => department.profiles),
    (0, typeorm_1.JoinColumn)({ name: 'department' }),
    __metadata("design:type", department_entity_1.default)
], Profile.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roles_entity_1.default, (roles) => roles.profiles),
    (0, typeorm_1.JoinColumn)({ name: 'rol' }),
    __metadata("design:type", roles_entity_1.default)
], Profile.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "updatedAt", void 0);
Profile = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['department', 'rol'], { unique: true })
], Profile);
exports.default = Profile;
//# sourceMappingURL=profile.entity.js.map