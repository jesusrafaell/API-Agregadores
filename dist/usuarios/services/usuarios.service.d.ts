import { LoginUsuarioDto } from '../dto/login-usuario.dto';
import Usuarios from '../../db/sitran/models/usuarios.entity';
import 'dotenv/config';
import { Repository } from 'typeorm';
export declare class UsuariosService {
    private userRepository;
    constructor(userRepository: Repository<Usuarios>);
    getUsuario(user: LoginUsuarioDto): Promise<Usuarios>;
    validatePerfil(user: Usuarios): boolean;
}
