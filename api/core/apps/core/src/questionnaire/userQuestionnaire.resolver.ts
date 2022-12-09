import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { NodeResolver } from '@app/app/node.resolver';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/auth/auth.guard';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import {
  QUESTIONNAIRE_OCCASION,
  QuestionnaireService,
} from '@app/questionnaire';
import { UserQuestionnaireInput } from '../graphql.schema';
import { fromGlobalId, toGlobalId } from '@app/app/node';
import { UserQuestionnaire } from '@app/questionnaire/userQuestionnaire.entity';
import { User } from '@app/user/user.entity';
import { NeogateService } from '@app/neogate/neogate.service';

@Resolver('UserQuestionnaire')
export class UserQuestionnaireResolver extends NodeResolver {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
    private readonly neogateService: NeogateService,
  ) {
    super();
  }

  @ResolveField('answers')
  solveAnswers(@Root() node) {
    return node.answers.map((answer) => ({
      ...answer,
      questionId: toGlobalId(answer.questionId, 'Question'),
    }));
  }

  @ResolveField('questionnaire')
  async Questionnaire(@Root() node: UserQuestionnaire) {
    return this.questionnaireService.findQuestionnaireById(
      node.questionnaireId,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async userQuestionnaires(@CurrentUser() user: User) {
    return this.questionnaireService.findForUserQuestionnaireByOccasion(
      user.id,
      QUESTIONNAIRE_OCCASION.Registration,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async currentUserQuestionnaires(@CurrentUser() user: User) {
    if (user.afterMonthPlanned) {
      if (user.group === 'control') {
        return {
          occasion: QUESTIONNAIRE_OCCASION.ControlAfterMonthRegistration,
          questionnaires: await this.questionnaireService.findForUserQuestionnaireByOccasion(
            user.id,
            QUESTIONNAIRE_OCCASION.ControlAfterMonthRegistration,
          ),
        };
      }

      if (user.group === 'normal') {
        return {
          occasion: QUESTIONNAIRE_OCCASION.NormalAfterMonthRegistration,
          questionnaires: await this.questionnaireService.findForUserQuestionnaireByOccasion(
            user.id,
            QUESTIONNAIRE_OCCASION.NormalAfterMonthRegistration,
          ),
        };
      }
    }

    return {
      occasion: QUESTIONNAIRE_OCCASION.Registration,
      questionnaires: await this.userQuestionnaires(user),
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async updateQuestionnaire(
    @Args('input') { id, answers }: UserQuestionnaireInput,
    @CurrentUser() user,
  ) {
    const userQuestionnaire = await this.questionnaireService.findById(
      fromGlobalId(id),
    );

    userQuestionnaire.answers = answers.map((answer) => {
      return {
        questionId: fromGlobalId(answer.questionId),
        answerIndex: answer.answerIndex,
      };
    });

    await this.questionnaireService.solveQuestionnaireStatus(userQuestionnaire);
    await userQuestionnaire.save();

    return userQuestionnaire;
  }
}
