import { CacheModule, DynamicModule, Global, Module } from '@nestjs/common';
import { AgregadoresModule } from './agregadores/agregadores.module';
import { AuthModule } from './auth/auth.module';
import { CommerceModule } from './commerce/commerce.module';
import { IAgregadoresDS } from './db/config/dto';
import { TerminalsModule } from './terminals/terminals.module';
import { TestApiModule } from './testAPI/testAPi.module';

@Global()
@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    TestApiModule,
    AuthModule,
    CommerceModule,
    TerminalsModule,
    AgregadoresModule,
  ],
})
export class AppModule {
  static forRoot(config: { DS: IAgregadoresDS }): DynamicModule {
    const DS = config.DS;

    const cacheOptions = {
      isGlobal: true,
      store: 'memory',
      max: 100,
      ttl: null,
    };

    return {
      module: AppModule,
      imports: [CacheModule.register(cacheOptions)],
      providers: [
        {
          provide: 'DS',
          useValue: DS,
        },
      ],
      exports: ['DS'],
    };
  }
}
