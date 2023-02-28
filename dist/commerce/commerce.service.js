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
exports.CommerceService = void 0;
const common_1 = require("@nestjs/common");
const luxon_1 = require("luxon");
const formatString_1 = require("../utils/formatString");
const comercios_entity_1 = require("../db/models/comercios.entity");
const contactos_entity_1 = require("../db/models/contactos.entity");
const comerciosXafliado_entity_1 = require("../db/models/comerciosXafliado.entity");
const categoriasXafiliado_entity_1 = require("../db/models/categoriasXafiliado.entity");
const afiliados_entity_1 = require("../db/models/afiliados.entity");
const logs_service_1 = require("../logs/logs.service");
const afiliados_api_entity_1 = require("../db/models/afiliados_api.entity");
const bancos_entity_1 = require("../db/models/bancos.entity");
const abono_service_1 = require("../abono/abono.service");
let CommerceService = class CommerceService {
    constructor(logService, _abonoService) {
        this.logService = logService;
        this._abonoService = _abonoService;
    }
    async getCategoriaByAfiliado(catCodAfi, DS) {
        return await DS.getRepository(categoriasXafiliado_entity_1.default).findOne({
            where: { catCodAfi },
        });
    }
    async getCommerce(comerRif, DS) {
        return await DS.getRepository(comercios_entity_1.default).findOne({
            where: { comerRif },
        });
    }
    async createCommerce(body, header) {
        const { commerce, contacto } = body;
        const { DS } = header;
        if (await this.getCommerce(commerce.comerRif, DS)) {
            throw new common_1.BadRequestException(`Comercio [${commerce.comerRif}] ya existe`);
        }
        const { idActivityXAfiliado: cxaCod } = commerce;
        const afiliadoGeneral = await DS.getRepository(afiliados_entity_1.default).findOne({
            where: { afiCod: cxaCod },
        });
        if (!afiliadoGeneral)
            throw new common_1.BadRequestException(`No existe el numero de afiliado [${cxaCod}] `);
        const afiliado = await DS.getRepository(afiliados_api_entity_1.default).findOne({
            where: { afiliado: cxaCod },
        });
        if (!afiliado)
            throw new common_1.BadRequestException(`El numero de afiliado [${cxaCod}], no esta disponible en ${header.agr}`);
        const categoria = await this.getCategoriaByAfiliado(afiliado.afiliado, DS);
        if (!categoria)
            throw new common_1.BadRequestException(`No existe categoria comercial del afiliado [${afiliado.afiliado}]`);
        const aboCodBanco = commerce.comerCuentaBanco.slice(0, 4);
        const validBank = await DS.getRepository(bancos_entity_1.default).findOne({
            where: { banCodBan: aboCodBanco },
        });
        if (!validBank) {
            throw new common_1.BadRequestException(`Code Bank invalid [${aboCodBanco}]`);
        }
        const comercioSave = await DS.getRepository(comercios_entity_1.default).save({
            comerDesc: commerce.comerDesc,
            comerTipoPer: commerce.comerTipoPer,
            comerCodigoBanco: aboCodBanco,
            comerCuentaBanco: commerce.comerCuentaBanco,
            comerPagaIva: 'SI',
            comerCodUsuario: null,
            comerCodPadre: 0,
            comerRif: commerce.comerRif,
            comerFreg: null,
            comerCodTipoCont: 2,
            comerInicioContrato: luxon_1.DateTime.local().toISODate(),
            comerFinContrato: luxon_1.DateTime.local().plus({ years: 1 }).toISODate(),
            comerExcluirPago: 0,
            comerCodCategoria: Number(categoria.catCodCat),
            comerGarantiaFianza: 1,
            comerModalidadGarantia: 1,
            comerMontoGarFian: 7.77,
            comerModalidadPos: 3,
            comerTipoPos: 1,
            comerRecaudos: null,
            comerDireccion: (0, formatString_1.locationToString)(commerce.locationCommerce),
            comerObservaciones: '',
            comerCodAliado: 84,
            comerEstatus: 5,
            comerHorario: null,
            comerImagen: null,
            comerPuntoAdicional: 0,
            comerCodigoBanco2: commerce.comerCodigoBanco2 || '',
            comerCuentaBanco2: commerce.comerCuentaBanco2 || '',
            comerCodigoBanco3: commerce.comerCodigoBanco3 || '',
            comerCuentaBanco3: commerce.comerCuentaBanco3 || '',
            comerDireccionHabitacion: (0, formatString_1.locationToString)(commerce.locationContact),
            comerDireccionPos: (0, formatString_1.locationToString)(commerce.locationPos),
            comerDiasOperacion: (0, formatString_1.daysToString)(commerce.daysOperacion),
            comerFechaGarFian: null,
        });
        await DS.getRepository(contactos_entity_1.default).save({
            contCodComer: comercioSave.comerCod,
            contNombres: contacto.contNombres,
            contApellidos: contacto.contApellidos,
            contTelefLoc: contacto.contTelefLoc,
            contTelefMov: contacto.contTelefLoc,
            contMail: contacto.contMail,
            contCodUsuario: null,
            contFreg: null,
        });
        await DS.getRepository(comerciosXafliado_entity_1.default).save({
            cxaCodAfi: cxaCod,
            cxaCodComer: comercioSave === null || comercioSave === void 0 ? void 0 : comercioSave.comerCod,
        });
        await DS.query(`
      INSERT INTO [dbo].[ComisionesMilPagos]
        ([cmCodComercio] ,[cmPorcentaje])
      VALUES (${comercioSave === null || comercioSave === void 0 ? void 0 : comercioSave.comerCod} ,0)				
    `);
        const info = {
            message: `Comerico [${commerce.comerRif}] creado con exito`,
        };
        header.log.msg = info.message;
        await this.logService.saveLogs(header.log, DS);
        return info;
    }
    async getAfiliadoByCommerce(cxaCodComer, DS) {
        return await DS.getRepository(comerciosXafliado_entity_1.default).findOne({
            where: { cxaCodComer },
        });
    }
    async getCommerceData(comerRif, header) {
        const { DS } = header;
        const comercio = await DS.getRepository(comercios_entity_1.default).findOne({
            where: { comerRif },
        });
        if (!comercio)
            throw new common_1.BadRequestException(`Comercio [${comerRif}] no existe`);
        const contact = await DS.getRepository(contactos_entity_1.default).findOne({
            where: {
                contCodComer: comercio.comerCod,
            },
        });
        if (!contact)
            throw { message: `Contacto del comercio ${comerRif} no existe` };
        const abonos = await this._abonoService.getAbonosByCommerce(comercio.comerCod, DS);
        const terminalsWithStatus = [];
        if (abonos.length) {
            for (let i = 0; i < abonos.length; i++) {
                const terminal = abonos[i];
                terminalsWithStatus.push({
                    terminal: terminal.aboTerminal,
                    nroCuenta: terminal.aboNroCuenta,
                });
            }
        }
        const info = {
            message: `Data comercio`,
            comerRif: comercio.comerRif,
            nombre: comercio.comerDesc,
            email: contact.contMail,
            fecha: new Date(comercio.comerInicioContrato).toISOString().split('T')[0],
            terminales: terminalsWithStatus,
        };
        return info;
    }
    async getAllCommerce(header) {
        const { DS } = header;
        const commerces = await DS.getRepository(comercios_entity_1.default).find({
            select: ['comerRif', 'comerDesc'],
        });
        if (!commerces.length) {
            throw new common_1.BadRequestException(`No existen comercios`);
        }
        return {
            message: `Comercios`,
            comercios: commerces,
        };
    }
};
CommerceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logs_service_1.LogsService,
        abono_service_1.AbonoService])
], CommerceService);
exports.CommerceService = CommerceService;
//# sourceMappingURL=commerce.service.js.map