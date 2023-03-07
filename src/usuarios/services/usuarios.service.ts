import { LoginUsuarioDto } from '../dto/login-usuario.dto';
import { Injectable } from '@nestjs/common';
import SitranDS from '../../db/config/sitran_dataSource';
import Usuarios from '../../db/sitran/models/usuarios.entity';
import 'dotenv/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private userRepository: Repository<Usuarios>,
  ) {}
  async getUsuario(user: LoginUsuarioDto): Promise<Usuarios> {
    return await this.userRepository.findOne({
      where: { login: user.login },
      relations: ['status', 'profile', 'profile.department', 'agregador'],
    });
  }

  validatePerfil(user: Usuarios): boolean {
    return (
      //si tiene agregador y el dep es api y esta activo
      user.agregador &&
      user.profile.department.name === 'API' &&
      user.status.name === 'Activo'
    );
  }
}
