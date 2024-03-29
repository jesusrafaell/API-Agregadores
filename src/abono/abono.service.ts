import { DataSource } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import Abonos from '../db/models/abono.entity';
import Comercios from '../db/models/comercios.entity';
import Bancos from '../db/models/bancos.entity';
import { isValid } from '../utils/functions/validAcoountBank';

export interface RespAbono {
  message: string;
  terminal?: string;
  terminales_Error?: string[];
  code?: number;
}

@Injectable()
export class AbonoService {
  // constructor() {}

  async createAbono(
    terminal: string,
    commerce: Comercios,
    cxaCodAfi: string,
    aboNroCuenta: string,
    DS: DataSource,
  ): Promise<RespAbono> {
    try {
      const aboCodBanco = aboNroCuenta.slice(0, 4);

      await DS.getRepository(Abonos).save({
        aboTerminal: terminal,
        aboCodAfi: cxaCodAfi,
        aboCodComercio: commerce.comerCod,
        aboCodBanco: aboCodBanco,
        aboNroCuenta: aboNroCuenta,
        aboTipoCuenta: '01',
        estatusId: 23,
      });

      const info: RespAbono = {
        message: '',
      };

      // if (exist_termianls.length) {
      //   //info.terminales_Error = exist_termianls.map((term) => term.aboTerminal);
      //   info.code = 202;
      // }

      //console.log('creado el abono', abonosSaves);
      info.message = `${commerce.comerRif} Terminal creado`;
      info.terminal = terminal;
      return info;
    } catch (e) {
      console.log('Abono error:', e);
      return {
        message: `Error al crear abono a los terminales, por favor contactar a Tranred`,
        code: 400,
      };
    }
  }

  async createAbonos(
    terminals: string[],
    commerce: Comercios,
    cxaCodAfi: string,
    aboNroCuenta: string,
    DS: DataSource,
  ): Promise<RespAbono> {
    try {
      console.log('crear abono');

      // const exist_termianls = await DS.getRepository(Abonos)
      //   .createQueryBuilder('abonos')
      //   .select('abonos.aboTerminal')
      //   .where('abonos.aboTerminal IN (:...terminals)', { terminals })
      //   .getMany();

      // const newTerminals: string[] = terminals.filter(
      //   (term: string) =>
      //     !exist_termianls.find((terminal) => terminal.aboTerminal === term),
      // );

      const aboCodBanco = aboNroCuenta.slice(0, 4);

      const abono: Abonos[] = terminals.map((terminal: string) => ({
        aboTerminal: terminal,
        aboCodAfi: cxaCodAfi,
        aboCodComercio: commerce.comerCod,
        aboCodBanco: aboCodBanco,
        aboNroCuenta: aboNroCuenta,
        aboTipoCuenta: '01',
        estatusId: 23,
      }));

      console.log('nuevos', terminals);
      //console.log('existe', exist_termianls);

      const abonosSaves = await DS.getRepository(Abonos).save(abono);

      const info: RespAbono = {
        message: '',
      };

      // if (exist_termianls.length) {
      //   //info.terminales_Error = exist_termianls.map((term) => term.aboTerminal);
      //   info.code = 202;
      // }

      //console.log('creado el abono', abonosSaves);
      info.message = `${commerce.comerRif} Terminales creados: ${abonosSaves.length}`;
      // if (terminals.length) info.terminales = terminals;
      return info;
    } catch (e) {
      console.log('Abono error:', e);
      return {
        message: `Error al crear abono a los terminales, por favor contactar a Tranred`,
        code: 400,
      };
    }
  }

  async validAccountNumber(
    comerCuentaBanco: string,
    DS: DataSource,
  ): Promise<Bancos> {
    const aboCodBanco = comerCuentaBanco.slice(0, 4);

    const validBank = await DS.getRepository(Bancos).findOne({
      where: { banCodBan: aboCodBanco },
    });

    if (!validBank) {
      console.log(`Code Bank invalid [${aboCodBanco}]`);
      throw new BadRequestException(`Code Bank invalid [${aboCodBanco}]`);
    }

    if (!isValid(comerCuentaBanco)) {
      console.log(
        `Codigo de Control Invalido [${comerCuentaBanco}], banco: [${validBank.banDescBan}]`,
      );
      throw new BadRequestException(
        `Codigo de Control Invalido [${comerCuentaBanco}], banco: [${validBank.banDescBan}]`,
      );
    }
    return validBank;
  }

  async getAbonosByCommerce(
    comerCod: number,
    DS: DataSource,
  ): Promise<Abonos[]> {
    return await DS.getRepository(Abonos).find({
      select: ['aboTerminal', 'aboCodBanco', 'aboNroCuenta'],
      where: {
        aboCodComercio: comerCod,
      },
    });
  }
}
