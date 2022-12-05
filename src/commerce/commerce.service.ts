import { DataSource } from 'typeorm';
import { CommerceDto } from './dto/new-commerce.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { daysToString, locationToString } from '../utils/formatString';
import Comercios from '../db/models/comercios.entity';
import Contactos from '../db/models/contactos.entity';
import ComerciosXafiliado from '../db/models/comerciosXafliado.entity';
import CategoriasXafiliado from '../db/models/categoriasXafiliado.entity';
import Afiliados from '../db/models/afiliados.entity';
import { LogsService } from '../logs/logs.service';
import afiliado_api from '../db/models/afiliados_api.entity';
import Bancos from '../db/models/bancos.entity';
import ComisionesMilPagos from '../db/models/comisionesmilpagos.entity';
import { Header } from '../logs/dto/dto-logs.dto';
import { ICommerceAll, ICommerceGet } from './dto';
import { AbonoService } from '../abono/abono.service';
import { TerminalSPAux } from '../terminals/dto';

export interface Resp {
  message?: string;
}

@Injectable()
export class CommerceService {
  constructor(
    private logService: LogsService,
    private _abonoService: AbonoService,
  ) {}

  async getCategoriaByAfiliado(
    catCodAfi: string,
    DS: DataSource,
  ): Promise<CategoriasXafiliado> {
    return await DS.getRepository(CategoriasXafiliado).findOne({
      where: { catCodAfi },
    });
  }

  async getCommerce(comerRif: string, DS: DataSource): Promise<Comercios> {
    return await DS.getRepository(Comercios).findOne({
      where: { comerRif },
    });
  }

