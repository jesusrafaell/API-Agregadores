import { DataSource } from 'typeorm';
import origin_logs_api from '../global/models/origin_logs_api.entity';

const data: origin_logs_api = {
  name: 'API TRANRED',
};

const origin_logs = async (appDataSource: DataSource) => {
  const valid = await appDataSource
    .getRepository(origin_logs_api)
    .findOne({ where: data });
  if (!valid) await appDataSource.getRepository(origin_logs_api).save(data);
  console.log('Listo origin_logs');
};

export default origin_logs;
