import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  EditProfileInput,
  FinishRegistrationInput,
  FinishRegistrationResult,
  User,
} from '../graphql.schema';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { GqlAuthGuard } from '@app/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserService } from '@app/user';
import { EvaluateRegisterQuestionnaireService } from '@app/questionnaire/evaluateRegisterQuestionnaire.service';
import { Data } from '../content/data';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly evaluateRegisterQuestionnaire: EvaluateRegisterQuestionnaireService,
  ) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async registrationStatus(@CurrentUser() user) {
    if (null === user.registrationLabel) {
      await this.evaluateRegisterQuestionnaire.evaluateUserRegister(user);
    }

    return {
      isCompleted: user.registrationLabel !== null,
      userLabel: user.registrationLabel,
      group: user.group,
      journeysToChoose: ['Va', 'Vd'].includes(user.registrationLabel)
        ? Data.journeys.map((journey) => journey.id)
        : [],
    };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async finishRegistration(
    @CurrentUser() user,
    @Args('input') input: FinishRegistrationInput,
  ) {
    user.email = input.email;
    user.firstName = input.firstName;
    user.lastName = input.lastName;
    user.age = input.age;
    user.maritalStatus = input.maritalStatus;
    user.maritalStatusDescription = input.maritalStatusDescription;
    user.numberOfChildren = input.numberOfChildren;
    user.educationalAttainment = input.educationalAttainment;
    user.population = input.population;
    user.actualState = input.actualState;

    user.userInfoCompleted = true;

    await this.userService.save(user);

    return {
      success: true,
      viewer: {},
    };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async editProfile(
    @CurrentUser() user,
    @Args('input') input: EditProfileInput,
  ) {
    user.firstName = input.firstName;
    user.lastName = input.lastName;

    await this.userService.save(user);

    return {
      success: true,
      viewer: {},
    };
  }
}
