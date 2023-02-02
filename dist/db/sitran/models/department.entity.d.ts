import Profile from './profile.entity';
export default class Department {
    id?: number;
    name: string;
    active?: number;
    createdAt?: Date;
    updatedAt?: Date;
    profiles?: Profile[];
}
