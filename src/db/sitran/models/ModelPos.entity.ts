import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Type_pos', { synchronize: true })
export default class Type_pos {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  id_agregador!: number;

  @Column()
  modelo!: string;

  @Column()
  tipo!: string;
}
