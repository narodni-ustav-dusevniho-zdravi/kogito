import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@app/auth/auth.guard';
import { CurrentUser } from '@app/auth/loggedUser.decorator';
import { ContentService } from '@app/content/content.service';
import { ContentSolverService } from './content.service';
import { TrackProgressInput, TrackScheduleInput } from '../graphql.schema';
import { fromGlobalId, toGlobalId } from '@app/app/node';
import { Data } from './data';
import { UserSchedule } from '@app/content/entity/userSchedule.entity';
import { MoodLogService } from '@app/diary/moodLog.service';
import { transformForApi } from '../diary/mood.resolver';
import { UserProgress } from '@app/content/entity';
import { UserService } from '@app/user';

@Resolver('Content')
export class ContentResolver {
  constructor(
    private readonly contentService: ContentService,
    private readonly contentSolverService: ContentSolverService,
    private readonly moodLogService: MoodLogService,
    private readonly userService: UserService,
  ) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  content(@CurrentUser() user) {
    return {};
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async audioDetail(@Args('id') id: string, @CurrentUser() user) {
    return this.contentSolverService.findItemById(id);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async itemDetail(@Args('id') id: string, @CurrentUser() user) {
    return this.contentSolverService.findItemById(id);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async storyDetail(@Args('id') id: string) {
    const story = await this.contentService.findStoryById(
      fromGlobalId(id, 'Story'),
    );

    return {
      ...story,
      id: toGlobalId(story.id, 'Story'),
    };
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async journey(@Args('id') id: string, @CurrentUser() user) {
    return this.contentSolverService.solveJourney(user, id);
  }

  @ResolveField('userJourney')
  async userJourney(@CurrentUser() user) {
    return this.contentSolverService.solveCurrentJourney(user);
  }

  @ResolveField('bonusRelaxation')
  async bonusRelaxation() {
    return Data.bonusRelaxation.map((item) => {
      return {
        ...item,
        progress: 0,
        locked: false,
      };
    });
  }

  @ResolveField('currentRelaxation')
  async currentRelaxation(@CurrentUser() user) {
    const userJourney = await this.contentSolverService.solveCurrentJourney(
      user,
    );

    if (userJourney) {
      const currentLevel = userJourney.levels.find((level) => level.current);

      if (currentLevel) {
        return currentLevel.relaxation.reverse();
      }
    }

    return this.bonusRelaxation();
  }

  @ResolveField('stories')
  async stories() {
    return (await this.contentService.findActiveStories()).map((story) => ({
      ...story,
      id: toGlobalId(story.id, 'Story'),
    }));
  }

  @ResolveField('todaySchedule')
  async todaySchedule(@CurrentUser() user) {
    const userSchedule = await this.contentService.findTodayUserSchedule(user);
    const currentJourney = await this.contentSolverService.solveCurrentJourney(
      user,
    );

    const currentLevel = currentJourney.levels.find((level) => level.current);

    if (currentLevel) {
      const solvedTodos = currentLevel.tasks
        // .filter((todo) => todo.level === currentLevel.level)
        .map((todo) => {
          let completed = false;

          if (userSchedule) {
            const progress = userSchedule.progress.find(
              (item) => item.todoId === todo.id,
            );

            if (progress) {
              completed = progress.checked;
            }
          }

          return {
            ...todo,
            completed: completed,
          };
        });

      return {
        morning: solvedTodos,
        afternoon: [], //solvedTodos.filter((item) => item.time === 'afternoon'),
        evening: [], //solvedTodos.filter((item) => item.time === 'evening'),
      };
    }

    return {
      morning: [],
      afternoon: [], //solvedTodos.filter((item) => item.time === 'afternoon'),
      evening: [], //solvedTodos.filter((item) => item.time === 'evening'),
    };
  }

  @ResolveField('journeyRelaxation')
  async journeyRelaxation(@CurrentUser() user) {
    const journeyIds = Data.journeys.map((journey) => journey.id);

    const currentJourney = await this.contentSolverService.solveCurrentJourney(
      user,
    );

    const currentLevel = currentJourney.levels.find((level) => level.current);

    const journeys = await Promise.all(
      journeyIds.map((id) => this.contentSolverService.solveJourney(user, id)),
    );

    return journeys
      .map((journey) => {
        return {
          id: journey.id,
          name: journey.name,
          unlocked: journey.unlocked,
          relaxation: currentLevel.relaxation,
          // relaxation: [...journey.levels.map((level) => level.relaxation)]
          //   .flat()
          //   .map((level) => ({ ...level, locked: false })),
        };
      })
      .sort(function (x, y) {
        return x.unlocked === y.unlocked ? 0 : x ? -1 : 1;
      });
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async trackProgress(
    @Args('input') { id, progress }: TrackProgressInput,
    @CurrentUser() user,
  ) {
    const userProgress = await this.contentService.findUserActiveProgress(user);

    if (userProgress) {
      if (!userProgress.itemsProgress) {
        userProgress.itemsProgress = [];
      }

      let found = false;

      userProgress.itemsProgress = userProgress.itemsProgress.map((item) => {
        if (item.itemId === id && item.progress < progress) {
          found = true;
          return {
            ...item,
            progress: progress,
            lastUpdate: new Date(),
          };
        } else {
          return item;
        }
      });

      if (!found) {
        userProgress.itemsProgress.push({
          itemId: id,
          progress: progress,
          lastUpdate: new Date(),
        });
      }

      await this.contentService.save(userProgress);

      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async trackSchedule(
    @Args('input') { id, checked }: TrackScheduleInput,
    @CurrentUser() user,
  ) {
    let userSchedule = await this.contentService.findTodayUserSchedule(user);

    if (!userSchedule) {
      userSchedule = new UserSchedule();

      userSchedule.user = user;
      userSchedule.forDay = new Date();
    }

    const found = false;
    userSchedule.progress.map((item) => {
      if (item.todoId === id) {
        return {
          ...item,
          lastUpdate: new Date(),
          checked: checked,
        };
      } else {
        return item;
      }
    });

    if (!found) {
      userSchedule.progress.push({
        todoId: id,
        lastUpdate: new Date(),
        checked,
      });
    }

    await this.contentService.saveUserSchedule(userSchedule);

    return {
      success: true,
    };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async selectJourney(
    @Args('id', { defaultValue: null }) id: string | null,
    @CurrentUser() user,
  ) {
    const currentProgress = await this.contentService.findUserActiveProgress(
      user,
    );

    let journeyId = id;

    if (!currentProgress) {
      if (!journeyId) {
        const journey = Data.journeys.find((journey) =>
          journey.applyForLabel.includes(user.registrationLabel),
        );

        if (journey) {
          journeyId = journey.id;
        } else {
          journeyId = 'Sm91cm5leTox';
        }
      }

      const userProgress = new UserProgress();
      userProgress.user = user;
      userProgress.journey = journeyId;
      userProgress.active = true;

      await this.contentService.save(userProgress);

      user.finishedRegistration = true;

      await this.userService.save(user);

      return true;
    }

    user.finishedRegistration = true;

    await this.userService.save(user);

    return false;
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async testContent() {
    Data.journeys.map((journey) => {
      const allItems = [
        ...journey.levels.map((level) => [
          level.phase,
          level.relaxation,
          level.tasks,
          level.tools,
        ]),
      ]
        .flat()
        .flat()
        .map((item) => item.id);

      const uniqueItems = [...new Set(allItems)];

      let result = {
        id: journey.id,
        name: journey.name,
        allItems: allItems.length,
        commonItems: uniqueItems.length,
        levels: journey.levels.map((level) => {
          const items = [
            ...new Set([
              level.phase,
              level.relaxation,
              level.tasks,
              level.tools,
            ]),
          ].flat();

          const previousLevels = journey.levels.filter(
            (prevLev) => prevLev.level < level.level,
          );
          const previousItems = previousLevels
            .map((prevLevel) => [
              prevLevel.phase,
              prevLevel.relaxation,
              prevLevel.tasks,
              prevLevel.tools,
            ])
            .flat()
            .flat()
            .map((item) => item.id);

          const uniqueItems = items.filter(
            (item) => !previousItems.includes(item.id),
          );

          return {
            level: level.level,
            // audioItems: items.filter((item) => item.__typename === 'AudioItem')
            //   .length,
            // articleItems: items.filter(
            //   (item) => item.__typename === 'ArticleItem',
            // ).length,
            // videoItems: items.filter((item) => item.__typename === 'VideoItem')
            //   .length,

            items: items.length,
            uniqueItems: uniqueItems.length,
            idealMax: 0,
            // min: level.minimumPoints,
            // max: level.requiredPoints,
          };
        }),
      };

      let temp = 0;
      result.levels = result.levels.map((level) => {
        const idealMax = temp + level.uniqueItems;

        temp += level.uniqueItems;

        return {
          ...level,
          idealMax,
        };
      });

      console.log(result);
    });

    return 'tested';
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async switchJourney(@Args('id') id: string, @CurrentUser() user) {
    const userProgresses = await this.contentService.findUserProgresses(user);

    if (userProgresses.find((progress) => progress.journey === id)) {
      for (const userProgress of userProgresses) {
        if (userProgress.journey === id) {
          userProgress.active = true;
        } else {
          userProgress.active = false;
        }

        await this.contentService.save(userProgress);
      }
    } else {
      for (const userProgress of userProgresses) {
        userProgress.active = false;
        await this.contentService.save(userProgress);
      }

      const userProgress = new UserProgress();
      userProgress.user = user;
      userProgress.journey = id;
      userProgress.active = true;

      await this.contentService.save(userProgress);
    }

    user.finishedRegistration = true;

    await this.userService.save(user);

    return true;
  }
}
