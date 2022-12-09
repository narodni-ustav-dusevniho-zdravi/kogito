import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaryTodo, DiaryTodoId } from '@app/diary/todo.entity';
import { IsNull, Repository } from 'typeorm';
import { User } from '@app/user';

@Injectable()
export class DiaryTodoService {
  constructor(
    @InjectRepository(DiaryTodo)
    private readonly todoRepository: Repository<DiaryTodo>,
  ) {}

  async findForToday(user: User): Promise<DiaryTodo[]> {
    const date = new Date();
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    return this.todoRepository
      .createQueryBuilder('t')
      .where({ user })
      .andWhere('deleted is null')
      .andWhere(
        '(completed is null OR completed between :dayStart and :dayEnd)',
      )
      .setParameters({
        dayStart: `${today} 00:00:00`,
        dayEnd: `${today} 23:59:59`,
      })
      .orderBy('createdAt', 'ASC')
      .getMany();
  }

  async findById(id: DiaryTodoId): Promise<DiaryTodo> {
    return this.todoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async save(entry: Partial<DiaryTodo>): Promise<DiaryTodo> {
    return this.todoRepository.save(entry, { reload: true });
  }

  async remove(entry: DiaryTodo): Promise<void> {
    await this.todoRepository.remove(entry);
  }
}
