import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { LoginUsuarioDto, Token } from '../dto/login-usuario.dto';
import { AuthService } from '../services/auth.service';

@UsePipes(ValidationPipe)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  login(@Body() login: LoginUsuarioDto): Promise<Token> {
    return this.authService.login(login);
  }
}

/*
    switch (agr) {
      case 'librepago':
        return this.authService.login(login, agr);
      case 'carropago':
        return this.authService.login(login, agr);
      default:
        throw new UnauthorizedException(`Agregador [${agr}] no existe`);
    }
*/
