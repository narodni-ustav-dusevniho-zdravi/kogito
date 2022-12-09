import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type ContentStoryId = number;

@Entity()
export class ContentStory {
  @PrimaryGeneratedColumn()
  id: ContentStoryId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('datetime')
  published: Date;

  @Column('boolean')
  enabled = true;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  videoLink: string | null;

  @Column('text')
  content: string;
}
