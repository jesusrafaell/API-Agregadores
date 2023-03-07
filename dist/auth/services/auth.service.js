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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const usuarios_service_1 = require("../../usuarios/services/usuarios.service");
const logs_service_1 = require("../../logs/logs.service");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService, logService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logService = logService;
    }
    async jwtLogin(email, id, agr) {
        const payload = { email, sub: id, agr };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async login(user) {
        const usuario = await this.userService.getUsuario(user);
        if (!usuario)
            throw new common_1.UnauthorizedException('Usuario invalido');
        const validPassword = await (0, bcrypt_1.compare)(user.password, usuario.password);
        if (!validPassword) {
            throw new common_1.BadRequestException('Usuario o clave invalido');
        }
        const validPerfil = this.userService.validatePerfil(usuario);
        if (!validPerfil) {
            throw new common_1.UnauthorizedException('Este Usuario no tiene acceso al API');
        }
        const token = await this.jwtLogin(usuario.email, usuario.id, usuario.agregador);
        const log = {
            id: usuario.id,
            method: 'POST',
            path: '/auth/login',
            msg: `Login de Usuario: ${usuario.email}`,
        };
        await this.logService.saveLogsSitran(log);
        return {
            agr: usuario.agregador.name,
            access_token: token.access_token,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService,
        logs_service_1.LogsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map