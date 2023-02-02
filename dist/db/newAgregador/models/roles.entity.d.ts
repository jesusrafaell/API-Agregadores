import Profile from './profile.entity';
export default class Roles {
    id?: number;
    name: string;
    profiles?: Profile[];
    active?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
