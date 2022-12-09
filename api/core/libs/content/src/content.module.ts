import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ContentPhase,
  ContentAudioFile,
  ContentGroup,
  ContentItem,
  ContentLevel,
  ContentStory,
  UserProgress,
  UserSchedule,
} from './entity';
import { ContentService } from '@app/content/content.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContentPhase,
      ContentAudioFile,
      ContentGroup,
      ContentItem,
      ContentLevel,
      ContentStory,
      UserProgress,
      UserSchedule,
    ]),
  ],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
