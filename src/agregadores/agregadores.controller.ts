import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
  Headers,
  Req,
  Inject,
  Get,
  CACHE_MANAGER,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request } from 'express';
// import { LogsService } from '../logs/logs.service';
// import { Header } from '../logs/dto/dto-logs.dto';
import { IAgregadoresDS } from '../db/config/dto';
import { AgregadoresService } from './agregadores.service';
import Agregador from '../db/sitran/models/agregador.entity';
import { DataSource } from 'typeorm';
import { Cache } from 'cache-manager';
import agredadorDS from '../db/config/dataSource';
import ProcessPrint from '../utils/barrProcess';
import { IListStatus } from './dto';
import afiliado_api from '../db/models/afiliados_api.entity';

@UsePipes(ValidationPipe)
@Controller('agregadores')
@UseGuards(JwtAuthGuard)
export class AgregadoresContronller {
  constructor(
    // private readonly logService: LogsService,
    private readonly agreadoresService: AgregadoresService,
    @Inject(CACHE_MANAGER) private cacheService: Cache, // @Inject('DS') private DS: IAgregadoresDS,
  ) {
    const init = async () => {
      await this.agreadoresService.start();
      console.log('Connected');
    };
    init();
  }

  async saveAgrInCache(_DS?: IAgregadoresDS): Promise<string[]> {
    const DS = _DS;
    const list: string[] = [];
    for (const item in DS) {
      // console.log('item', item);
      const dataAgr = DS[item];
      // console.log('Guarda', dataAgr);
      await this.cacheService.set(item, dataAgr);
      list.push(dataAgr.options.database as string);
      // console.log(`Cache id: ${item}, name: ${dataAgr.options.database}`);
      const ds: DataSource = await this.cacheService.get(item);
      console.log('✅  Cache:', item, '->', ds.options.database);
    }

    return list;
  }

  @Get('all')
  getAgregadores(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Body() body: { name: string; host: string },
  ): Promise<Agregador[]> {
    console.log('create', body);
    return this.agreadoresService.all();
  }

  @Post('create')
  async createAgregador(): Promise<{ id: number; name: string }> {
    const newDS = await this.agreadoresService.create();
    await this.cacheService.set(`${newDS.id}`, newDS.DS);

    const DS: DataSource = await this.cacheService.get(`${newDS.id}`);
    console.log('in agreadores', DS.options.database);

    return { id: newDS.id, name: newDS.DS.options.database as string };
  }

  @Get('reload')
  async reload(): Promise<{ message: string; new_agr?: string[] }> {
    const agregadores = await this.agreadoresService.all();

    let listDS: IAgregadoresDS;

    for (const index in agregadores) {
      const item = agregadores[index];
      const id = item.id.toString();
      // console.log(id);
      const ds: DataSource | undefined = await this.cacheService.get(id);
      // console.log(ds);
      if (!ds) {
        console.log('Create', id, item.db);
        listDS = {
          ...listDS,
          [item.id]: agredadorDS(item.host, item.db),
        };
      }
    }

    if (listDS) {
      try {
        await ProcessPrint(listDS);
        const new_agr = await this.saveAgrInCache(listDS);
        return { message: 'Reload Ready', new_agr };
      } catch (err) {
        return { message: `Error in Init DB ${err.msg}` };
      }
    } else {
      return { message: 'No hay nuevo agregador' };
    }
  }

  @Get('status')
  async status(): Promise<{ listStatus: IListStatus }> {
    const agregadores = await this.agreadoresService.all();

    let listDS: IListStatus;

    for (const index in agregadores) {
      const item = agregadores[index];
      const id = item.id.toString();
      // console.log(id);
      const ds: DataSource | undefined = await this.cacheService.get(id);
      // console.log(ds);
      let testDB = false;
      if (ds) {
        try {
          await ds.getRepository(afiliado_api).find();
          testDB = true;
        } catch (err) {
          console.log('Error DB');
        }
      }
      listDS = {
        ...listDS,
        [item.db]: {
          cache: ds ? 'On' : 'Off',
          db: testDB ? 'On' : 'Off',
        },
      };
    }

    return { listStatus: listDS };
  }

  @Get('restartConnection')
  async restartConnection(): Promise<{
    message: string;
    list_resets?: string[];
  }> {
    const agregadores = await this.agreadoresService.all();

    let listDS: IAgregadoresDS;

    for (const index in agregadores) {
      const item = agregadores[index];
      const id = item.id.toString();
      console.log('id', id);
      const ds: DataSource | undefined = await this.cacheService.get(id);
      // console.log(ds);

      if (ds) {
        try {
          await ds.getRepository(afiliado_api).find();
        } catch (err) {
          console.log('Add for reInit', id, item.db);
          listDS = {
            ...listDS,
            [item.id]: agredadorDS(item.host, item.db),
          };
        }
      }
    }

    if (listDS) {
      try {
        await ProcessPrint(listDS);
        const list_resets = await this.saveAgrInCache(listDS);
        return { message: 'Reload Ready', list_resets };
      } catch (err) {
        return { message: 'Error in reset DB' };
      }
    }

    return { message: 'Not Reset, Connection is stable' };
  }
}
