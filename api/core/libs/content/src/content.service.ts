import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProgress } from '@app/content/entity/userProgress.entity';
import { User } from '@app/user/user.entity';
import { ContentStory, ContentStoryId } from '@app/content/entity/story.entity';
import { Content } from '../../../apps/core/src/graphql.schema';
import { UserSchedule } from '@app/content/entity/userSchedule.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(UserProgress)
    private readonly userProgressRepository: Repository<UserProgress>,
    @InjectRepository(UserSchedule)
    private readonly userScheduleRepository: Repository<UserSchedule>,
    @InjectRepository(ContentStory)
    private readonly storyRepository: Repository<ContentStory>,
  ) {}

  async save(userProgress: UserProgress): Promise<UserProgress> {
    return await this.userProgressRepository.save(userProgress);
  }

  async saveUserSchedule(userProgress: UserSchedule): Promise<UserSchedule> {
    return await this.userScheduleRepository.save(userProgress);
  }

  async findUserActiveProgress(user: User): Promise<UserProgress | undefined> {
    return this.userProgressRepository.findOne({
      where: {
        user,
        active: true,
      },
    });
  }

  async findUserProgresses(user: User): Promise<UserProgress[]> {
    return this.userProgressRepository.find({
      where: {
        user,
      },
    });
  }

  async findUserProgress(user: User, journey: string): Promise<UserProgress> {
    return this.userProgressRepository.findOne({
      where: {
        user,
        journey,
        active: true,
      },
    });
  }

  async findActiveStories(): Promise<ContentStory[]> {
    return this.storyRepository.find({
      where: {
        enabled: true,
      },
      order: {
        published: 'DESC',
      },
    });
  }

  async findStoryById(id: ContentStoryId): Promise<ContentStory> {
    return this.storyRepository.findOneOrFail({
      id,
    });
  }

  async findTodayUserSchedule(user: User): Promise<UserSchedule> {
    const date = new Date();
    return this.userScheduleRepository.findOne({
      where: {
        user,
        forDay: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`,
      },
    });
  }
}
