import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { EvaluateRegisterQuestionnaireService } from './evaluateRegisterQuestionnaire.service';
import { UserModule } from '@app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '@app/questionnaire/question.entity';
import { Questionnaire } from '@app/questionnaire/questionnaire.entity';
import { UserQuestionnaire } from '@app/questionnaire/userQuestionnaire.entity';
import { PlannerService } from '@app/questionnaire/planner.service';
import { NeogateModule } from '@app/neogate';

@Module({
  imports: [
    UserModule,
    NeogateModule,
    TypeOrmModule.forFeature([Question, Questionnaire, UserQuestionnaire]),
  ],
  providers: [
    QuestionnaireService,
    EvaluateRegisterQuestionnaireService,
    PlannerService,
  ],
  exports: [QuestionnaireService, EvaluateRegisterQuestionnaireService],
})
export class QuestionnaireModule {}
