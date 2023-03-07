import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import ModelPos from '../db/models/ModelPos.entity';

@Injectable()
export class ModelPosService {
  // constructor() {}

  async getAllModelPos(DS: DataSource): Promise<ModelPos[]> {
    return await DS.getRepository(ModelPos).find();
  }

  async validModel(id: number, DS: DataSource): Promise<ModelPos> {
    return await DS.getRepository(ModelPos).findOne({
      where: { id },
    });
  }
}
