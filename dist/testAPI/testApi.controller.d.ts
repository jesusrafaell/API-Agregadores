import Usuarios from '../db/sitran/models/usuarios.entity';
import { TestApiService } from './TestApi.service';
export interface TestResp {
    message: string;
    user: Usuarios[];
}
export declare class TestApiController {
    private readonly _testApiService;
    constructor(_testApiService: TestApiService);
    test(): Promise<TestResp>;
}
