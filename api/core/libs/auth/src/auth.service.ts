import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user.entity';
import { SmsCode } from '@app/auth/smsCode.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NeogateService } from '@app/neogate';
import * as moment from 'moment';
import { AppConfigurationService } from '@app/configuration/app.configuration.service';

export type AccessTokenPayload = {
  id: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(SmsCode)
    private readonly smsCodeRepository: Repository<SmsCode>,
    private readonly neogateService: NeogateService,
    private readonly appConfigurationService: AppConfigurationService,
  ) {}

  async sendAuthSMSCode(user: User, ipAddress: string): Promise<void> {
    const smsCode = new SmsCode();
    smsCode.user = user;
    smsCode.ipAddress = ipAddress;

    if (this.appConfigurationService.fakeSMSSending()) {
      smsCode.code = '111111';
    }

    await this.smsCodeRepository.save(smsCode);

    await this.neogateService.sendSms(
      user.phoneNumber,
      `Váš přihlašovací kód do aplikace Kogito je ${smsCode.code}`,
    );
  }

  async validateUser(phoneNumber: string, password: string): Promise<User> {
    const user = await this.userService.findOneByPhoneNumber(phoneNumber);

    if (user.password) {
      const passwordCompare = await compare(password, user.password);
      if (!passwordCompare) {
        throw new Error('Invalid phone number or password.');
      }
    } else {
      const smsCode = await this.smsCodeRepository.findOne({
        where: {
          user,
          code: password,
          used: IsNull(),
        },
      });

      if (!smsCode) {
        throw new Error('Invalid code.');
      }

      smsCode.used = new Date();

      await this.smsCodeRepository.save(smsCode);
    }

    if (!user.enabled) {
      throw new Error('User is not enabled.');
    }

    user.successfulLogin = true;
    await this.userService.save(user);

    return user;
  }

  async validateAdminUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(username);

    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      throw new Error('Invalid phone number or password.');
    }

    if (!user.isAdmin) {
      throw new Error('User is not admin.');
    }

    if (!user.enabled) {
      throw new Error('User is not enabled.');
    }

    return user;
  }

  async generateAccessToken(user: User): Promise<string> {
    return this.jwtService.signAsync({
      id: user.id,
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {
        id: user.id,
      },
      {
        expiresIn: '30d',
      },
    );
  }

  async parseAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    return this.jwtService.decode(accessToken) as AccessTokenPayload;
  }

  async generateNewTokens(user: User) {
    const refreshToken = await this.generateRefreshToken(user);

    user.lastLogin = new Date();
    user.currentRefreshToken = await hash(refreshToken, 10);

    await this.userService.save(user);

    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken,
    };
  }

  async validateAccessToken(payload: AccessTokenPayload): Promise<User> {
    const user = await this.userService.findOneById(payload.id);

    // todo check user by payload

    return user;
  }
}
