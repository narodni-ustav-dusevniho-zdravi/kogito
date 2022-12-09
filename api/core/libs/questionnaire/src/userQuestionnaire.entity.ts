import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { User } from '@app/user/user.entity';
import { UserAnswerType } from '@app/questionnaire/dto/answer';
import { toGlobalId } from '@app/app/node';

export type UserQuestionnaireId = number;

export const QUESTIONNAIRE_OCCASION = {
  Registration: 0,
  ControlAfterMonthRegistration: 1,
  NormalAfterMonthRegistration: 2,
  SimplerAfterMonthRegistration: 3,
};

@Entity()
export class UserQuestionnaire extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: UserQuestionnaireId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: Date, nullable: true })
  completedAt: Date | null;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Questionnaire)
  questionnaire: Questionnaire;

  @Column()
  questionnaireId: number;

  @Column({ type: 'json' })
  answers: UserAnswerType[] = [];

  @Column()
  points: number;

  @Column({ type: 'varchar', length: 5, nullable: true })
  label: string | null = null;

  @Column({ type: 'int', default: QUESTIONNAIRE_OCCASION.Registration })
  occasion = QUESTIONNAIRE_OCCASION.Registration;

  constructor() {
    super();
    this.points = 0;
  }

  public get globalId(): string {
    return toGlobalId(this.id, 'UserQuestionnaire');
  }

  public get finished(): boolean {
    return !!this.completedAt;
  }

  //
  // @Field(() => [UserAnswer], { name: 'answers' })
  // public get userAnswers() {
  //   return this.answers.map((answer) => {
  //     const userAnswer = new UserAnswer();
  //     userAnswer.questionId = answer.questionId;
  //     userAnswer.answerIndex = answer.answerIndex;
  //     return userAnswer;
  //   });
  // }
}
