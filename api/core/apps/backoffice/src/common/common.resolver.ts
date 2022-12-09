import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '@app/auth/auth.guard';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { UserService } from '@app/user';
import { EvaluateRegisterQuestionnaireService } from '@app/questionnaire/evaluateRegisterQuestionnaire.service';

@Resolver()
export class CommonResolver {


  @UseGuards(GqlAdminAuthGuard)
  @Query('serverTime')
  serverTime(): Date {
    return new Date();
  }


}
