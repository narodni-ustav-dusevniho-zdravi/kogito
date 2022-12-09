import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as moment from 'moment';

export type UserId = number;
export type Groups = 'normal' | 'control';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: UserId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  lastLogin: Date | null;

  @Column({ type: 'bool' })
  enabled = true;

  @Column({ type: 'bool' })
  isAdmin = false;

  @Column({ unique: true })
  phoneNumber: string | null = null;

  @Column({ nullable: true })
  email: string | null = null;

  @Column({ type: 'varchar', length: 100 })
  firstName = '';

  @Column({ type: 'varchar', length: 100 })
  lastName = '';

  @Column({ nullable: true })
  password: string | null = null;

  @Column({ nullable: true })
  birthDate: Date | null = null;

  @Column({ type: 'bool', default: false })
  finishedRegistration = false;

  @Column({ type: 'bool', default: false })
  userInfoCompleted = false;

  @Column({ type: 'varchar', length: 5, nullable: true })
  registrationLabel: string | null = null;

  @Column({ type: 'varchar', length: 10, default: 'normal' })
  group: Groups = 'normal';

  @Column({ type: 'int', nullable: true })
  age: number | null;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date | null;

  @Column({ type: 'int', nullable: true })
  maritalStatus: number | null;

  @Column({ type: 'text', nullable: true })
  maritalStatusDescription: string | null;

  @Column({ type: 'int', nullable: true })
  numberOfChildren: number | null;

  @Column({ type: 'int', nullable: true })
  educationalAttainment: number | null;

  @Column({ type: 'int', nullable: true })
  population: number | null;

  @Column({ type: 'int', nullable: true })
  actualState: number | null;

  @Column({ type: 'bool', default: false })
  successfulLogin = false;

  @Column({ type: 'bool', default: false })
  invitedUser = false;

  @Column({ type: 'bool', default: false })
  afterMonthPlanned = false;

  @Column({ type: 'varchar', length: 10, nullable: true })
  platformOrigin: string | null;

  @Column({ type: 'text', nullable: true })
  currentRefreshToken: string | null;

  isAfterResearch(): boolean {
    return this.createdAt.getTime() > moment('27-09-2021').toDate().getTime();
  }
}
