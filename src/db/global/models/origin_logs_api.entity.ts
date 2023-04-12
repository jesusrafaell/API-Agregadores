import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import general_logs_api from './general_logs_api.entity';

@Entity({ synchronize: false })
export default class origin_logs_api {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @OneToMany(
    () => general_logs_api,
    (general_logs) => general_logs.id_origin_logs,
  )
  @JoinColumn({ name: 'general_logs' })
  general_logs?: general_logs_api[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
