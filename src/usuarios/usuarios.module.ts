import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Usuarios from '../db/sitran/models/usuarios.entity';
import { UsuariosService } from './services/usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
