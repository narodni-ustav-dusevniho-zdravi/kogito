import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/user/user.entity';

export type DiaryViciousCircleId = number;

@Entity()
export class DiaryViciousCircle {
  @PrimaryGeneratedColumn()
  id: DiaryViciousCircleId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'text' })
  name = '';

  @Column({ type: 'json' })
  trigger = [];

  @Column({ type: 'json' })
  negativeThoughts = [];

  @Column({ type: 'json' })
  emotions = [];

  @Column({ type: 'json' })
  physicalSymptoms = [];

  @Column({ type: 'json' })
  behaviour = [];
}
