import { TestResp } from './testApi.controller';
import Usuarios from '../db/sitran/models/usuarios.entity';
export interface Resp {
    message?: string;
    res?: Usuarios;
}
export declare class TestApiService {
    getUser(): Promise<TestResp>;
}
