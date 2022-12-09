import { MigrationInterface, QueryRunner } from 'typeorm';

export class afterResearch1632746662081 implements MigrationInterface {
  name = 'afterResearch1632746662081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` ADD `lastLogin` datetime NULL');
    await queryRunner.query(
      'ALTER TABLE `user` ADD `currentRefreshToken` text NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user` DROP COLUMN `currentRefreshToken`',
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `lastLogin`');
  }
}
