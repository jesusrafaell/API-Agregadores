import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Parametro_Terminal')
export default class Parametro_Terminal {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  prefijo!: string;

  @Column()
  provedor!: number;

  @Column()
  tipoPos!: string;

  @Column()
  modo!: string;

  @Column()
  tecladoAbierto!: number;

  @Column()
  usuarioResponsable!: string;

  @UpdateDateColumn()
  updatedAt?: Date;
}
