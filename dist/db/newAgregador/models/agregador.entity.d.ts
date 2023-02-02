import Usuarios from './usuarios.entity';
export default class Agregador {
    id?: number;
    name: string;
    key: number;
    host: string;
    db: string;
    isAgr: number;
    active?: number;
    usuarios?: Usuarios[];
}
