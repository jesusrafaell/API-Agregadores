import Agregador from './agregador.entity';
import Profile from './profile.entity';
import Status from './status.entity';
export default class Usuarios {
    id?: number;
    login: string;
    password: string;
    name: string;
    id_type: string;
    ident: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    status: Status;
    profile: Profile;
    agregador?: Agregador;
}
