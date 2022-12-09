import { Field, InputType } from '@nestjs/graphql';
import { QuestionnaireId } from '../questionnaire.entity';
import { QuestionId } from '../question.entity';
import { GlobalID } from '../../../graphql/node';

@InputType()
export class UserAnswerInput {
  @Field(() => GlobalID)
  questionId: QuestionId;
  @Field()
  answerIndex: number;
}

@InputType()
export class UserQuestionnaireInput {
  @Field(() => GlobalID)
  id: QuestionnaireId;

  @Field(() => [UserAnswerInput])
  answers: UserAnswerInput[];
}
