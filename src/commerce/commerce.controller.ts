import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
  Headers,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CommerceDto } from './dto/new-commerce.dto';
import { CommerceService, Resp } from './commerce.service';
import { Request } from 'express';
import { LogsService } from '../logs/logs.service';
import { Header } from '../logs/dto/dto-logs.dto';
import { ICommerceAll, ICommerceGet, RifDto } from './dto';

@UsePipes(ValidationPipe)
@Controller('commerce')
@UseGuards(JwtAuthGuard)
export class CommerceController {
  constructor(
    private readonly _commerceService: CommerceService,
    private readonly logService: LogsService,
  ) {}

  @Post('create')
  createCommerce(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Body() body: CommerceDto,
  ): Promise<Resp> {
    const header: Header = this.logService.getDataToken(token, req);
    return this._commerceService.createCommerce(body, header);
  }

  @Get('/rif/:comerRif')
  getCommerce(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Param() params: RifDto,
  ): Promise<ICommerceGet> {
    const header: Header = this.logService.getDataToken(token, req);
    return this._commerceService.getCommerceData(params.comerRif, header);
  }

  @Post('/rif/:comerRif')
  getCommercePost(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Param() params: RifDto,
  ): Promise<ICommerceGet> {
    const header: Header = this.logService.getDataToken(token, req);
    return this._commerceService.getCommerceData(params.comerRif, header);
  }

  @Get('/all')
  getAllCommerce(
    @Headers('authorization') token: string,
    @Req() req: Request,
  ): Promise<ICommerceAll> {
    const header: Header = this.logService.getDataToken(token, req);
    return this._commerceService.getAllCommerce(header);
  }
}
