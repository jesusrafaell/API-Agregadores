import { LoginUsuarioDto } from '../dto/login-usuario.dto';
import Usuarios from '../../db/sitran/models/usuarios.entity';
import 'dotenv/config';
export declare class UsuariosService {
    getUsuario(user: LoginUsuarioDto): Promise<Usuarios>;
    validatePerfil(user: Usuarios): boolean;
}
