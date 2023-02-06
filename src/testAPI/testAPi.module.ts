import { Module } from '@nestjs/common';
import { TestApiService } from './TestApi.service';
import { TestApiController } from './testApi.controller';

@Module({
  controllers: [TestApiController],
  providers: [TestApiService],
  exports: [TestApiService],
})
export class TestApiModule {}
