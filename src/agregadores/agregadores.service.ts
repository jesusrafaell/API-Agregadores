import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import agredadorDS, { createTablesAgregador } from '../db/config/dataSource';
import { IAgregadoresDS } from '../db/config/dto';
import SitranDS from '../db/config/sitran_dataSource';
import Agregador from '../db/sitran/models/agregador.entity';
import ProcessPrint, { BarProcess } from '../utils/barrProcess';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AgregadoresService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,

    @InjectRepository(Agregador)
    private agregadorRepository: Repository<Agregador>,
  ) {}

  async all(): Promise<Agregador[]> {
    return await this.agregadorRepository.find({
      where: {
        isAgr: 1,
        db: Not('MILPAGOS'),
      },
    });
  }

  async create(): Promise<{ id: number; DS: DataSource }> {
    // const newAgregador = await SitranDS.getRepository(Agregador).findOne({
    //   where: { name: 'Disglobal' },
    // });
    const newAgregador: Agregador = {
      id: 10,
      name: 'nuevoAgregador',
      key: 10,
      host: '10.198.72.11',
      db: 'NUEVOAGREDADOR',
      isAgr: 1,
      active: 1,
    };

    try {
      console.log('call bug1');
      //
      // await createNewDatabase(newAgregador.db);
      // await createTablesDatabase(newAgregador.db);
      //
      const newDS = createTablesAgregador(newAgregador.host, newAgregador.db);
      console.log('call bug2');
      // console.log(newDS);
      await newDS.initialize();
      console.log('call bug3');
      //crear otro con syncroinze
      console.log('Se creo', newDS.options.database);
      return {
        id: newAgregador.id,
        DS: newDS,
      };
    } catch (err) {
      console.log('call bug4');
      console.log(err);
    }
  }

  async saveAgrInCache(item: string, dataAgr: DataSource) {
    await this.cacheService.set(item, dataAgr);
    const ds: DataSource = await this.cacheService.get(item);
    console.log('✅  Cache:', item, '->', ds.options.database);
  }

  async start(): Promise<void> {
    try {
      const agregadores = await this.all();
      console.log(agregadores.length, 'Agregadores:');
      let listDS: IAgregadoresDS;
      agregadores.forEach((agr) => {
        listDS = {
          ...listDS,
          [agr.id]: agredadorDS(agr.host, agr.db),
        };
      });

      await BarProcess(listDS, async (item: string, DS: DataSource) => {
        try {
          await DS.initialize();
          await this.cacheService.set(item, DS);
        } catch (err) {
          throw err;
        }
      });

      console.log('Ready, initialize');

      agregadores.forEach(async (item) => {
        const ds: DataSource = await this.cacheService.get(`${item.id}`);
        // console.log(ds);
        console.log('✅  Cache:', item.id, '->', ds.options.database);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
