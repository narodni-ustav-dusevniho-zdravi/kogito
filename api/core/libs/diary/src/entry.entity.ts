import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/user/user.entity';

export type DiaryEntryId = number;

@Entity()
export class DiaryEntry {
  @PrimaryGeneratedColumn()
  id: DiaryEntryId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'text' })
  content: string;
}
