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
import {
  BodyTermStatusDto,
  CreateTerminalsDto,
  ParamTermDto,
} from './dto/create-terminals.dto';
import { CuentaNumeroDto, TerminalDto } from './dto/put-terminals.dto';
import {
  RespStatusTerm,
  RespTerm,
  TerminalsService,
} from './terminals.service';

import { Cache } from 'cache-manager';

@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@Controller('terminal')
export class TerminalsController {
  constructor(
    private readonly _TerminalsService: TerminalsService,
    private readonly logService: LogsService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  @Post('create')
  async createTerminals(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Body() body: CreateTerminalsDto,
  ): Promise<RespTerm> {
    const header: Header = await this.logService.getDataTokenCache(
      token,
      req,
      this.cacheService,
    );
    return this._TerminalsService.createTerminals(
      body.comerRif,
      // body.comerCantPost,
      body.comerCuentaBanco,
      body.prefijo,
      body.modelo,
      body.serial,
      header,
    );
  }

  @Get('all')
  async getAllTerminal(
    @Headers('authorization') token: string,
    @Req() req: Request,
  ): Promise<RespTerm> {
    const header: Header = await this.logService.getDataTokenCache(
      token,
      req,
      this.cacheService,
    );
    return this._TerminalsService.getAllTerminals(header);
  }

  @Put('/bank/:terminal')
  async PutChangeBank(
    @Headers('authorization') token: string,
    @Param() params: TerminalDto,
    @Body() body: CuentaNumeroDto,
    @Req() req: Request,
  ): Promise<RespStatusTerm> {
    const header: Header = await this.logService.getDataTokenCache(
      token,
      req,
      this.cacheService,
    );
    return this._TerminalsService.updateAccountNumber(
      params.terminal,
      body.comerCuentaBanco,
      header,
    );
  }

  @Put('/status/:terminal')
  async PutChangeStatus(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Param() params: ParamTermDto,
    @Body() body: BodyTermStatusDto,
  ): Promise<RespStatusTerm> {
    const header: Header = await this.logService.getDataTokenCache(
      token,
      req,
      this.cacheService,
    );
    console.log('Data', params.terminal, body.status);
    return this._TerminalsService.updateStatus(
      params.terminal,
      body.status,
      header,
    );
  }
}
