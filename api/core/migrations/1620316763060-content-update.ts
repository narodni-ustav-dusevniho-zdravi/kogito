import { MigrationInterface, QueryRunner } from 'typeorm';

export class contentUpdate1620316763060 implements MigrationInterface {
  name = 'contentUpdate1620316763060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user` CHANGE `inviteCode` `finishedRegistration` varchar(255) NULL',
    );
    await queryRunner.query(
      'CREATE TABLE `sms_code` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `code` varchar(6) NOT NULL, `used` datetime NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `content_audio_file` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `content_group` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `content_phase` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `content_level` (`id` int NOT NULL AUTO_INCREMENT, `level` int NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `content_item` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `phaseId` int NULL, `levelId` int NULL, `groupId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user_progress` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `journey` varchar(255) NOT NULL, `active` tinyint NOT NULL, `currentLevel` int NOT NULL, `levelProgress` int NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `firstName`');
    await queryRunner.query(
      'ALTER TABLE `user` ADD `firstName` varchar(100) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `lastName`');
    await queryRunner.query(
      'ALTER TABLE `user` ADD `lastName` varchar(100) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `user` DROP COLUMN `finishedRegistration`',
    );
    await queryRunner.query(
      'ALTER TABLE `user` ADD `finishedRegistration` tinyint NOT NULL DEFAULT 0',
    );
    await queryRunner.query(
      'ALTER TABLE `sms_code` ADD CONSTRAINT `FK_9a1070070c9291efeab052a319e` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `content_item` ADD CONSTRAINT `FK_ed60522f041dbfa733c637afaae` FOREIGN KEY (`phaseId`) REFERENCES `content_phase`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `content_item` ADD CONSTRAINT `FK_0a3c3a6ccab71224bc842333731` FOREIGN KEY (`levelId`) REFERENCES `content_level`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `content_item` ADD CONSTRAINT `FK_162ed1bda3003b9b0957367c06b` FOREIGN KEY (`groupId`) REFERENCES `content_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `user_progress` ADD CONSTRAINT `FK_b5d0e1b57bc6c761fb49e79bf89` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_progress` DROP FOREIGN KEY `FK_b5d0e1b57bc6c761fb49e79bf89`',
    );
    await queryRunner.query(
      'ALTER TABLE `content_item` DROP FOREIGN KEY `FK_162ed1bda3003b9b0957367c06b`',
    );
    await queryRunner.query(
      'ALTER TABLE `content_item` DROP FOREIGN KEY `FK_0a3c3a6ccab71224bc842333731`',
    );
    await queryRunner.query(
      'ALTER TABLE `content_item` DROP FOREIGN KEY `FK_ed60522f041dbfa733c637afaae`',
    );
    await queryRunner.query(
      'ALTER TABLE `sms_code` DROP FOREIGN KEY `FK_9a1070070c9291efeab052a319e`',
    );
    await queryRunner.query(
      'ALTER TABLE `user` DROP COLUMN `finishedRegistration`',
    );
    await queryRunner.query(
      'ALTER TABLE `user` ADD `finishedRegistration` varchar(255) NULL',
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `lastName`');
    await queryRunner.query(
      'ALTER TABLE `user` ADD `lastName` varchar(255) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `firstName`');
    await queryRunner.query(
      'ALTER TABLE `user` ADD `firstName` varchar(255) NOT NULL',
    );
    await queryRunner.query('DROP TABLE `user_progress`');
    await queryRunner.query('DROP TABLE `content_item`');
    await queryRunner.query('DROP TABLE `content_level`');
    await queryRunner.query('DROP TABLE `content_phase`');
    await queryRunner.query('DROP TABLE `content_group`');
    await queryRunner.query('DROP TABLE `content_audio_file`');
    await queryRunner.query('DROP TABLE `sms_code`');
    await queryRunner.query(
      'ALTER TABLE `user` CHANGE `finishedRegistration` `inviteCode` varchar(255) NULL',
    );
  }
}
