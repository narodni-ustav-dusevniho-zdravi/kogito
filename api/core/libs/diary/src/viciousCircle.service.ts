import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  DiaryViciousCircle,
  DiaryViciousCircleId,
} from '@app/diary/viciousCircle.entity';
import { User } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiaryViciousCircleService {
  constructor(
    @InjectRepository(DiaryViciousCircle)
    private readonly viciousCircleRepository: Repository<DiaryViciousCircle>,
  ) {}

  async filter(user: User, limit = 10): Promise<DiaryViciousCircle[]> {
    return this.viciousCircleRepository.find({
      where: {
        user,
      },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async findById(id: DiaryViciousCircleId): Promise<DiaryViciousCircle> {
    return this.viciousCircleRepository.findOne({
      where: {
        id,
      },
    });
  }

  async save(entry: Partial<DiaryViciousCircle>): Promise<DiaryViciousCircle> {
    return this.viciousCircleRepository.save(entry, { reload: true });
  }
}
