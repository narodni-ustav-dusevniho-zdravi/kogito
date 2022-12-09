import { QuestionnaireService } from '@app/questionnaire/questionnaire.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NodeResolver } from '@app/app/node.resolver';
import { fromGlobalId } from '@app/app/node';
import { Questionnaire } from '@app/questionnaire/questionnaire.entity';
import { QuestionInput } from '../graphql.schema';
import { Question } from '@app/questionnaire/question.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '@app/auth/auth.guard';

@Resolver('Questionnaire')
export class QuestionnaireResolver extends NodeResolver {
  constructor(private readonly questionnaireService: QuestionnaireService) {
    super();
  }

  @UseGuards(GqlAdminAuthGuard)
  @Query()
  async Questionnaire(@Args('id') id: string) {
    return this.questionnaireService.findQuestionnaireById(fromGlobalId(id));
  }

  @UseGuards(GqlAdminAuthGuard)
  @Query()
  async allQuestionnaires() {
    return this.questionnaireService.filterQuestionnaires();
  }

  @UseGuards(GqlAdminAuthGuard)
  @Query()
  async _allQuestionnairesMeta() {
    return {
      count: (await this.questionnaireService.filterQuestionnaires()).length,
    };
  }

  @UseGuards(GqlAdminAuthGuard)
  @Mutation()
  async createQuestionnaire(
    @Args('name') name: string,
    @Args('questions') questions: QuestionInput[],
  ) {
    const questionnaire = new Questionnaire();

    questionnaire.name = name;

    let index = 0;
    for (const question of questions) {
      const questionRow = new Question();

      questionRow.question = question.question;
      // questionRow.answers = question.answers;
      questionRow.index = index;

      await questionRow.save();

      index += 1;
    }

    await questionnaire.save();

    return questionnaire;
  }

  @UseGuards(GqlAdminAuthGuard)
  @Mutation()
  async updateQuestionnaire(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('questions') questions: QuestionInput[],
  ) {
    const questionnaire = await this.questionnaireService.findQuestionnaireById(
      fromGlobalId(id),
    );

    questionnaire.name = name;

    let index = 0;
    for (const question of questions) {
      let questionRow = null;

      if (question.id) {
        questionRow = await this.questionnaireService.findQuestionById(
          fromGlobalId(question.id),
        );
      } else {
        questionRow = new Question();
        questionRow.questionId = questionnaire;
      }

      questionRow.question = question.question;
      questionRow.answers = question.answers;
      questionRow.index = index;

      await questionRow.save();

      index += 1;
    }

    await questionnaire.save();

    return questionnaire;
  }
}
