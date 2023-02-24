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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommerceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const new_commerce_dto_1 = require("./dto/new-commerce.dto");
const commerce_service_1 = require("./commerce.service");
const logs_service_1 = require("../logs/logs.service");
const dto_1 = require("./dto");
let CommerceController = class CommerceController {
    constructor(_commerceService, logService, DS, cacheService) {
        this._commerceService = _commerceService;
        this.logService = logService;
        this.DS = DS;
        this.cacheService = cacheService;
    }
    async createCommerce(token, req, body) {
        const header = this.logService.getDataToken(token, req, this.DS);
        return this._commerceService.createCommerce(body, header);
    }
    async getCommerce(token, req, params) {
        const header = this.logService.getDataToken(token, req, this.DS);
        return this._commerceService.getCommerceData(params.comerRif, header);
    }
    async getCommercePost(token, req, params) {
        const header = this.logService.getDataToken(token, req, this.DS);
        return this._commerceService.getCommerceData(params.comerRif, header);
    }
    async getAllCommerce(token, req) {
        const header = this.logService.getDataToken(token, req, this.DS);
        return this._commerceService.getAllCommerce(header);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, new_commerce_dto_1.CommerceDto]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "createCommerce", null);
__decorate([
    (0, common_1.Get)('/rif/:comerRif'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.RifDto]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "getCommerce", null);
__decorate([
    (0, common_1.Post)('/rif/:comerRif'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.RifDto]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "getCommercePost", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "getAllCommerce", null);
CommerceController = __decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Controller)('commerce'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(2, (0, common_1.Inject)('DS')),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [commerce_service_1.CommerceService,
        logs_service_1.LogsService, Object, Object])
], CommerceController);
exports.CommerceController = CommerceController;
//# sourceMappingURL=commerce.controller.js.map