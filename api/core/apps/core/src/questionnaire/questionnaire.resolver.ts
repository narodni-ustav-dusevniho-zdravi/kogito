import { Args, Query, Resolver } from '@nestjs/graphql';
import { QuestionnaireService } from '@app/questionnaire';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/auth/auth.guard';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { NodeResolver } from '@app/app/node.resolver';
import { fromGlobalId } from '@app/app/node';

@Resolver('Questionnaire')
export class QuestionnaireResolver extends NodeResolver {
  constructor(private readonly questionnaireService: QuestionnaireService) {
    super();
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async questionnaireDetail(@Args('id') id: string, @CurrentUser() user) {
    return this.questionnaireService.findById(fromGlobalId(id));
  }
}
