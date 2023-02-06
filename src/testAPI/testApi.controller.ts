import { Controller, ValidationPipe, Get } from '@nestjs/common';
import Usuarios from '../db/sitran/models/usuarios.entity';
import { TestApiService } from './TestApi.service';

export interface TestResp {
  message: string;
  user: Usuarios[];
}

@Controller('test')
export class TestApiController {
  constructor(private readonly _testApiService: TestApiService) {}

  @Get('index')
  test(): Promise<TestResp> {
    return this._testApiService.getUser();
  }
}
