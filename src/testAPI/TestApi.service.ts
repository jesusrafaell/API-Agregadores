import { Injectable } from '@nestjs/common';
import { TestResp } from './testApi.controller';
import Usuarios from '../db/sitran/models/usuarios.entity';
import SitranDS from '../db/config/sitran_dataSource';

export interface Resp {
  message?: string;
  res?: Usuarios;
}

@Injectable()
export class TestApiService {
  async getUser(): Promise<TestResp> {
    const user = await SitranDS.getRepository(Usuarios).find();
    return {
      message: 'Todo ok',
      user,
    };
  }
}
