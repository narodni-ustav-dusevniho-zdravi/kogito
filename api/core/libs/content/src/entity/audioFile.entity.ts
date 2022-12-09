import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ContentAudioFileID = number;

@Entity()
export class ContentAudioFile {
  @PrimaryGeneratedColumn()
  id: ContentAudioFileID;
}
