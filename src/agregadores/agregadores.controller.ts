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
  UseInterceptors,
  CacheInterceptor,
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

@UsePipes(ValidationPipe)
@Controller('agregadores')
@UseGuards(JwtAuthGuard)
export class AgregadoresContronller {
  constructor(
    // private readonly logService: LogsService,
    private readonly agreadoresService: AgregadoresService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @Inject('DS') private DS: IAgregadoresDS,
  ) {
    const init = async () => {
      for (const item in DS) {
        // console.log('item', item);
        const dataAgr = DS[item];
        // console.log('Guarda', dataAgr);
        await this.cacheService.set(item, dataAgr);
        console.log(`Cache id: ${item}, name: ${dataAgr.options.database}`);
        // console.log('Init Cache', await this.cacheService.get(item));
      }
    };
    init();
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

  @UseInterceptors(CacheInterceptor)
  @Post('create')
  async createAgregador(): Promise<{ id: number; name: string }> {
    const newDS = await this.agreadoresService.create();
    await this.cacheService.set(`${newDS.id}`, newDS.DS);

    const DS: DataSource = await this.cacheService.get(`${newDS.id}`);
    console.log('in agreadores', DS.options.database);

    return { id: newDS.id, name: newDS.DS.options.database as string };
  }
}
