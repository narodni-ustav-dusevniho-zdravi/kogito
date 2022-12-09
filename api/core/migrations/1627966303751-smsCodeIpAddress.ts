import { MigrationInterface, QueryRunner } from 'typeorm';

export class smsCodeIpAddress1627966303751 implements MigrationInterface {
  name = 'smsCodeIpAddress1627966303751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `sms_code` ADD `ipAddress` varchar(100) NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `sms_code` DROP COLUMN `ipAddress`');
  }
}
