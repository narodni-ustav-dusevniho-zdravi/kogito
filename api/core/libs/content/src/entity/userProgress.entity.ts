import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentPhaseId } from '@app/content/entity/phase.entity';
import { User } from '@app/user/user.entity';

export type UserProgressId = number;

export type ItemProgress = {
  itemId: string;
  progress: number;
  lastUpdate: Date;
};

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: ContentPhaseId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @Column()
  journey: string;

  @Column({ type: 'boolean' })
  active = false;

  @Column({ type: 'json' })
  itemsProgress: ItemProgress[] = [];

  constructor() {
    this.itemsProgress = [];
  }
}
