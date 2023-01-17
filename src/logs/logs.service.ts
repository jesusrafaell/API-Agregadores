import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Header, Log } from './dto/dto-logs.dto';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import general_logs_api from '../db/models/general_logs_api.entity';
import { getDatasource } from '../db/config';

@Injectable()
export class LogsService {
  constructor(private readonly jwtService: JwtService) {}

  async saveLogsToken(log: Log) {
    console.log(log);
    //
    // try {
    //   await DS.getRepository(general_logs_api).save(dataLog);
    // } catch (err) {
    //   console.log({ msg: `Error en guardar en log`, log: dataLog });
    // }
  }

  async saveLogs(log: Log, DS: DataSource) {
    const { id, method, path, msg } = log;
    const dataLog: general_logs_api = {
      id_user: id,
      descript: `[method:${method}]::[path:${path}]::[msg:${msg}]`,
      id_origin_logs: 1, //api
    };
    try {
      await DS.getRepository(general_logs_api).save(dataLog);
    } catch (err) {
      console.log({ msg: `Error en guardar en log`, log: dataLog });
    }
  }

  getDataToken = (headerToken: string, req: Request): Header => {
    try {
      const token = headerToken.replace('Bearer ', '');
      // console.log(token);
      const decode = this.jwtService.decode(token);
      const { sub, agr }: any = decode;
      const DS = getDatasource(Number(agr.id));
      if (!DS) {
        console.log('No existe el agreador');
        throw new BadRequestException(`No existe el agreador`);
      }
      //console.log('agregador', agr);
      return {
        DS: DS,
        agr: agr.name as string,
        token,
        log: {
          id: sub,
          method: req.method,
          path: req.url,
          msg: '',
        },
      };
    } catch (err) {
      throw new UnauthorizedException('Token invalido agregador');
    }
  };
}
