import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { createTablesAgregador } from '../db/config/dataSource';
import SitranDS from '../db/config/sitran_dataSource';
import Agregador from '../db/sitran/models/agregador.entity';

@Injectable()
export class AgregadoresService {
  async all(): Promise<Agregador[]> {
    return await SitranDS.getRepository(Agregador).find();
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
      //await ProcessPrint({ [newAgregador.id]: newDS });
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
}
