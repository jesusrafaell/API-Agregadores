import {
  Controller,
  Body,
  Headers,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Header } from '../logs/dto/dto-logs.dto';
import { LogsService } from '../logs/logs.service';
import { CreateTerminalsDto } from './dto/create-terminals.dto';
import { RespTerm, TerminalsService } from './terminals.service';

@UsePipes(ValidationPipe)
@Controller('terminal')
export class TerminalsController {
  constructor(
    private readonly _TerminalsService: TerminalsService,
    private readonly logService: LogsService,
  ) {}

  @UseGuards(JwtAuthGuard)
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
}
