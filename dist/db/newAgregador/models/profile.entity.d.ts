import Department from './department.entity';
import Roles from './roles.entity';
import Usuarios from './usuarios.entity';
export default class Profile {
    id?: number;
    usuarios?: Usuarios[];
    department: Department;
    rol: Roles;
    createdAt?: Date;
    updatedAt?: Date;
}
