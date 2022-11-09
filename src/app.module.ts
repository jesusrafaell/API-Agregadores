import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommerceModule } from './commerce/commerce.module';
import { TestApiModule } from './testAPI/testAPi.module';

@Module({
  imports: [
    // ...configModule,
    TestApiModule,
    AuthModule,
    CommerceModule,
    // TerminalsModule,
    // AbonoModule,
  ],
})
export class AppModule {}
