import { DynamicModule } from '@nestjs/common';
import { IAgregadoresDS } from './db/config/dto';
export declare class AppModule {
    static forRoot(config: {
        DS: IAgregadoresDS;
    }): DynamicModule;
}
