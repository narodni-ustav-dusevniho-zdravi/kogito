import { Injectable } from '@nestjs/common';
import { DiaryEntry, DiaryEntryId } from './entry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/user.entity';

@Injectable()
export class DiaryEntryService {
  constructor(
    @InjectRepository(DiaryEntry)
    private readonly entryRepository: Repository<DiaryEntry>,
  ) {}

  async findById(id: DiaryEntryId): Promise<DiaryEntry> {
    return this.entryRepository.findOne(id);
  }

  async save(entry: Partial<DiaryEntry>): Promise<DiaryEntry> {
    return this.entryRepository.save(entry, { reload: true });
  }

  async remove(entry: DiaryEntry) {
    return this.entryRepository.remove(entry);
  }

  async filter(user: User, limit = 100): Promise<DiaryEntry[]> {
    return this.entryRepository.find({
      where: {
        user,
      },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
