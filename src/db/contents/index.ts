import CarropagoDS from '../config/dataSource/carroPago';
import CONSULTELDS from '../config/dataSource/consultel';
import DISGLOBALDS from '../config/dataSource/disglobal';
import GSComputerDS from '../config/dataSource/gscomputer';
import LibrepagoDS from '../config/dataSource/librePago';
import SitranDS from '../config/sitran_dataSource';
import list_afi_carropago from './afiliados/afi_carropago';
import list_afi_gscomputer from './afiliados/afi_gscomputer';
import list_afi_librepago from './afiliados/afi_librepago';
import afiliados_api from './afiliadosApi';
import origin_logs from './origin_logs';

SitranDS.initialize()
  .then(async () => {
    await LibrepagoDS.initialize()
      .then(async (DS) => {
        console.log('LibrePago');
        await afiliados_api(DS, list_afi_librepago);
        await origin_logs(DS);
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
    await CarropagoDS.initialize()
      .then(async (DS) => {
        console.log('Carropago');
        await afiliados_api(DS, list_afi_carropago);
        await origin_logs(DS);
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
    await GSComputerDS.initialize()
      .then(async (DS) => {
        console.log('GSComputer');
        await afiliados_api(DS, list_afi_gscomputer);
        await origin_logs(DS);
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
    await DISGLOBALDS.initialize()
      .then(async (DS) => {
        console.log('Disglobal');
        await afiliados_api(DS, list_afi_gscomputer);
        await origin_logs(DS);
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
    await CONSULTELDS.initialize()
      .then(async (DS) => {
        console.log('Consultel');
        await afiliados_api(DS, list_afi_gscomputer);
        await origin_logs(DS);
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
