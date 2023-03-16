"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbonoService = void 0;
const common_1 = require("@nestjs/common");
const abono_entity_1 = require("../db/models/abono.entity");
const bancos_entity_1 = require("../db/models/bancos.entity");
const validAcoountBank_1 = require("../utils/functions/validAcoountBank");
let AbonoService = class AbonoService {
    async createAbono(terminal, commerce, cxaCodAfi, aboNroCuenta, DS) {
        try {
            const aboCodBanco = aboNroCuenta.slice(0, 4);
            await DS.getRepository(abono_entity_1.default).save({
                aboTerminal: terminal,
                aboCodAfi: cxaCodAfi,
                aboCodComercio: commerce.comerCod,
                aboCodBanco: aboCodBanco,
                aboNroCuenta: aboNroCuenta,
                aboTipoCuenta: '01',
                estatusId: 23,
            });
            const info = {
                message: '',
            };
            info.message = `${commerce.comerRif} Terminal creado`;
            info.terminal = terminal;
            return info;
        }
        catch (e) {
            console.log('Abono error:', e);
            return {
                message: `Error al crear abono a los terminales, por favor contactar a Tranred`,
                code: 400,
            };
        }
    }
    async createAbonos(terminals, commerce, cxaCodAfi, aboNroCuenta, DS) {
        try {
            console.log('crear abono');
            const aboCodBanco = aboNroCuenta.slice(0, 4);
            const abono = terminals.map((terminal) => ({
                aboTerminal: terminal,
                aboCodAfi: cxaCodAfi,
                aboCodComercio: commerce.comerCod,
                aboCodBanco: aboCodBanco,
                aboNroCuenta: aboNroCuenta,
                aboTipoCuenta: '01',
                estatusId: 23,
            }));
            console.log('nuevos', terminals);
            const abonosSaves = await DS.getRepository(abono_entity_1.default).save(abono);
            const info = {
                message: '',
            };
            info.message = `${commerce.comerRif} Terminales creados: ${abonosSaves.length}`;
            return info;
        }
        catch (e) {
            console.log('Abono error:', e);
            return {
                message: `Error al crear abono a los terminales, por favor contactar a Tranred`,
                code: 400,
            };
        }
    }
    async validAccountNumber(comerCuentaBanco, DS) {
        const aboCodBanco = comerCuentaBanco.slice(0, 4);
        const validBank = await DS.getRepository(bancos_entity_1.default).findOne({
            where: { banCodBan: aboCodBanco },
        });
        if (!validBank) {
            console.log(`Code Bank invalid [${aboCodBanco}]`);
            throw new common_1.BadRequestException(`Code Bank invalid [${aboCodBanco}]`);
        }
        if (!(0, validAcoountBank_1.isValid)(comerCuentaBanco)) {
            console.log(`Codigo de Control Invalido [${comerCuentaBanco}], banco: [${validBank.banDescBan}]`);
            throw new common_1.BadRequestException(`Codigo de Control Invalido [${comerCuentaBanco}], banco: [${validBank.banDescBan}]`);
        }
        return validBank;
    }
    async getAbonosByCommerce(comerCod, DS) {
        return await DS.getRepository(abono_entity_1.default).find({
            select: ['aboTerminal', 'aboCodBanco', 'aboNroCuenta'],
            where: {
                aboCodComercio: comerCod,
            },
        });
    }
};
AbonoService = __decorate([
    (0, common_1.Injectable)()
], AbonoService);
exports.AbonoService = AbonoService;
//# sourceMappingURL=abono.service.js.map