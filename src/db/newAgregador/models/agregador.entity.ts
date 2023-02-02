import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Usuarios from './usuarios.entity';

@Entity({ synchronize: false })
export default class Agregador {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  key!: number;

  @Column({ nullable: false })
  host!: string;

  @Column({ nullable: false })
  db!: string;

  @Column({ nullable: false })
  isAgr!: number;

  @Column({ default: 1 })
  active?: number;

  @OneToMany(() => Usuarios, (user) => user.agregador)
  usuarios?: Usuarios[];
}
