import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { UserService, User } from '@app/user';
import { NodeResolver } from '@app/app/node.resolver';
import { fromGlobalId, toGlobalId } from '@app/app/node';
import { QuestionnaireService } from '@app/questionnaire/questionnaire.service';
import { UseGuards } from '@nestjs/common';
import { GqlAdminAuthGuard } from '@app/auth/auth.guard';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { ContentService } from '@app/content/content.service';

@Resolver('User')
export class UserResolver extends NodeResolver {
  constructor(
    private readonly userService: UserService,
    private readonly questionnaireService: QuestionnaireService,
    private readonly contentService: ContentService,
  ) {
    super();
  }

  @UseGuards(GqlAdminAuthGuard)
  @Query('User')
  async User(@Args('id') id: string) {
    return this.userService.findOneById(fromGlobalId(id));
  }

  @UseGuards(GqlAdminAuthGuard)
  @ResolveField('userQuestionnaire')
  async resolveUserQuestionnaire(@Root() user: User) {
    const userQuestionnaire = await this.questionnaireService.findForUser(
      user.id,
    );

    return userQuestionnaire.map(async (userQuestionnaire) => {
      const questionnaire = await this.questionnaireService.findQuestionnaireById(
        userQuestionnaire.questionnaireId,
      );

      return {
        id: userQuestionnaire.globalId,
        completedAt: userQuestionnaire.completedAt,
        name: questionnaire.name,
        items: questionnaire.questions.map((question) => {
          const answer = userQuestionnaire.answers.find(
            (answer) => answer.questionId === question.id,
          );

          return {
            question: question.question,
            answer:
              answer && question.answers[answer.answerIndex]
                ? question.answers[answer.answerIndex].answer
                : '-',
          };
        }),
      };
    });
  }

  @UseGuards(GqlAdminAuthGuard)
  @ResolveField('actualJourney')
  async userProgress(@Root() user: User) {
    const userProgress = await this.contentService.findUserActiveProgress(user);

    return userProgress
      ? { Sm91cm5leTox: 'Cesta deprese', Sm91cm5leToy: 'Cesta úzkosti' }[
          userProgress.journey
        ]
      : '';
  }

  @UseGuards(GqlAdminAuthGuard)
  @Query()
  async allUsers() {
    return this.userService.findAllSuccessfulLogged();
  }

  @UseGuards(GqlAdminAuthGuard)
  @Query()
  async _allUsersMeta() {
    return {
      count: (await this.userService.findAllSuccessfulLogged()).length,
    };
  }

  @UseGuards(GqlAdminAuthGuard)
  @Query()
  async me(@CurrentUser() user) {
    return user;
  }

  @UseGuards(GqlAdminAuthGuard)
  @Mutation()
  async createUser(@Args('phoneNumber') phoneNumber: string) {
    const user = new User();

    user.phoneNumber = phoneNumber;
    user.group = 'normal';
    user.invitedUser = true;
    user.successfulLogin = true;

    await user.save();

    await this.questionnaireService.addRegistrationQuestionnaire(user);

    return user;
  }

  @UseGuards(GqlAdminAuthGuard)
  // @Mutation()
  async updateUser(
    @Args('id') id: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('phoneNumber') phoneNumber: string,
  ) {
    const user = await this.userService.findOneById(fromGlobalId(id));

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;

    // await user.save();

    return user;
  }

  @UseGuards(GqlAdminAuthGuard)
  async removeUser(
      @Args('id') id: string
  ) {

  }
}
