import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserService } from '@app/user';
import { QuestionnaireService } from '@app/questionnaire/questionnaire.service';
import { NeogateService } from '@app/neogate';
import { EvaluateRegisterQuestionnaireService } from '@app/questionnaire/evaluateRegisterQuestionnaire.service';

@Injectable()
export class PlannerService {
  private readonly logger = new Logger(PlannerService.name);

  constructor(
    private readonly userService: UserService,
    private readonly questionnaireService: QuestionnaireService,
    private readonly neogateService: NeogateService,
    private readonly evaluateService: EvaluateRegisterQuestionnaireService,
  ) {}

  async planAfterMonthQuestionnaire() {
    this.logger.log('planAfterMonthQuestionnaire starting');

    const users = await this.userService.findUsersAfterMonth('normal');

    for (const user of users) {
      this.logger.log(
        `Planning after month questionnaires for user id: ${user.id}`,
      );

      if (user.isAfterResearch()) {
        await this.questionnaireService.addAfterMonthSimpleQuestionnaire(user);
      } else {
        await this.questionnaireService.addAfterMonthQuestionnaire(user);
      }

      user.afterMonthPlanned = true;
      await this.userService.save(user);

      if (!user.isAfterResearch()) {
        await this.neogateService.sendSms(
          user.phoneNumber,
          `Dobry den, doufame ze se Vam aplikace Kogito libi. Chceme Vas poprosit o jeho aktualizaci a vyplneni dotazniku po mesici, abychom ho mohli rozvijet. Tym Kogito.`,
        );
      }
    }
  }

  async planControlGroupRegistration() {
    this.logger.log('planControlGroupRegistration starting');

    const users = await this.userService.findUsersAfterMonth('control');

    for (const user of users) {
      this.logger.log(
        `Planning after month questionnaires for user id: ${user.id}`,
      );
      await this.questionnaireService.addControlAfterMonthQuestionnaire(user);
      user.afterMonthPlanned = true;
      // user.finishedRegistration = true;
      await this.userService.save(user);

      await this.neogateService.sendSms(
        user.phoneNumber,
        `Dobry den, po aktualizaci aplikace Kogito ji uz muzete naplno vyuzivat! Doufame, že se Vam obsah bude libit. S pozdravem Tym Kogito.`,
      );
    }
  }

  @Cron('10 * * * *')
  async tenMinuteInterval(): Promise<void> {
    await this.planAfterMonthQuestionnaire();
    await this.planControlGroupRegistration();
  }

  @Cron('* * * * *')
  async evaluateQuestionnaires() {
    const userQuestionnaires = await this.questionnaireService.findForAfterMonthEvaluate();

    for (const userQuestionnaire of userQuestionnaires) {
      console.log({ userQuestionnaire });
      const result = await this.evaluateService.evaluateUserQuestionnaire(
        userQuestionnaire,
      );

      userQuestionnaire.points = result.points;
      userQuestionnaire.label = result.label;

      await this.questionnaireService.save(userQuestionnaire);
    }
  }
}
