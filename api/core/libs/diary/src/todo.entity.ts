import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/user';

enum DayPart {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
}

export type DiaryTodoId = number;

@Entity()
export class DiaryTodo {
  @PrimaryGeneratedColumn()
  id: DiaryTodoId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'datetime', nullable: true })
  completed: Date | null;

  @Column({ type: 'datetime', nullable: true })
  deleted: Date | null;

  @Column({ type: 'text' })
  title: '';

  @Column('enum', { enum: DayPart })
  dayPart: DayPart;
}
