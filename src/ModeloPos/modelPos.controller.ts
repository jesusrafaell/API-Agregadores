import {
  Controller,
  Body,
  Headers,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
  Req,
  Get,
  Put,
  Param,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Header } from '../logs/dto/dto-logs.dto';
import { LogsService } from '../logs/logs.service';

import { Cache } from 'cache-manager';
import { ModelPosService } from './modeloPos.service';
import ModelPos from '../db/models/ModelPos.entity';

@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@Controller('modelPos')
export class ModelPosController {
  constructor(
    private readonly _ModelPos: ModelPosService,
    private readonly logService: LogsService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  @Get('all')
  async getAllModelPos(
    @Headers('authorization') token: string,
    @Req() req: Request,
  ): Promise<ModelPos[]> {
    const header: Header = await this.logService.getDataTokenCache(
      token,
      req,
      this.cacheService,
    );
    return this._ModelPos.getAllModelPos(header.DS);
  }
}
