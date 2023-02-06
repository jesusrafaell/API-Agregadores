import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('afiliados_api', { synchronize: true })
export default class afiliado_api {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ unique: true })
  afiliado: string;
}
