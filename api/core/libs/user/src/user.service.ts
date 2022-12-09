import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository, Not, IsNull } from 'typeorm';
import { Groups, User } from '@app/user/user.entity';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ id });
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ phoneNumber });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ email });
  }

  async computeGroups(): Promise<{ group: Groups; count: number }[]> {
    return (
      await this.usersRepository.query(
        "SELECT `group`, COUNT(`group`) as 'count' FROM `user` WHERE successfulLogin = 1 group by `group`;",
      )
    ).map((row) => ({ group: row.group, count: Number.parseInt(row.count) }));
  }

  async randomizeRegisterGroup(): Promise<Groups> {
    const counts = await this.computeGroups();

    if (counts.length === 0) {
      return 'normal';
    }

    if (counts.length === 1) {
      return 'control';
    }

    return counts[0].count > counts[1].count
      ? counts[1].group
      : counts[0].group;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findAllSuccessfulLogged(): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        successfulLogin: true,
      },
    });
  }

  async findUsersAfterMonth(group: Groups): Promise<User[]> {
    const monthBefore = moment().subtract(1, 'month');

    return this.usersRepository.find({
      where: {
        group,
        afterMonthPlanned: false,
        userInfoCompleted: true,
        registrationLabel: Not(IsNull()),
        createdAt: LessThan(monthBefore.toDate()),
      },
    });
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async remove(user: User): Promise<boolean> {
    return true;
  }
}
