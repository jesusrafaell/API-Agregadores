"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const sitran_dataSource_1 = require("../../db/config/sitran_dataSource");
const usuarios_entity_1 = require("../../db/sitran/models/usuarios.entity");
require("dotenv/config");
let UsuariosService = class UsuariosService {
    async getUsuario(user) {
        return await sitran_dataSource_1.default.getRepository(usuarios_entity_1.default).findOne({
            where: { login: user.login },
            relations: ['status', 'profile', 'profile.department', 'agregador'],
        });
    }
    validatePerfil(user) {
        return (user.agregador &&
            user.profile.department.name === 'API' &&
            user.status.name === 'Activo');
    }
};
UsuariosService = __decorate([
    (0, common_1.Injectable)()
], UsuariosService);
exports.UsuariosService = UsuariosService;
//# sourceMappingURL=usuarios.service.js.map