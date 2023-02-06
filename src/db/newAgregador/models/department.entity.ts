import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Profile from './profile.entity';

@Entity()
@Index(['name'], { unique: true })
export default class Department {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ default: 1 })
  active?: number;

  @CreateDateColumn({ select: false })
  createdAt?: Date;

  @UpdateDateColumn({ select: false })
  updatedAt?: Date;

  @OneToMany(() => Profile, (Profile) => Profile.department)
  profiles?: Profile[];
}
