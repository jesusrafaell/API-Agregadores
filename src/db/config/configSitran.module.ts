import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';

const configModule: DynamicModule[] = [
  ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: () => ({
      type: 'mssql',
      host: process.env.DB_HOST,
      database: process.env.DB_DATA,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      logging: false,
      options: {
        encrypt: true,
      },
      extra: {
        trustServerCertificate: true,
      },
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
  }),
];

export default configModule;
