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
import {
  RespStatusTerm,
  RespTerm,
  TerminalsService,
} from './terminals.service';

@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard)
@Controller('terminal')
export class TerminalsController {
  constructor(
    private readonly _TerminalsService: TerminalsService,
    private readonly logService: LogsService,
  ) {}

  @Post('create')
  createTerminals(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Body() body: CreateTerminalsDto,
  ): Promise<RespTerm> {
    const header: Header = this.logService.getDataToken(token, req);
    return this._TerminalsService.createTerminals(
      body.comerRif,
      body.comerCantPost,
      body.comerCuentaBanco,
      body.prefijo,
      header,
    );
  }

  @Get('all')
  getAllTerminal(
    @Headers('authorization') token: string,
    @Req() req: Request,
  ): Promise<RespTerm> {
    const header: Header = this.logService.getDataToken(token, req);
    return this._TerminalsService.getAllTerminals(header);
  }

  @Put('/status/:terminal')
  PutChangeStatus(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Param() params: ParamTermDto,
    @Body() body: BodyTermStatusDto,
  ): Promise<RespStatusTerm> {
    const header: Header = this.logService.getDataToken(token, req);
    console.log('Data', params.terminal, body.status);
    return this._TerminalsService.updateStatus(
      params.terminal,
      body.status,
      header,
    );
  }
}
