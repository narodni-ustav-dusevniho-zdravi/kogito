import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, In, Repository } from 'typeorm';
import { Questionnaire, QuestionnaireId } from './questionnaire.entity';
import {
  QUESTIONNAIRE_OCCASION,
  UserQuestionnaire,
  UserQuestionnaireId,
} from './userQuestionnaire.entity';
import { User, UserId } from '@app/user/user.entity';
import { Answer } from '@app/questionnaire/dto/answer';
import { Question, QuestionId } from '@app/questionnaire/question.entity';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
    @InjectRepository(UserQuestionnaire)
    private readonly userQuestionnaireRepository: Repository<UserQuestionnaire>,
  ) {}

  async findById(id: UserQuestionnaireId): Promise<UserQuestionnaire> {
    return await this.userQuestionnaireRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findQuestionnaireById(id: QuestionnaireId): Promise<Questionnaire> {
    return await this.questionnaireRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findQuestionById(id: QuestionId): Promise<Question> {
    return this.questionRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findForUser(userId: UserId): Promise<UserQuestionnaire[]> {
    return await this.userQuestionnaireRepository.find({
      where: { userId },
    });
  }

  async findForUserQuestionnaireByOccasion(
    userId: UserId,
    occasion: number,
  ): Promise<UserQuestionnaire[]> {
    return await this.userQuestionnaireRepository.find({
      relations: ['questionnaire'],
      where: {
        userId,
        occasion,
      },
    });
  }

  async findUserUncompleted(userId: UserId): Promise<UserQuestionnaire[]> {
    return await this.userQuestionnaireRepository.find({
      where: { userId, completedAt: IsNull() },
    });
  }

  async filter(): Promise<Questionnaire[]> {
    return await this.questionnaireRepository.find({
      where: {},
    });
  }

  async filterQuestionnaires(): Promise<Questionnaire[]> {
    return await this.questionnaireRepository.find({
      where: {},
    });
  }

  async findForAfterMonthEvaluate(): Promise<UserQuestionnaire[]> {
    return await this.userQuestionnaireRepository.find({
      where: {
        completedAt: Not(IsNull()),
        label: IsNull(),
        questionnaireId: In([8, 9, 12, 13]),
      },
      take: 10,
    });
  }

  async save(userQuestionnaire: UserQuestionnaire): Promise<void> {
    await this.userQuestionnaireRepository.save(userQuestionnaire);
  }

  async solveQuestionnaireStatus(
    userQuestionnaire: UserQuestionnaire,
  ): Promise<void> {
    const answeredIds = userQuestionnaire.answers.map(
      (answer) => answer.questionId,
    );

    const questionnaire = await this.findQuestionnaireById(
      userQuestionnaire.questionnaireId,
    );

    const allQuestionIds = questionnaire.questions.map(
      (question) => question.id,
    );

    const isFinished =
      allQuestionIds.filter((id) => !answeredIds.includes(id)).length === 0;

    if (isFinished) {
      userQuestionnaire.completedAt = new Date();
    }
  }

  async addRegistrationQuestionnaire(user: User): Promise<void> {
    const questionnaires = await this.questionnaireRepository.find({
      isDefaultAfterRegistration: true,
    });

    for (const questionnaire of questionnaires) {
      const userQuestionnaire = new UserQuestionnaire();
      userQuestionnaire.user = user;
      userQuestionnaire.questionnaire = questionnaire;
      userQuestionnaire.occasion = QUESTIONNAIRE_OCCASION.Registration;

      await this.userQuestionnaireRepository.save(userQuestionnaire);
    }
  }

  async addAfterMonthQuestionnaire(user: User): Promise<void> {
    const questionnaires = await this.questionnaireRepository.find({
      isDefaultAfterMonthUsing: true,
    });

    for (const questionnaire of questionnaires) {
      const userQuestionnaire = new UserQuestionnaire();
      userQuestionnaire.user = user;
      userQuestionnaire.questionnaire = questionnaire;
      userQuestionnaire.occasion =
        QUESTIONNAIRE_OCCASION.NormalAfterMonthRegistration;

      await this.userQuestionnaireRepository.save(userQuestionnaire);
    }
  }

  async addControlAfterMonthQuestionnaire(user: User): Promise<void> {
    const questionnaires = await this.questionnaireRepository.find({
      isDefaultForControlGroupAfterMonth: true,
    });

    for (const questionnaire of questionnaires) {
      const userQuestionnaire = new UserQuestionnaire();
      userQuestionnaire.user = user;
      userQuestionnaire.questionnaire = questionnaire;
      userQuestionnaire.occasion =
        QUESTIONNAIRE_OCCASION.ControlAfterMonthRegistration;

      await this.userQuestionnaireRepository.save(userQuestionnaire);
    }
  }

  async addAfterMonthSimpleQuestionnaire(user: User): Promise<void> {
    const questionnaires = await this.questionnaireRepository.find({
      isDefaultAfterMonthSimpler: true,
    });

    for (const questionnaire of questionnaires) {
      const userQuestionnaire = new UserQuestionnaire();
      userQuestionnaire.user = user;
      userQuestionnaire.questionnaire = questionnaire;
      userQuestionnaire.occasion =
        QUESTIONNAIRE_OCCASION.SimplerAfterMonthRegistration;

      await this.userQuestionnaireRepository.save(userQuestionnaire);
    }
  }
}
