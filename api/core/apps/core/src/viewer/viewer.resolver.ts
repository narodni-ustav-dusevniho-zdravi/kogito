import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/auth/auth.guard';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { DiaryTodoService } from '@app/diary/todo.service';
import transformTodo from '../diary/todo.transformer';
import { QuestionnaireService } from '@app/questionnaire';

@Resolver('Viewer')
export class ViewerResolver {
  constructor(
    private readonly todoService: DiaryTodoService,
    private readonly questionnaireService: QuestionnaireService,
  ) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  viewer() {
    return {};
  }

  @ResolveField('id')
  async id() {
    return 'Viewer';
  }

  @ResolveField('me')
  async me(@CurrentUser() user) {
    return user;
  }

  @ResolveField('haveActiveQuestionnaire')
  async haveActiveQuestionnaire(@CurrentUser() user) {
    if ('normal' === user.group && !user.finishedRegistration) {
      return false;
    }
    if ('control' === user.group && !user.finishedRegistration) {
      return true;
    }

    const questionnaires = await this.questionnaireService.findUserUncompleted(
      user.id,
    );

    return questionnaires.length > 0;
  }

  @ResolveField('todayTodos')
  @UseGuards(GqlAuthGuard)
  async todayTodos(@CurrentUser() user) {
    return (await this.todoService.findForToday(user)).map((todo) =>
      transformTodo(todo),
    );
  }
}
