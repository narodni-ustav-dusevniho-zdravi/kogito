import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiaryMoodLog } from './moodLog.entity';
import { User } from '@app/user/user.entity';
import { MOOD } from '@app/diary/mood.types';

@Injectable()
export class MoodLogService {
  constructor(
    @InjectRepository(DiaryMoodLog)
    private readonly moodRepository: Repository<DiaryMoodLog>,
  ) {}

  async findById(id: number): Promise<DiaryMoodLog> {
    return this.moodRepository.findOne({
      where: {
        id,
      },
    });
  }

  async filter(user: User, limit = 10): Promise<DiaryMoodLog[]> {
    return this.moodRepository.find({
      where: {
        user,
      },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async userStatistics(user: User): Promise<{ mood: number; count: number }[]> {
    return this.moodRepository.query(
      "SELECT mood, COUNT(mood) as 'count' FROM diary_mood_log WHERE userId = ? GROUP BY mood;",
      [user.id],
      // { userId: user.id },
    );
  }

  async insertLog(user: User, mood: MOOD) {
    const log = new DiaryMoodLog();
    log.user = user;
    log.mood = mood;

    await this.moodRepository.save(log);
  }

  async remove(record: DiaryMoodLog) {
    return this.moodRepository.remove(record);
  }

  async findLast(user: User): Promise<undefined | DiaryMoodLog> {
    return this.moodRepository.findOne({
      where: {
        user,
      },
      order: { createdAt: 'DESC' },
    });
  }
}
