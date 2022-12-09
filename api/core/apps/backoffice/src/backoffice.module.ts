import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from '@app/configuration/configuration.module';
import { AppConfigurationService } from '@app/configuration/app.configuration.service';
import { DatabaseConfigurationService } from '@app/configuration/database.configuration.service';
import { CommonResolver } from './common/common.resolver';
import { UserModule } from '@app/user';
import { QuestionnaireModule } from '@app/questionnaire';
import { AuthModule } from '@app/auth';
import { UserResolver } from './user/user.resolver';
import { AuthResolver } from './auth/auth.resolver';
import { QuestionnaireResolver } from './questionnaire/questionnaire.resolver';
import { QuestionResolver } from './questionnaire/question.resolver';
import { join } from 'path';
import { ContentModule } from '@app/content/content.module';
import { ExportController } from './export/export.controller';

@Module({
  imports: [
    ConfigurationModule,
    UserModule,
    ContentModule,
    QuestionnaireModule,
    AuthModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (config: AppConfigurationService) => {
        return {
          debug: config.isDev(),
          playground: config.isDev(),
          typePaths: [join(process.cwd(), 'apps/backoffice/src/*/*.graphql')],
          definitions: {
            path: join(process.cwd(), 'apps/backoffice/src/graphql.schema.ts'),
          },
          formatError: (error: GraphQLError) => {
            const graphQLFormattedError: GraphQLFormattedError = {
              message:
                error?.extensions?.exception?.response?.message ||
                error?.message,
            };
            return graphQLFormattedError;
          },
        };
      },
      inject: [AppConfigurationService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (config: DatabaseConfigurationService) =>
        config.generateTypeORMConfiguration(),
      inject: [DatabaseConfigurationService],
    }),
  ],
  controllers: [ExportController],
  providers: [
    CommonResolver,
    AuthResolver,
    UserResolver,
    QuestionResolver,
    QuestionnaireResolver,
  ],
})
export class BackofficeModule {}
