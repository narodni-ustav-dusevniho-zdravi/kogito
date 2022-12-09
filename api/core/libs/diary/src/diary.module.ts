import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryEntry } from './entry.entity';
import { DiaryMoodLog } from './moodLog.entity';
import { DiaryEntryService } from './entry.service';
import { MoodLogService } from './moodLog.service';
import { DiaryViciousCircle } from './viciousCircle.entity';
import { DiaryViciousCircleService } from './viciousCircle.service';
import { DiaryTodo } from '@app/diary/todo.entity';
import { DiaryTodoService } from '@app/diary/todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiaryEntry,
      DiaryMoodLog,
      DiaryViciousCircle,
      DiaryTodo,
    ]),
  ],
  providers: [
    DiaryEntryService,
    MoodLogService,
    DiaryViciousCircleService,
    DiaryTodoService,
  ],
  exports: [
    DiaryEntryService,
    MoodLogService,
    DiaryViciousCircleService,
    DiaryTodoService,
  ],
})
export class DiaryModule {}
