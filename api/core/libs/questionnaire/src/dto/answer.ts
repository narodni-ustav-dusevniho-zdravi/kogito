import { QuestionId } from '../question.entity';

export class Answer {
  answer: string;
  points: number;
  overrideLabel?: string;
}

export type UserAnswerType = {
  questionId: QuestionId;
  answerIndex: number;
};

export class UserAnswer {
  questionId: QuestionId;
  answerIndex: number;
}
