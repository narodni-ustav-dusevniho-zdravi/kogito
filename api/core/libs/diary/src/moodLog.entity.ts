import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MOOD } from './mood.types';
import { User } from '@app/user/user.entity';

export type DiaryMoodLogId = number;

@Entity()
export class DiaryMoodLog {
  @PrimaryGeneratedColumn()
  id: DiaryMoodLogId;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  mood: MOOD;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;
}
