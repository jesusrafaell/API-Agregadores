import { CLIENT_RENEG_LIMIT } from 'tls';
import { DataSource, Not } from 'typeorm';
import { BarProcess } from '../../utils/barrProcess';
import agredadorDS from '../config/dataSource';
import { IAgregadoresDS } from '../config/dto';
import SitranDS from '../config/sitran_dataSource';
import Agregador from '../sitran/models/agregador.entity';
import modelPos from './modelPos';

SitranDS.initialize()
  .then(async (DS) => {
    try {
      console.log('Sitran');
      const agregadores = await DS.getRepository(Agregador).find({
        where: {
          isAgr: 1,
          db: Not('MILPAGOS'),
        },
      });
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
        } catch (err) {
          console.log(`Error in int ${DS.options.database}`, err);
          throw err;
        }
      });

      console.log('Ready, initialize');

      for (let i = 0; i < Object.keys(listDS).length; i++) {
        //llamda al content
        const DS: DataSource = Object.values(listDS)[i];
        console.log(DS.options.database);
        // await modelPos(DS);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
    console.log('OK');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
