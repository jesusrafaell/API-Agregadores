import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import origin_logs_librepago from './origin_logs_api.entity';

@Entity('general_logs_api', { synchronize: false })
export default class general_logs_api {
  @PrimaryGeneratedColumn()
  id?: number;

  // @ManyToOne(() => Usuarios, (Usuarios) => Usuarios.general_logs)
  // @JoinColumn({ name: 'id_user' })
  @Column()
  id_user: number;

  @Column()
  descript!: string;

  @ManyToOne(
    () => origin_logs_librepago,
    (origin_logs) => origin_logs.general_logs,
  )
  @JoinColumn({ name: 'id_origin_logs' })
  id_origin_logs!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
