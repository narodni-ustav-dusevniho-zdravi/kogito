import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ContentLevelId = number;

@Entity()
export class ContentLevel {
  @PrimaryGeneratedColumn()
  id: ContentLevelId;

  @Column({ type: 'int' })
  level = 1;

  @Column()
  name: string;
}
