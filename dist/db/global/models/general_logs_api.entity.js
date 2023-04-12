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
const origin_logs_api_entity_1 = require("./origin_logs_api.entity");
let general_logs_api = class general_logs_api {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], general_logs_api.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], general_logs_api.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], general_logs_api.prototype, "descript", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => origin_logs_api_entity_1.default, (origin_logs) => origin_logs.general_logs),
    (0, typeorm_1.JoinColumn)({ name: 'id_origin_logs' }),
    __metadata("design:type", Number)
], general_logs_api.prototype, "id_origin_logs", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], general_logs_api.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], general_logs_api.prototype, "updatedAt", void 0);
general_logs_api = __decorate([
    (0, typeorm_1.Entity)('general_logs_api', { synchronize: false })
], general_logs_api);
exports.default = general_logs_api;
//# sourceMappingURL=general_logs_api.entity.js.map