import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ContentGroupId = number;

@Entity()
export class ContentGroup {
  @PrimaryGeneratedColumn()
  id: ContentGroupId;

  @Column()
  name: string;
}
