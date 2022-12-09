import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ContentPhaseId = number;

@Entity()
export class ContentPhase {
  @PrimaryGeneratedColumn()
  id: ContentPhaseId;

  @Column()
  name: string;
}