  async createCommerce(body: CommerceDto, header: Header): Promise<Resp> {
    const { commerce, contacto } = body;
    const { DS } = header;

    //validar si el comercio existe
    if (await this.getCommerce(commerce.comerRif, DS)) {
      throw new BadRequestException(
        `Comercio [${commerce.comerRif}] ya existe`,
      );
    }
    console.log('bug2');

    const { idActivityXAfiliado: cxaCod } = commerce;
    console.log('numero de afiliado', cxaCod);

    const afiliadoGeneral = await DS.getRepository(Afiliados).findOne({
      where: { afiCod: cxaCod },
    });

    if (!afiliadoGeneral)
      throw new BadRequestException(
        `No existe el numero de afiliado [${cxaCod}] `,
      );

    //3312 cambiar por afiliadios api
    const afiliado = await DS.getRepository(afiliado_api).findOne({
      where: { afiliado: cxaCod },
    });

    if (!afiliado)
      throw new BadRequestException(
        `El numero de afiliado [${cxaCod}], no esta disponible en ${header.agr}`,
      );

    const categoria = await this.getCategoriaByAfiliado(afiliado.afiliado, DS);

    if (!categoria)
      throw new BadRequestException(
        `No existe categoria comercial del afiliado [${afiliado.afiliado}]`,
      );
    const aboCodBanco = commerce.comerCuentaBanco.slice(0, 4);

    const validBank = await DS.getRepository(Bancos).findOne({
      where: { banCodBan: aboCodBanco },
    });

    if (!validBank) {
      console.log(`Code Bank invalid [${aboCodBanco}]`);
      throw new BadRequestException(`Code Bank invalid [${aboCodBanco}]`);
    }

    const newCommerce: Comercios = {
      comerDesc: commerce.comerDesc,
      comerTipoPer: commerce.comerTipoPer,
      comerCodigoBanco: aboCodBanco,
      comerCuentaBanco: commerce.comerCuentaBanco,
      comerPagaIva: 'SI',
      comerCodUsuario: null,
      comerCodPadre: 0,
      comerRif: commerce.comerRif,
      comerFreg: null,
      comerCodTipoCont: commerce.comerCodTipoCont,
      comerInicioContrato: DateTime.local().toISODate(),
      comerFinContrato: DateTime.local().plus({ years: 1 }).toISODate(),
      comerExcluirPago: 0,
      comerCodCategoria: Number(categoria.catCodCat),
      comerGarantiaFianza: 1,
      comerModalidadGarantia: 1,
      comerMontoGarFian: 7.77,
      comerModalidadPos: 3,
      comerTipoPos: 1,
      comerRecaudos: null,
      comerDireccion: locationToString(commerce.locationCommerce),
      comerObservaciones: commerce.comerObservaciones || '',
      comerCodAliado: 84,
      comerEstatus: 5,
      comerHorario: null,
      comerImagen: null,
      comerPuntoAdicional: 0,
      comerCodigoBanco2: commerce.comerCodigoBanco2 || '',
      comerCuentaBanco2: commerce.comerCuentaBanco2 || '',
      comerCodigoBanco3: commerce.comerCodigoBanco3 || '',
      comerCuentaBanco3: commerce.comerCuentaBanco3 || '',
      //
      comerDireccionHabitacion: locationToString(commerce.locationContact),
      comerDireccionPos: locationToString(commerce.locationPos),
      comerDiasOperacion: daysToString(commerce.daysOperacion),
      comerFechaGarFian: null,
    };

    const comercioSave = await DS.getRepository(Comercios).save(newCommerce);
    console.log('listo comercio');
    //Contacto
    const newContacto: Contactos = {
      contCodComer: comercioSave.comerCod,
      contNombres: contacto.contNombres,
      contApellidos: contacto.contApellidos,
      contTelefLoc: contacto.contTelefLoc,
      contTelefMov: contacto.contTelefLoc,
      contMail: contacto.contMail,
      contCodUsuario: null,
      contFreg: null,
    };

    await DS.getRepository(Contactos).save(newContacto);
    console.log('listo contacto');

    //Crear comerxafiliado
    let comerXafiSave = await DS.getRepository(ComerciosXafiliado).findOne({
      where: { cxaCodComer: comercioSave?.comerCod },
    });

    if (!comerXafiSave) {
      comerXafiSave = await DS.getRepository(ComerciosXafiliado).save({
        cxaCodAfi: cxaCod,
        cxaCodComer: comercioSave?.comerCod,
      });
      console.log('listo comercioxafilido');
    } else {
      console.log('ComercioXafiliado ya existe', comercioSave?.comerCod);
    }

    //Crear Comision
    const comisionSave = await DS.getRepository(ComisionesMilPagos).findOne({
      where: { cmCodComercio: comercioSave?.comerCod },
    });

    console.log('existe comision', comisionSave);

    if (!comisionSave) {
      await DS.query(`
						INSERT INTO [dbo].[ComisionesMilPagos]
							([cmCodComercio] ,[cmPorcentaje])
						VALUES (${comercioSave?.comerCod} ,0)				
        `);
    }

    console.log('listo comisionmilpagos');

    const info = {
      message: `Comerico [${commerce.comerRif}] creado con exito`,
    };

    header.log.msg = info.message;
    await this.logService.saveLogs(header.log, DS);

    return info;
  }

  async getAfiliadoByCommerce(
    cxaCodComer: number,
    DS: DataSource,
  ): Promise<ComerciosXafiliado> {
    return await DS.getRepository(ComerciosXafiliado).findOne({
      where: { cxaCodComer },
    });
  }

  async getCommerceData(
    comerRif: string,
    header: Header,
  ): Promise<ICommerceGet> {
    const { DS } = header;
    const comercio: Comercios = await DS.getRepository(Comercios).findOne({
      where: { comerRif },
    });

    if (!comercio)
      throw new BadRequestException(`Comercio [${comerRif}] no existe`);

    const contact = await DS.getRepository(Contactos).findOne({
      where: {
        contCodComer: comercio.comerCod,
      },
    });

    if (!contact)
      throw { message: `Contacto del comercio ${comerRif} no existe` };

    const abonos = await this._abonoService.getAbonosByCommerce(
      comercio.comerCod,
      DS,
    );

    const terminalsWithStatus: TerminalSPAux[] = [];
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

  async getAllCommerce(header: Header): Promise<ICommerceAll> {
    const { DS } = header;
    const commerces = await DS.getRepository(Comercios).find({
      select: ['comerRif', 'comerDesc'],
    });

    if (!commerces.length) {
      throw new BadRequestException(`No existen comercios`);
    }

    return {
      message: `Comercios`,
      comercios: commerces,
    };
  }
}
