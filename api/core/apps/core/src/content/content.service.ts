import { ContentService } from '@app/content/content.service';
import { Injectable } from '@nestjs/common';
import { Data, DataItem } from './data';
import { User } from '@app/user/user.entity';
import { UserProgress } from '@app/content/entity/userProgress.entity';

const solveItems = (
  items: DataItem[],
  userProgress: UserProgress,
  points: number,
): DataItem[] => {
  return items.map((item) => {
    const progressItem = userProgress.itemsProgress.find(
      (progressItem) => progressItem.itemId === item.id,
    );

    let locked = true;
    let progress = 0;

    if (item.requiredPoints <= points) {
      locked = false;
    }

    if (progressItem) {
      progress = progressItem.progress;
    }

    return {
      ...item,
      progress,
      locked,
    };
  });
};

@Injectable()
export class ContentSolverService {
  constructor(private readonly contentService: ContentService) {}

  async solveJourney(user: User, journeyId: string) {
    const userProgress = await this.contentService.findUserProgress(
      user,
      journeyId,
    );

    if (userProgress) {
      return this.prepareJourney(userProgress);
    }

    return Data.journeys.find((journey) => journey.id === journeyId);
  }

  async solveCurrentJourney(user: User) {
    const userProgress = await this.contentService.findUserActiveProgress(user);

    return this.prepareJourney(userProgress);
  }

  async prepareJourney(userProgress: UserProgress) {
    const currentJourney = Data.journeys.find(
      (journey) => journey.id === userProgress.journey,
    );
    currentJourney.unlocked = true;

    const points = userProgress.itemsProgress.filter(
      (progress) => progress.progress > 80,
    ).length;

    const levels = currentJourney.levels.map((level) => {
      let unlocked = false;
      let current = false;
      let progress = 0;

      if (level.minimumPoints <= points) {
        unlocked = true;

        if (points < level.requiredPoints) {
          current = true;

          progress = Math.trunc(
            (100 * (points - level.minimumPoints)) /
              (level.requiredPoints - level.minimumPoints),
          );
        } else {
          progress = 100;
        }
      }

      return {
        ...level,
        phase: solveItems(level.phase, userProgress, points),
        relaxation: solveItems(level.relaxation, userProgress, points),
        tools: solveItems(level.tools, userProgress, points),
        tasks: solveItems(level.tasks, userProgress, points),
        unlocked,
        current,
        progress,
      };
    });

    const currentLevel = levels.find((level) => level.current);

    if (!currentLevel) {
      levels[levels.length - 1].current = true;
    }

    const todos = [];
    // currentJourney.todos.map((todo) => {
    //   return {
    //     ...todo,
    //     unlocked: todo.minimumPoints <= points,
    //   };
    // });

    return {
      ...currentJourney,
      levels,
      todos,
      currentLevel: currentLevel ? currentLevel.level : levels.length,
    };
  }

  async findItemById(itemId: string): Promise<DataItem | undefined> {
    const items: DataItem[] = [
      ...Data.bonusRelaxation,
      ...Data.journeys.map((journey) =>
        [
          ...journey.levels.map((level) => [
            ...level.phase,
            ...level.relaxation,
            ...level.tasks,
            ...level.tools,
          ]),
        ].flat(),
      ),
    ].flat();

    return items.find((item) => item.id === itemId);
  }
}
