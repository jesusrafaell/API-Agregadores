import { LoginUsuarioDto, ResAccesToken, Token } from '../dto/login-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../../usuarios/services/usuarios.service';
import { LogsService } from '../../logs/logs.service';
import Agregador from '../../db/sitran/models/agregador.entity';
export declare class AuthService {
    private userService;
    private readonly jwtService;
    private readonly logService;
    constructor(userService: UsuariosService, jwtService: JwtService, logService: LogsService);
    jwtLogin(email: string, id: number, agr: Agregador): Promise<Token>;
    login(user: LoginUsuarioDto): Promise<ResAccesToken>;
}
