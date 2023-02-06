import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Department from './department.entity';
import Roles from './roles.entity';
import Usuarios from './usuarios.entity';

@Entity()
@Index(['department', 'rol'], { unique: true })
export default class Profile {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany(() => Usuarios, (usuario) => usuario.profile)
  usuarios?: Usuarios[];

  @ManyToOne(() => Department, (department) => department.profiles)
  @JoinColumn({ name: 'department' })
  department!: Department;

  @ManyToOne(() => Roles, (roles) => roles.profiles)
  @JoinColumn({ name: 'rol' })
  rol!: Roles;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
