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
exports.TerminalsService = void 0;
const common_1 = require("@nestjs/common");
const commerce_service_1 = require("../commerce/commerce.service");
const abono_service_1 = require("../abono/abono.service");
const logs_service_1 = require("../logs/logs.service");
require("dotenv/config");
const axios_1 = require("axios");
const abono_entity_1 = require("../db/models/abono.entity");
const bancos_entity_1 = require("../db/models/bancos.entity");
const validAcoountBank_1 = require("../utils/functions/validAcoountBank");
const { REACT_APP_APIURL_APT } = process.env;
let TerminalsService = class TerminalsService {
    constructor(logService, commerceService, abonoService) {
        this.logService = logService;
        this.commerceService = commerceService;
        this.abonoService = abonoService;
    }
    async createTerminals(comerRif, comerCantPost, comerCuentaBanco, prefijo, header) {
        const { DS } = header;
        const commerce = await this.commerceService.getCommerce(comerRif, DS);
        if (!commerce)
            throw new common_1.BadRequestException(`Comercio [${comerRif}] no se encuentra registrado`);
        const afiliado = await this.commerceService.getAfiliadoByCommerce(commerce.comerCod, DS);
        if (!afiliado)
            throw new common_1.BadRequestException(`Comercio [${commerce.comerRif}] no tiene un numero de afiliado`);
        console.log('Afiliado', Number(afiliado.cxaCodAfi));
        if (comerCuentaBanco)
            await this.abonoService.validAccountNumber(comerCuentaBanco, DS);
        const aboNroCuenta = comerCuentaBanco || commerce.comerCuentaBanco;
        let termAPt;
        try {
            const resPref = await axios_1.default
                .post(`${REACT_APP_APIURL_APT}pref`, {
                name: header.agr,
            }, { headers: { authorization: header.token } })
                .catch(() => {
                throw new common_1.BadRequestException({
                    message: `El prefijo ${prefijo} no es valido para ${header.agr}`,
                });
            });
            const prefijos = resPref.data.Data;
            console.log('Resp APT', prefijos);
            const validPrefijo = prefijos.find((pref) => prefijo === `${pref.value}`);
            console.log(`Prefijo ${prefijo} -> ${validPrefijo ? 'Si' : 'No'}`);
            if (!validPrefijo) {
                throw new common_1.BadRequestException({
                    message: `El prefijo ${prefijo} no es valido para ${header.agr}`,
                });
            }
            console.log(`Crear  ${comerCantPost} Terminals`);
            const responseSP = await axios_1.default
                .post(`${REACT_APP_APIURL_APT}new`, {
                afiliado: `${Number(afiliado.cxaCodAfi)}`,
                cantidad: comerCantPost,
                prefijo,
            }, { headers: { authorization: header.token } })
                .catch((err) => {
                console.log('Error APT:', err);
                console.log('aqui', err.response.data.originalError);
                throw new common_1.BadRequestException({
                    message: 'APT: ' + err.message || 'Error APT',
                });
            });
            termAPt = responseSP.data.Terminal[0].split(',');
            console.log('APT api', termAPt);
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException({
                message: err.message || 'Error APT',
            });
        }
        if (!termAPt.length) {
            throw new common_1.NotFoundException('No hay termianles disponibles');
        }
        else {
            const abono = await this.abonoService.createAbono(termAPt, commerce, afiliado.cxaCodAfi, aboNroCuenta, DS);
            if (!abono || abono.code === 400) {
                throw new common_1.BadRequestException({
                    message: `Error al crear abono a los terminales, por favor contactar a Tranred`,
                    terminales: termAPt,
                });
            }
            if (abono.terminales.length > 0) {
                header.log.msg = `Se crearon ${termAPt.length} terminales`;
                await this.logService.saveLogs(header.log, DS);
                return abono;
            }
            throw new common_1.BadRequestException({
                message: abono.message,
            });
        }
    }
    async getAllTerminals(header) {
        const { DS } = header;
        const terminales = await DS.getRepository(abono_entity_1.default).find({
            select: ['aboTerminal', 'aboCodAfi', 'aboNroCuenta'],
        });
        if (!terminales.length) {
            throw new common_1.BadRequestException(`No existen terminales en abono`);
        }
        return {
            message: `Todas las Terminales`,
            terminales: terminales,
        };
    }
    async updateStatus(terminal, status, header) {
        const { DS } = header;
        const existTerm = await DS.getRepository(abono_entity_1.default).findOne({
            where: { aboTerminal: terminal },
        });
        if (!existTerm) {
            throw new common_1.BadRequestException(`No existe el terminal en ${header.agr}`);
        }
        await axios_1.default
            .post(`${REACT_APP_APIURL_APT}actdesc`, {
            terminal,
            estado: status ? '1' : '0',
            responsable: `API_T ${header.agr}`,
        }, { headers: { authorization: header.token } })
            .catch((err) => {
            console.log('Error APT:', err);
            console.log('aqui', err.response.data.originalError);
            throw new common_1.BadRequestException({
                message: 'APT: ' + err.message || 'Error APT',
            });
        });
        header.log.msg = `Se actualizaco el status ${terminal} a ${status ? 'Activo' : 'Inactivo'}`;
        await this.logService.saveLogs(header.log, DS);
        return {
            message: 'La actualizacion fue realizada con exito (tarda aprox 10 minutos)',
            terminal,
        };
    }
    async updateAccountNumber(terminal, comerCuentaBanco, header) {
        const { DS } = header;
        const abono = await DS.getRepository(abono_entity_1.default).findOne({
            where: { aboTerminal: terminal },
        });
        if (!abono)
            throw new common_1.BadRequestException('Terminal no existe');
        const aboCodBanco = comerCuentaBanco.slice(0, 4);
        const validBank = await DS.getRepository(bancos_entity_1.default).findOne({
            where: { banCodBan: aboCodBanco },
        });
        if (!validBank)
            throw new common_1.BadRequestException(`El codigo de banco [${aboCodBanco}] no existe`);
        if (!(0, validAcoountBank_1.isValid)(comerCuentaBanco)) {
            console.log(`Codigo de Control Invalido [${comerCuentaBanco}], banco: [${validBank.banDescBan}]`);
            throw new common_1.BadRequestException(`Codigo de Control Invalido [${comerCuentaBanco}], banco: [${validBank.banDescBan}]`);
        }
        await DS.getRepository(abono_entity_1.default).update(abono.aboCod, {
            aboNroCuenta: comerCuentaBanco,
            aboCodBanco,
        });
        header.log.msg = `Se modifco el nro. Cuenta [${terminal}] nuevo: [${comerCuentaBanco}] / antes:[${abono.aboNroCuenta}] `;
        await this.logService.saveLogs(header.log, DS);
        return {
            message: `Se actualizo el numero de cuenta banco: ${validBank.banDescBan}`,
            terminal: terminal,
        };
    }
};
TerminalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logs_service_1.LogsService,
        commerce_service_1.CommerceService,
        abono_service_1.AbonoService])
], TerminalsService);
exports.TerminalsService = TerminalsService;
//# sourceMappingURL=terminals.service.js.map