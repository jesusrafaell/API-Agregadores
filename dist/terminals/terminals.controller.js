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
exports.TerminalsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const logs_service_1 = require("../logs/logs.service");
const create_terminals_dto_1 = require("./dto/create-terminals.dto");
const put_terminals_dto_1 = require("./dto/put-terminals.dto");
const terminals_service_1 = require("./terminals.service");
let TerminalsController = class TerminalsController {
    constructor(_TerminalsService, logService, DS, cacheService) {
        this._TerminalsService = _TerminalsService;
        this.logService = logService;
        this.DS = DS;
        this.cacheService = cacheService;
    }
    async createTerminals(token, req, body) {
        const header = this.logService.getDataToken(token, req, this.DS);
        return this._TerminalsService.createTerminals(body.comerRif, body.comerCantPost, body.comerCuentaBanco, body.prefijo, header);
    }
    async getAllTerminal(token, req) {
        const header = this.logService.getDataToken(token, req, this.DS);
        return this._TerminalsService.getAllTerminals(header);
    }
    async PutChangeBank(token, params, body, req) {
        const header = this.logService.getDataToken(token, req, this.DS);
        return this._TerminalsService.updateAccountNumber(params.terminal, body.comerCuentaBanco, header);
    }
    async PutChangeStatus(token, req, params, body) {
        const header = this.logService.getDataToken(token, req, this.DS);
        console.log('Data', params.terminal, body.status);
        return this._TerminalsService.updateStatus(params.terminal, body.status, header);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_terminals_dto_1.CreateTerminalsDto]),
    __metadata("design:returntype", Promise)
], TerminalsController.prototype, "createTerminals", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TerminalsController.prototype, "getAllTerminal", null);
__decorate([
    (0, common_1.Put)('/bank/:terminal'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, put_terminals_dto_1.TerminalDto,
        put_terminals_dto_1.CuentaNumeroDto, Object]),
    __metadata("design:returntype", Promise)
], TerminalsController.prototype, "PutChangeBank", null);
__decorate([
    (0, common_1.Put)('/status/:terminal'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_terminals_dto_1.ParamTermDto,
        create_terminals_dto_1.BodyTermStatusDto]),
    __metadata("design:returntype", Promise)
], TerminalsController.prototype, "PutChangeStatus", null);
TerminalsController = __decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('terminal'),
    __param(2, (0, common_1.Inject)('DS')),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [terminals_service_1.TerminalsService,
        logs_service_1.LogsService, Object, Object])
], TerminalsController);
exports.TerminalsController = TerminalsController;
//# sourceMappingURL=terminals.controller.js.map