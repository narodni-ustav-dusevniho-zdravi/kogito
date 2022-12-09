import { DiaryTodoService } from '@app/diary/todo.service';
import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/auth/auth.guard';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { DiaryTodo } from '@app/diary/todo.entity';
import { Todo, TodoInput, TrackTodoInput } from '../graphql.schema';
import { fromGlobalId, toGlobalId } from '@app/app/node';
import transformTodo from './todo.transformer';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: DiaryTodoService) {}

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async editTodo(
    @CurrentUser() user,
    @Args('input') { id, title, dayPart }: TodoInput,
  ) {
    let entry = null;

    if (id) {
      entry = await this.todoService.findById(fromGlobalId(id));
    }

    if (!entry) {
      entry = new DiaryTodo();
      entry.user = user;
    }

    entry.title = title;
    entry.dayPart = dayPart;

    await this.todoService.save(entry);

    return {};
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async removeTodo(@CurrentUser() user, @Args('id') id: string) {
    const entry = await this.todoService.findById(fromGlobalId(id));

    if (entry && entry.userId === user.id) {
      console.log('removing');
      await this.todoService.remove(entry);
    }

    return {};
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async trackTodo(
    @CurrentUser() user,
    @Args('input') { id, checked }: TrackTodoInput,
  ) {
    const entry = await this.todoService.findById(fromGlobalId(id));

    if (checked) {
      entry.completed = new Date();
    } else {
      entry.completed = null;
    }

    await this.todoService.save(entry);

    return {};
  }
}
