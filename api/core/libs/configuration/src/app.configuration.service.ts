import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type NeogateSettings = {
  login: string;
  password: string;
  sender: string;
};

@Injectable()
export class AppConfigurationService {
  constructor(private configService: ConfigService) {}

  public isDev(): boolean {
    return this.configService.get<string>('app.environment') === 'dev';
  }

  public fakeSMSSending(): boolean {
    return this.configService.get<boolean>('app.fakeSMSSending');
  }

  public neogateSettings(): NeogateSettings {
    return {
      login: this.configService.get<string>('app.neogateLogin'),
      password: this.configService.get<string>('app.neogatePassword'),
      sender: this.configService.get<string>('app.neogateSender'),
    };
  }
}
