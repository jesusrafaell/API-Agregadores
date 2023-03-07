import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import SerialPos from '../db/models/SerialPos.entity';

@Injectable()
export class SerialService {
  async saveSerialTerminal(
    terminal: string,
    serial: string,
    id_modelo: number,
    DS: DataSource,
  ): Promise<SerialPos> {
    return await DS.getRepository(SerialPos).save({
      terminal,
      serial,
      id_modelo,
    });
  }

  async getSerial(serial: string, DS: DataSource): Promise<SerialPos> {
    return await DS.getRepository(SerialPos).findOne({
      where: {
        serial,
      },
    });
  }
}
