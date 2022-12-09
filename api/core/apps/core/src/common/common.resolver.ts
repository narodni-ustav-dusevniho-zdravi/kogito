import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '@app/auth/auth.guard';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { EvaluateRegisterQuestionnaireService } from '@app/questionnaire/evaluateRegisterQuestionnaire.service';

@Resolver()
export class CommonResolver {
  constructor(
    private readonly evaluateRegisterQuestionnaire: EvaluateRegisterQuestionnaireService,
  ) {}

  @Query(() => Date)
  serverTime(): Date {
    return new Date();
  }

  @UseGuards(GqlAdminAuthGuard)
  @Query('test')
  async test(@CurrentUser() user): Promise<string> {
    await this.evaluateRegisterQuestionnaire.evaluateUserRegister(user);

    return '';
  }
}
