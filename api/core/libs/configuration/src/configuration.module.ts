import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AppConfiguration,
  DatabaseConfiguration,
} from '@app/configuration/configuration.mapper';
import { AppConfigurationService } from '@app/configuration/app.configuration.service';
import { AuthConfigurationService } from '@app/configuration/auth.configuration.service';
import { DatabaseConfigurationService } from '@app/configuration/database.configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfiguration, DatabaseConfiguration],
    }),
  ],
  providers: [
    AppConfigurationService,
    AuthConfigurationService,
    DatabaseConfigurationService,
  ],
  exports: [
    AppConfigurationService,
    AuthConfigurationService,
    DatabaseConfigurationService,
  ],
})
export class ConfigurationModule {}
