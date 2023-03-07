import { Module, CacheModule } from '@nestjs/common';
import * as cacheManager from 'cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: 'memory',
      max: 1000,
      ttl: 0,
      // store: cacheManager.caching({
      //   store: 'memory',
      //   max: 1000,
      //   ttl: null,
      // }),
    }),
  ],
  exports: [CacheModule],
})
export class MyCacheModule {}
