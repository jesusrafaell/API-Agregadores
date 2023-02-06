import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Agregador from './agregador.entity';
import Profile from './profile.entity';
import Status from './status.entity';

@Entity()
export default class Usuarios {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  login!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  id_type!: string;

  @Column({ nullable: false })
  ident!: string;

  @Column({ nullable: false })
  email!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Status, (status) => status.usuarios)
  status!: Status;

  @ManyToOne(() => Profile, (profile) => profile.usuarios)
  profile: Profile;

  @ManyToOne(() => Agregador, (agr) => agr.usuarios)
  agregador?: Agregador;
}
