import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonResolver } from './common/common.resolver';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AppConfigurationService } from '@app/configuration/app.configuration.service';
import { ConfigurationModule } from '@app/configuration/configuration.module';
import { DatabaseConfigurationService } from '@app/configuration/database.configuration.service';
import { join } from 'path';
import { AuthResolver } from './auth/auth.resolver';
import { QuestionnaireResolver } from './questionnaire/questionnaire.resolver';
import { UserResolver } from './user/user.resolver';
import { AuthModule } from '@app/auth/auth.module';
import { QuestionnaireModule } from '@app/questionnaire/questionnaire.module';
import { UserModule } from '@app/user/user.module';
import { UserQuestionnaireResolver } from './questionnaire/userQuestionnaire.resolver';
import { QuestionResolver } from './questionnaire/question.resolver';
import { NeogateModule } from '../../../libs/neogate/src/neogate.module';
import { ContentModule } from '@app/content/content.module';
import { ViewerResolver } from './viewer/viewer.resolver';
import { ContentResolver } from './content/content.resolver';
import { ContentSolverService } from './content/content.service';
import { DiaryModule } from '@app/diary/diary.module';
import { DiaryMoodResolver } from './diary/mood.resolver';
import { DiaryEntryResolver } from './diary/entry.resolver';
import { ViciousCircleResolver } from './diary/viciousCircle.resolver';
import { TodoResolver } from './diary/todo.resolver';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigurationModule,
    NeogateModule,
    AuthModule,
    UserModule,
    QuestionnaireModule,
    ContentModule,
    DiaryModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (config: AppConfigurationService) => {
        return {
          debug: config.isDev(),
          playground: config.isDev(),
          typePaths: [join(process.cwd(), 'apps/core/src/*/*.graphql')],
          definitions: {
            path: join(process.cwd(), 'apps/core/src/graphql.schema.ts'),
          },
          formatError: (error: GraphQLError) => {
            console.log({ error });
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
  providers: [
    CommonResolver,
    AuthResolver,
    QuestionnaireResolver,
    QuestionResolver,
    UserQuestionnaireResolver,
    UserResolver,
    ContentSolverService,
    ContentResolver,
    DiaryMoodResolver,
    DiaryEntryResolver,
    TodoResolver,
    ViciousCircleResolver,
    ViewerResolver,
  ],
})
export class AppModule {}
