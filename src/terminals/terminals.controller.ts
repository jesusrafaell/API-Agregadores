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
import { CreateTerminalsDto } from './dto/create-terminals.dto';
import { RespTerm, TerminalsService } from './terminals.service';

@UsePipes(ValidationPipe)
@Controller('terminal')
export class TerminalsController {
  constructor(private readonly _TerminalsService: TerminalsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createTerminals(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Body() body: CreateTerminalsDto,
  ): Promise<RespTerm> {
    const log: any = {
      token,
      method: req.method,
      path: req.url,
      msg: '',
    };
    return this._TerminalsService.createTerminals(
      body.comerRif,
      body.comerCantPost,
      log,
    );
  }
}
