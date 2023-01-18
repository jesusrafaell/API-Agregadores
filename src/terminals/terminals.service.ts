import {
  BadRequestException, // 400
  Injectable,
  NotFoundException, //404
} from '@nestjs/common';
import { CommerceService } from '../commerce/commerce.service';
import { AbonoService, RespAbono } from '../abono/abono.service';
import { LogsService } from '../logs/logs.service';

import 'dotenv/config';
import axios, { AxiosResponse } from 'axios';
import { Header } from '../logs/dto/dto-logs.dto';
import Abonos from '../db/models/abono.entity';
import { ITerminalAll } from './dto';
const { REACT_APP_APIURL_APT } = process.env;

export interface RespTerm {
  message: string;
  terminales?: string[];
  terminales_Error?: string[];
  code?: number;
}

export interface IPrefijoValue {
  value: number;
}

@Injectable()
export class TerminalsService {
  constructor(
    private logService: LogsService,
    private commerceService: CommerceService,
    private abonoService: AbonoService,
  ) {}

  async createTerminals(
    comerRif: string,
    comerCantPost: number,
    comerCuentaBanco: string,
    prefijo: string,
    header: Header,
  ): Promise<RespTerm> {
    const { DS } = header;
    // console.log(comerRif, comerCantPost);

    const commerce = await this.commerceService.getCommerce(comerRif, DS);

    if (!commerce)
      throw new BadRequestException(
        `Comercio [${comerRif}] no se encuentra registrado`,
      );
    //verificar el numero de afiliado del comercio
    //3312
    const afiliado = await this.commerceService.getAfiliadoByCommerce(
      commerce.comerCod,
      DS,
    );

    if (!afiliado)
      throw new BadRequestException(
        `Comercio [${commerce.comerRif}] no tiene un numero de afiliado`,
      );

    console.log('Afiliado', Number(afiliado.cxaCodAfi));
    if (comerCuentaBanco)
      await this.abonoService.validAccountNumber(comerCuentaBanco, DS);

    const aboNroCuenta = comerCuentaBanco || commerce.comerCuentaBanco;

    //validar el prefijo
    let termAPt: string[];
    try {
      //console.log('antes');
      const resPref: AxiosResponse<{ Data: IPrefijoValue[] }> =
        await axios.post(
          `${REACT_APP_APIURL_APT}pref`,
          {
            name: header.agr,
          },
          { headers: { authorization: header.token } },
        );
      const prefijos = resPref.data.Data;
      console.log('Resp APT', prefijos);
      const validPrefijo = prefijos.find((pref) => prefijo === `${pref.value}`);
      console.log(`Prefijo ${prefijo} -> ${validPrefijo ? 'Si' : 'No'}`);
      if (!validPrefijo) {
        throw new BadRequestException({
          message: `El prefijo ${prefijo} no es valido para ${header.agr}`,
        });
      }

      //crear terminal
      console.log(`Crear  ${comerCantPost} Terminals`);
      const responseSP: AxiosResponse<{ Terminal: string[]; ok: boolean }> =
        await axios
          .post(
            `${REACT_APP_APIURL_APT}new`,
            {
              afiliado: `${Number(afiliado.cxaCodAfi)}`,
              cantidad: comerCantPost,
              prefijo,
            },
            { headers: { authorization: header.token } },
          )
          .catch((err) => {
            console.log('Error APT:', err);
            console.log('aqui', err.response.data.originalError);
            throw new BadRequestException({
              message: 'APT: ' + err.message || 'Error APT',
            });
          });
      termAPt = responseSP.data.Terminal[0].split(',');

      console.log('APT api', termAPt);

      //console.log('Res Exec', responseSP);
    } catch (err) {
      throw new BadRequestException({
        message: err.message || 'Error APT',
      });
      console.log(err);
    }

    if (!termAPt.length) {
      throw new NotFoundException('No hay termianles disponibles');
    } else {
      const abono: RespAbono = await this.abonoService.createAbono(
        termAPt,
        commerce,
        afiliado.cxaCodAfi,
        aboNroCuenta,
        DS,
      );
      if (!abono || abono.code === 400) {
        throw new BadRequestException({
          message: `Error al crear abono a los terminales, por favor contactar a Tranred`,
          terminales: termAPt,
        });
      }

      if (abono.terminales.length > 0) {
        header.log.msg = `Se crearon ${termAPt.length} terminales`;
        await this.logService.saveLogs(header.log, DS);
        return abono;
      }
      throw new BadRequestException({
        message: abono.message,
      });
    }
  }

  async getAllTerminals(header: Header): Promise<ITerminalAll> {
    const { DS } = header;
    const termianls = await DS.getRepository(Abonos).find({
      select: ['aboTerminal', 'aboCodAfi', 'aboNroCuenta'],
    });

    if (!termianls.length) {
      throw new BadRequestException(`No existen terminales en abono`);
    }

    return {
      message: `Todas las Terminales`,
      terminales: termianls,
    };
  }
}
