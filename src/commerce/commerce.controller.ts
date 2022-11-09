import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
  Headers,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CommerceDto } from './dto/new-commerce.dto';
import { CommerceService, Resp } from './commerce.service';
import { Request } from 'express';
import { LogsService } from '../logs/logs.service';
import { Header } from '../logs/dto/dto-logs.dto';

@UsePipes(ValidationPipe)
@Controller('commerce')
export class CommerceController {
  constructor(
    private readonly _commerceService: CommerceService,
    private readonly logService: LogsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createCommerce(
    @Headers('authorization') token: string,
    @Req() req: Request,
    @Body() body: CommerceDto,
  ): Promise<Resp> {
    const header: Header = this.logService.getDataToken(token, req);
    // console.log('header dat', header);
    return this._commerceService.createCommerce(body, header);
  }
}
