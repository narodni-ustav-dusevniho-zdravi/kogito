import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/user/user.entity';

export type UserScheduleId = number;

export type ScheduleProgress = {
  todoId: string;
  checked: boolean;
  lastUpdate: Date;
};

@Entity()
export class UserSchedule {
  @PrimaryGeneratedColumn()
  id: UserScheduleId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @Column('date')
  forDay: Date;

  @Column({ type: 'json' })
  progress: ScheduleProgress[] = [];

  constructor() {
    this.progress = [];
  }
}
