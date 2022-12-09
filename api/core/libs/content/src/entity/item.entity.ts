import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentGroup } from '@app/content/entity/group.entity';
import { ContentPhase } from '@app/content/entity/phase.entity';
import { ContentLevel } from '@app/content/entity/level.entity';

export type ContentItemId = number;

@Entity()
export class ContentItem {
  @PrimaryGeneratedColumn()
  id: ContentItemId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @ManyToOne(() => ContentPhase)
  phase: ContentPhase;

  @ManyToOne(() => ContentLevel)
  level: ContentLevel;

  @ManyToOne(() => ContentGroup)
  group: ContentGroup;
}
