import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuestionnaire } from '@app/questionnaire/userQuestionnaire.entity';
import { Repository } from 'typeorm';
import { User, UserService } from '@app/user';
import { Questionnaire } from '@app/questionnaire/questionnaire.entity';
import { Question } from '@app/questionnaire/question.entity';
import { max } from 'rxjs/operators';

@Injectable()
export class EvaluateRegisterQuestionnaireService {
  constructor(
    @InjectRepository(UserQuestionnaire)
    private readonly userQuestionnaireRepository: Repository<UserQuestionnaire>,
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async evaluateUserQuestionnaire(userQuestionnaire: UserQuestionnaire) {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: {
        id: userQuestionnaire.questionnaireId,
      },
    });

    const questions = await this.questionRepository.find({
      where: {
        questionnaire,
      },
    });

    let points = 0;
    let label: string | null = null;

    for (const answer of userQuestionnaire.answers) {
      const question = questions.find(
        (question) => question.id === answer.questionId,
      );

      if (question && question.answers[answer.answerIndex]) {
        if (question.answers[answer.answerIndex].overrideLabel) {
          label = question.answers[answer.answerIndex].overrideLabel;
        }
        points += question.answers[answer.answerIndex].points;
      }
    }

    if (!label && questionnaire.scoreLabel) {
      let maxIndex = 0;
      for (const score of Object.keys(questionnaire.scoreLabel)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (points >= score) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          maxIndex = score;
        }
      }
      label = questionnaire.scoreLabel[maxIndex];
    }

    return {
      questionnaire,
      points,
      label,
    };
  }

  async evaluateUserRegister(user: User): Promise<void> {
    const userQuestionnaires = await this.userQuestionnaireRepository.find({
      where: { user },
    });

    let userLabel = 'Va';
    const priority = { Va: 0, Ve: 1, Vf: 2, Vb: 3, Vc: 4, Vd: 5 };
    const labels = [];

    for (const userQuestionnaire of userQuestionnaires) {
      const result = await this.evaluateUserQuestionnaire(userQuestionnaire);

      userQuestionnaire.points = result.points;
      userQuestionnaire.label = result.label;

      await this.userQuestionnaireRepository.save(userQuestionnaire);

      if (result.questionnaire.isDefaultAfterRegistration) {
        labels.push(result.label);

        if (priority[result.label] > priority[userLabel]) {
          userLabel = result.label;
        }
      }
    }

    user.registrationLabel = userLabel;

    await this.userService.save(user);
  }
}
