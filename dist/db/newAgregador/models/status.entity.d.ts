import Usuarios from './usuarios.entity';
export default class Status {
    id?: number;
    name: string;
    usuarios?: Usuarios[];
}
