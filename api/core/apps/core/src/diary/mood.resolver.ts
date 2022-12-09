import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../../../libs/auth/src/loggedUser.decorator';
import { LogMoodInput, Mood, MoodList } from '../graphql.schema';
import { MoodLogService } from '@app/diary/moodLog.service';
import { MOOD } from '@app/diary/mood.types';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/auth/auth.guard';
import { fromGlobalId, toGlobalId } from '@app/app/node';

export const transformApiMood = (mood: Mood): MOOD => {
  switch (mood) {
    case Mood.SATISFIED:
      return MOOD.SATISFIED;
    case Mood.HAPPY:
      return MOOD.HAPPY;
    case Mood.OKAY:
      return MOOD.OKAY;
    case Mood.SAD:
      return MOOD.SAD;
    case Mood.VERYSAD:
      return MOOD.VERYSAD;
  }
};

export const transformForApi = (mood: MOOD) => {
  switch (mood) {
    case MOOD.SATISFIED:
      return Mood.SATISFIED;
    case MOOD.HAPPY:
      return Mood.HAPPY;
    case MOOD.OKAY:
      return Mood.OKAY;
    case MOOD.SAD:
      return Mood.SAD;
    case MOOD.VERYSAD:
      return Mood.VERYSAD;
  }
};

@Resolver()
export class DiaryMoodResolver {
  constructor(private readonly moodLogService: MoodLogService) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async moodsList(
    @CurrentUser() user,
    @Args('afterId') afterId: string | null,
  ): Promise<MoodList> {
    return {
      havePrev: true,
      haveNext: false,
      records: (await this.moodLogService.filter(user)).map((item) => ({
        id: toGlobalId(item.id, 'Mood'),
        date: item.createdAt,
        mood: transformForApi(item.mood),
      })),
      moodsCount: (await this.moodLogService.userStatistics(user)).map(
        (item) => {
          return {
            mood: transformForApi(item.mood),
            count: item.count,
          };
        },
      ),
    };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async logMood(@CurrentUser() user, @Args('input') { mood }: LogMoodInput) {
    const last = await this.moodLogService.findLast(user);

    await this.moodLogService.insertLog(user, transformApiMood(mood));

    return {
      last: last ? transformForApi(last.mood) : null,
    };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async removeMoodRecord(@CurrentUser() user, @Args('id') id: string) {
    const record = await this.moodLogService.findById(fromGlobalId(id));

    if (record && record.userId === user.id) {
      await this.moodLogService.remove(record);
    }

    return true;
  }
}
