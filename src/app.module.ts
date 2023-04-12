import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgregadoresModule } from './agregadores/agregadores.module';
import { AuthModule } from './auth/auth.module';
import { CommerceModule } from './commerce/commerce.module';
import { TerminalsModule } from './terminals/terminals.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import Agregador from './db/sitran/models/agregador.entity';
import Usuarios from './db/sitran/models/usuarios.entity';
import Status from './db/sitran/models/status.entity';
import Profile from './db/sitran/models/profile.entity';
import Department from './db/sitran/models/department.entity';
import Roles from './db/sitran/models/roles.entity';
import general_logs_api from './db/global/models/general_logs_api.entity';
import origin_logs_api from './db/global/models/origin_logs_api.entity';
import { MyCacheModule } from './cache/cache.module';

import 'dotenv/config';
import { ModelPosModule } from './ModeloPos/modeloPos.module';
import Type_pos from './db/sitran/models/ModelPos.entity';
const { DB_HOST_SITRAN, DB_USER_SITRAN, DB_PASS_SITRAN, DB_DATA_SITRAN } =
  process.env;

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'mssql',
        host: DB_HOST_SITRAN,
        username: DB_USER_SITRAN,
        password: DB_PASS_SITRAN,
        database: DB_DATA_SITRAN,
        logging: false,
        options: {
          encrypt: true,
        },
        extra: {
          trustServerCertificate: true,
        },
        entities: [
          // __dirname + '/../sitran/models/**/*.entity.{ts,js}',
          // globalModels,
          Usuarios,
          Status,
          Profile,
          Agregador,
          Department,
          Roles,
          general_logs_api,
          origin_logs_api,
          Type_pos,
        ],
        migrationsTableName: 'migrations_api_v1',
      }),
    }),
    MyCacheModule,
    AgregadoresModule,
    AuthModule,
    CommerceModule,
    TerminalsModule,
    ModelPosModule,
  ],
})
export class AppModule {}
