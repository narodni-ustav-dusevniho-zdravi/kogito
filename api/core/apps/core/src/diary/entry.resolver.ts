import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DiaryEntryService } from '@app/diary/entry.service';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { DiaryList, DiaryRecord, EditDiaryEntryInput } from '../graphql.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/auth/auth.guard';
import { fromGlobalId, toGlobalId } from '@app/app/node';
import { DiaryEntry } from '@app/diary/entry.entity';

const transform = (entry: DiaryEntry): DiaryRecord => {
  return {
    id: toGlobalId(entry.id, 'Diary'),
    date: entry.createdAt,
    previewText: entry.content.substr(0, 200),
    content: entry.content,
  };
};

@Resolver()
export class DiaryEntryResolver {
  constructor(private readonly diaryEntryService: DiaryEntryService) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async diaryList(
    @CurrentUser() user,
    @Args('afterId') afterId: string | null,
  ): Promise<DiaryList> {
    return {
      havePrev: true,
      haveNext: false,
      records: (await this.diaryEntryService.filter(user)).map((item) =>
        transform(item),
      ),
    };
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async diaryEntry(
    @CurrentUser() user,
    @Args('id') id: string,
  ): Promise<DiaryRecord> {
    return transform(await this.diaryEntryService.findById(fromGlobalId(id)));
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async editDiaryEntry(
    @CurrentUser() user,
    @Args('input') { id, content }: EditDiaryEntryInput,
  ) {
    if (id) {
      const entry = await this.diaryEntryService.findById(fromGlobalId(id));

      if (entry) {
        return transform(
          await this.diaryEntryService.save({
            ...entry,
            content,
          }),
        );
      }
    }

    let entry = new DiaryEntry();
    entry.user = user;
    entry.content = content;

    entry = await this.diaryEntryService.save(entry);

    return transform(entry);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async removeDiaryEntry(@CurrentUser() user, @Args('id') id: string) {
    const entry = await this.diaryEntryService.findById(fromGlobalId(id));

    if (entry && entry.userId === user.id) {
      await this.diaryEntryService.remove(entry);
    }

    return true;
  }
}
