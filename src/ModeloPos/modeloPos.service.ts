import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Type_pos from '../db/sitran/models/ModelPos.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModelPosService {
  constructor(
    @InjectRepository(Type_pos)
    private modelRepository: Repository<Type_pos>,
  ) {}

  async getAllModelPos(id_agregador: number): Promise<Type_pos[]> {
    // console.log('agr', id_agregador);
    try {
      await this.modelRepository.find();
      return await this.modelRepository.find({
        select: ['id', 'modelo'],
        where: { id_agregador },
      });
    } catch (err) {
      console.log('Error getAllModelPos', err);
    }
  }

  async validModel(id: number, idAgr: number): Promise<Type_pos> {
    return await this.modelRepository.findOne({
      where: { id, id_agregador: idAgr },
    });
  }
}
