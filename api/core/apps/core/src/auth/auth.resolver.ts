import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '@app/auth';
import {
  InitLoginInput,
  InitLoginResult,
  LoginInput,
  RefreshTokensInput,
} from '../graphql.schema';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user.entity';
import { ContentService } from '@app/content/content.service';
import { QuestionnaireService } from '@app/questionnaire/questionnaire.service';
import { Ip } from '@nestjs/common';
import { UserIp } from '@app/auth/ipAddress.decorator';
import { compare, hash } from 'bcrypt';
import { GraphQLError } from 'graphql';

const PHONE_NUMBER_REGEX = /([+]?\d{1,3}[. \s]?)?(\d{9}?)/g;

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly contentService: ContentService,
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  @Mutation()
  async initLogin(
    @Args('input') { phoneNumber, platform }: InitLoginInput,
    @UserIp() clientIpAddress: string,
  ): Promise<InitLoginResult> {
    phoneNumber = phoneNumber.replace(' ', '');

    if (!phoneNumber.match(PHONE_NUMBER_REGEX)) {
      throw new Error('Invalid phone number');
    }

    let user = await this.userService.findOneByPhoneNumber(phoneNumber);

    if (!user) {
      user = new User();
      user.phoneNumber = phoneNumber;
      user.group = 'normal'; // await this.userService.randomizeRegisterGroup();

      await user.save();

      await this.questionnaireService.addRegistrationQuestionnaire(user);
    }

    if (!user.enabled) {
      throw new Error('User is disabled');
    }

    if (user.password) {
      return {
        usePassword: true,
        useSmsCode: false,
      };
    }

    await this.authService.sendAuthSMSCode(user, clientIpAddress);

    return {
      useSmsCode: true,
      usePassword: false,
    };
  }

  @Mutation()
  async login(@Args('input') { phoneNumber, password }: LoginInput) {
    phoneNumber = phoneNumber.replace(' ', '');

    const user = await this.authService.validateUser(phoneNumber, password);

    return this.authService.generateNewTokens(user);
  }

  @Mutation()
  async refreshAccessToken(
    @Args('input') { accessToken, refreshToken }: RefreshTokensInput,
  ) {
    const parsedAccessToken = await this.authService.parseAccessToken(
      accessToken,
    );

    const user = await this.userService.findOneById(parsedAccessToken.id);

    if (await compare(refreshToken, user.currentRefreshToken)) {
      return this.authService.generateNewTokens(user);
    }

    throw new GraphQLError('Bad token');
  }
}
