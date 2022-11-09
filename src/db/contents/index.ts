import CarropagoDS from '../config/dataSource/carroPago';
import LibrepagoDS from '../config/dataSource/librePago';
import SitranDS from '../config/sitran_dataSource';
import afiliados_api from './afiliadosApi';
import origin_logs_librepago from './origin_logs_librepago';

SitranDS.initialize()
  .then(async () => {
    await LibrepagoDS.initialize()
      .then(async () => {
        await afiliados_api(LibrepagoDS);
        await origin_logs_librepago(LibrepagoDS);
        process.exit();
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
    await CarropagoDS.initialize()
      .then(async () => {
        await afiliados_api(CarropagoDS);
        await origin_logs_librepago(CarropagoDS);
        process.exit();
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
