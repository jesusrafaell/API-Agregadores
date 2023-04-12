import { DataSource } from 'typeorm';
import ModelPos from '../sitran/models/ModelPos.entity';

export const list: ModelPos[] = [
  // {
  //   modelo: 'Modelo 1',
  // },
  // {
  //   modelo: 'Modelo 2',
  // },
];

const modelPos = async (db: DataSource): Promise<void> => {
  //
  const valid = await db.getRepository(ModelPos).find();
  if (!valid.length) await db.getRepository(ModelPos).save(list);
  console.log('ModelPos ✅');
};

export default modelPos;
