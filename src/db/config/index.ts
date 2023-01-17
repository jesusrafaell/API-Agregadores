import { DataSource } from 'typeorm';
import CarropagoDS from './dataSource/carroPago';
import CONSULTELDS from './dataSource/consultel';
import DISGLOBALDS from './dataSource/disglobal';
import GSComputerDS from './dataSource/gscomputer';
import LibrepagoDS from './dataSource/librePago';
import SitranDS from './sitran_dataSource';

export const Conections = async () => {
  await SitranDS.initialize();
  console.log('Sitran    ✅');
  await CarropagoDS.initialize();
  console.log('Carropago ✅');
  await LibrepagoDS.initialize();
  console.log('Librepago ✅');
  await GSComputerDS.initialize();
  console.log('GSComputer OK  ✅');
  await DISGLOBALDS.initialize();
  console.log('DISGLOBAL OK  ✅');
  await CONSULTELDS.initialize();
  console.log('CONSULTEL OK  ✅');
  // await MilPagosDS.initialize();
  // console.log('MilPagos  ✅');
};

export const getDatasource = (agr: number): DataSource => {
  // console.log('get', agr);
  switch (agr) {
    case 1:
      return CarropagoDS;
    // case 2:
    //   return MilPagosDS;
    case 3:
      return LibrepagoDS;
    case 4:
      return GSComputerDS;
    case 5:
      return SitranDS;
    case 6:
      return DISGLOBALDS;
    case 7:
      return CONSULTELDS;
    default:
      return null;
  }
};
