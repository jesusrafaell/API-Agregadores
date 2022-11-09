import { DataSource } from 'typeorm';
import CarropagoDS from './dataSource/carroPago';
import LibrepagoDS from './dataSource/librePago';
import MilPagosDS from './dataSource/milPago';
import SitranDS from './sitran_dataSource';

export const Conections = async () => {
  await SitranDS.initialize();
  console.log('Sitran OK  ✅');
  await CarropagoDS.initialize();
  console.log('Carropago OK  ✅');
  await LibrepagoDS.initialize();
  console.log('Librepago OK ✅');
  await MilPagosDS.initialize();
  console.log('MilPagos OK ✅');
  // await GSComputerDS.initialize();
  // console.log('GSComputer OK  ✅');
};

export const getDatasource = (agr: number): DataSource => {
  console.log('get', agr);
  switch (agr) {
    case 1:
      return CarropagoDS;
    case 2:
      return MilPagosDS;
    case 3:
      return LibrepagoDS;
    case 5:
      return SitranDS;
  }
};
