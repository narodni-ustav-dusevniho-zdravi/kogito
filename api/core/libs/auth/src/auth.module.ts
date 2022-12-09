import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '@app/auth/accessToken.strategy';
import { UserModule } from '@app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsCode } from '@app/auth/smsCode.entity';
import { NeogateModule } from '@app/neogate/neogate.module';
import { ConfigurationModule } from '@app/configuration';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forFeature([SmsCode]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secret', // TODO add jwt secret
      signOptions: {
        expiresIn: '1 min', //'1 day',
      },
    }),
    NeogateModule,
    UserModule,
  ],
  providers: [AuthService, AuthService, AccessTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
