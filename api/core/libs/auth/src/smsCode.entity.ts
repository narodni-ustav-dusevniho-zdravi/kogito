import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@app/user/user.entity';

export type SmsCodeId = number;

@Entity()
export class SmsCode {
  @PrimaryGeneratedColumn()
  id: SmsCodeId;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'varchar', length: 6 })
  code: string;

  @Column({ type: 'datetime', nullable: true })
  used: Date | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ipAddress: string | null;

  constructor() {
    this.code = Math.floor(100000 + Math.random() * 900000).toString();
  }
}
