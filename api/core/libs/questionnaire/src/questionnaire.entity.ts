import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

export type QuestionnaireId = number;

@Entity()
export class Questionnaire extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: QuestionnaireId;

  @Column()
  name: string;

  @OneToMany(() => Question, (question) => question.questionnaire, {
    eager: true,
  })
  questions: Question[];

  @Column({ type: 'boolean', default: false })
  isDefaultAfterRegistration = false;

  @Column({ type: 'boolean', default: false })
  isDefaultAfterMonthUsing = false;

  @Column({ type: 'boolean', default: false })
  isDefaultAfterMonthSimpler = false;

  @Column({ type: 'boolean', default: false })
  isDefaultForControlGroupAfterMonth = false;

  @Column({ type: 'json', nullable: true })
  scoreLabel: Record<number, string> = null;

  public get questionCount(): number {
    return this.questions.length;
  }
}
