import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Usuarios from './usuarios.entity';

@Entity()
export default class Status {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  name!: string;

  @OneToMany(() => Usuarios, (usuario) => usuario.status)
  usuarios?: Usuarios[];
}
