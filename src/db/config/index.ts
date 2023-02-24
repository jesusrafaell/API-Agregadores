import { Not } from 'typeorm';
import ProcessPrint from '../../utils/barrProcess';
import Agregador from '../sitran/models/agregador.entity';
import agredadorDS from './dataSource';
import { IAgregadoresDS } from './dto';
import SitranDS from './sitran_dataSource';

export const Conections = async (): Promise<IAgregadoresDS> => {
  try {
    await SitranDS.initialize();
    console.log('Sitran     ✅');
    const agregadores = await SitranDS.getRepository(Agregador).find({
      where: {
        isAgr: 1,
        db: Not('MilPagos'), //delete
      },
    });
    console.log(agregadores.length, 'Agregadores:');
    // console.log(listAgregadores', agregadores);
    let listDS: IAgregadoresDS;
    agregadores.forEach((agr) => {
      listDS = {
        ...listDS,
        [agr.id]: agredadorDS(agr.host, agr.db),
      };
    });
    await ProcessPrint(listDS);
    console.log('Connected');
    agregadores.forEach((item) => {
      console.log('✅ ' + item.db);
    });
    return listDS;
  } catch (err) {
    console.log(err);
    throw { msg: err.msg };
  }
};
