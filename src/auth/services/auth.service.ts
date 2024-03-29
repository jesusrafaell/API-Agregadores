import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginUsuarioDto,
  ResAccesToken,
  Token,
} from '../dto/login-usuario.dto';
import { exec } from 'child_process';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { LogsService } from '../../logs/logs.service';
import { Log } from '../../logs/dto/dto-logs.dto';
import Usuarios from '../../db/sitran/models/usuarios.entity';
import { compare } from 'bcrypt';
import Agregador from '../../db/sitran/models/agregador.entity';
import SitranDS from '../../db/config/sitran_dataSource';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly logService: LogsService,
  ) {}

  async jwtLogin(email: string, id: number, agr: Agregador): Promise<Token> {
    const payload = { email, sub: id, agr };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: LoginUsuarioDto): Promise<ResAccesToken> {
    const usuario: Usuarios = await this.userService.getUsuario(user);

    if (!usuario) throw new UnauthorizedException('Usuario invalido');

    const validPassword = await compare(user.password, usuario.password);

    if (!validPassword) {
      throw new BadRequestException('Usuario o clave invalido');
    }

    const validPerfil = this.userService.validatePerfil(usuario);

    if (!validPerfil) {
      throw new UnauthorizedException('Este Usuario no tiene acceso al API');
    }

    const token = await this.jwtLogin(
      usuario.email,
      usuario.id,
      usuario.agregador,
    );

    const log: Log = {
      id: usuario.id,
      method: 'POST',
      path: '/auth/login',
      msg: `Login de Usuario: ${usuario.email}`,
    };

    //[3312]
    await this.logService.saveLogsSitran(log);

    return {
      agr: usuario.agregador.name,
      access_token: token.access_token,
    };
  }
}
