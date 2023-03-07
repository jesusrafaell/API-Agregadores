import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ModelPos', { synchronize: false })
export default class ModelPos {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, length: 150 })
  Modelo!: string;
}
