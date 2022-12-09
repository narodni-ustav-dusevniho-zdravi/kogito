import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '@app/auth';
import { LoginInput } from '../graphql.schema';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async login(@Args('input') { username, password }: LoginInput) {
    const user = await this.authService.validateAdminUser(username, password);

    if (user.isAdmin) {
      return {
        accessToken: await this.authService.generateAccessToken(user),
      };
    }

    throw new Error('This user does not have admin rights');
  }
}
