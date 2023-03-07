import { DataSource } from 'typeorm';
import ModelPos from '../models/ModelPos.entity';

export const list: ModelPos[] = [
  {
    Modelo: 'Modelo 1',
  },
  {
    Modelo: 'Modelo 2',
  },
];

const modelPos = async (db: DataSource): Promise<void> => {
  //
  const valid = await db.getRepository(ModelPos).find();
  if (!valid.length) await db.getRepository(ModelPos).save(list);
  console.log('ModelPos ✅');
};

export default modelPos;
