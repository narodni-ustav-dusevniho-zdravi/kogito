import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DiaryViciousCircleService } from '@app/diary/viciousCircle.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/auth/auth.guard';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { EditViciousCircleInput, ViciousCircle } from '../graphql.schema';
import { DiaryViciousCircle } from '@app/diary/viciousCircle.entity';
import { fromGlobalId, toGlobalId } from '@app/app/node';

const transform = (entry: DiaryViciousCircle): ViciousCircle => {
  return {
    ...entry,
    id: toGlobalId(entry.id, 'ViciousCircle'),
    date: entry.updatedAt,
  };
};

@Resolver()
export class ViciousCircleResolver {
  constructor(
    private readonly viciousCircleService: DiaryViciousCircleService,
  ) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async viciousCircleList(
    @CurrentUser() user,
    @Args('afterId') afterId: string | null,
  ) {
    return {
      havePrev: true,
      haveNext: false,
      records: (await this.viciousCircleService.filter(user)).map((item) =>
        transform(item),
      ),
    };
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async viciousCircle(@CurrentUser() user, @Args('id') id: string) {
    const entry = await this.viciousCircleService.findById(fromGlobalId(id));

    return transform(entry);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async currentViciousCircle(@CurrentUser() user) {
    const entries = await this.viciousCircleService.filter(user, 1);

    if (entries.length) {
      return transform(entries[0]);
    }

    const entry = new DiaryViciousCircle();
    entry.user = user;

    return transform(await this.viciousCircleService.save(entry));
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async editViciousCircle(
    @CurrentUser() user,
    @Args('input')
    {
      id,
      name,
      trigger,
      negativeThoughts,
      emotions,
      physicalSymptoms,
      behaviour,
    }: EditViciousCircleInput,
  ) {
    let entry = null;

    if (id) {
      entry = await this.viciousCircleService.findById(fromGlobalId(id));
    }

    if (!entry) {
      entry = new DiaryViciousCircle();
      entry.user = user;
    }

    entry.name = name;

    entry.trigger = trigger;
    entry.negativeThoughts = negativeThoughts;
    entry.emotions = emotions;
    entry.physicalSymptoms = physicalSymptoms;
    entry.behaviour = behaviour;

    return transform(await this.viciousCircleService.save(entry));
  }
}
