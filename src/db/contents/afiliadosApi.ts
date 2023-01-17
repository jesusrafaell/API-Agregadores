import { DataSource } from 'typeorm';
import AfiliadosApi from '../models/afiliados_api.entity';
// import Comercios from '../models/comercios.entity';

export default async function (DS: DataSource, data: AfiliadosApi[]) {
  const valid = await DS.getRepository(AfiliadosApi).find();
  if (!valid.length) await DS.getRepository(AfiliadosApi).save(data);
  console.log('Listo afiliados');
}
