import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Header, Log } from './dto/dto-logs.dto';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import general_logs_api from '../db/global/models/general_logs_api.entity';
import Agregador from '../db/sitran/models/agregador.entity';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogsService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(general_logs_api)
    private generalLogRepository: Repository<general_logs_api>,
  ) {}

  async saveLogsToken(log: Log) {
    console.log(log);
    //
    // try {
    //   await DS.getRepository(general_logs_api).save(dataLog);
    // } catch (err) {
    //   console.log({ msg: `Error en guardar en log`, log: dataLog });
    // }
  }

  async saveLogsSitran(log: Log) {
    const { id, method, path, msg } = log;
    const dataLog: general_logs_api = {
      id_user: id,
      descript: `[method:${method}]::[path:${path}]::[msg:${msg}]`,
      id_origin_logs: 1, //api
    };
    try {
      await this.generalLogRepository.save(dataLog);
    } catch (err) {
      console.log({ msg: `Error en guardar en log`, log: dataLog });
    }
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

  // getDataToken = (
  //   headerToken: string,
  //   req: Request,
  //   agregadores: IAgregadoresDS,
  // ): Header => {
  //   try {
  //     const token = headerToken.replace('Bearer ', '');
  //     // console.log(token);
  //     const decode = this.jwtService.decode(token);
  //     const { sub, agr } = decode as unknown as { sub: number; agr: Agregador };
  //     // console.log('id:', agr.id);
  //     // console.log('total', Object.values(agregadores).length);
  //     const DS = agregadores[agr.id];
  //     if (!DS) {
  //       console.log('No existe el agreador');
  //       throw new BadRequestException(`No existe el agreador`);
  //     }
  //     //console.log('agregador', agr);
  //     return {
  //       DS: DS,
  //       agr: agr.name as string,
  //       idAgr: agr.id,
  //       token,
  //       log: {
  //         id: sub,
  //         method: req.method,
  //         path: req.url,
  //         msg: '',
  //       },
  //     };
  //   } catch (err) {
  //     throw new UnauthorizedException('Token invalido agregador');
  //   }
  // };

  getDataTokenCache = async (
    headerToken: string,
    req: Request,
    cacheService: Cache,
  ): Promise<Header> => {
    try {
      const token = headerToken.replace('Bearer ', '');
      // console.log(token);
      const decode = this.jwtService.decode(token);
      const { sub, agr } = decode as unknown as { sub: number; agr: Agregador };
      // console.log('id:', agr.id);
      // console.log('total', Object.values(agregadores).length);
      console.log('id Agr:', agr.id);
      const DS: DataSource = await cacheService.get(`${agr.id}`);
      console.log('Agredador en cache DS', DS.options.database);
      // const DS = agregadores[agr.id];
      if (!DS) {
        console.log('No existe el agreador');
        throw new BadRequestException(`No existe el agreador`);
      }
      //console.log('agregador', agr);
      return {
        DS: DS,
        agr: agr.name as string,
        idAgr: agr.id,
        token,
        log: {
          id: sub,
          method: req.method,
          path: req.url,
          msg: '',
        },
      };
    } catch (err) {
      throw new UnauthorizedException(err.mesasge || 'Agredaor no autorizado');
    }
  };
}
