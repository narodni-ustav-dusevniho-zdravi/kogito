import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { Answer } from '@app/questionnaire/dto/answer';

export type QuestionId = number;

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: QuestionId;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions)
  questionnaire: Questionnaire;

  @Column({ length: 500 })
  question: string;

  @Column({ type: 'json' })
  answers: Answer[];

  @Column({ type: 'int', default: 0 })
  index = 0;
}
