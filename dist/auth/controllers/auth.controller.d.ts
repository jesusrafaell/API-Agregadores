import { LoginUsuarioDto, Token } from '../dto/login-usuario.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(login: LoginUsuarioDto): Promise<Token>;
}
