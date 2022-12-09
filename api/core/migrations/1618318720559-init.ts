import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1618318720559 implements MigrationInterface {
  name = 'init1618318720559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `questionnaire` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `question` (`id` int NOT NULL AUTO_INCREMENT, `question` varchar(500) NOT NULL, `answers` json NOT NULL, `questionnaireId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `enabled` tinyint NOT NULL, `isAdmin` tinyint NOT NULL, `phoneNumber` varchar(255) NOT NULL, `email` varchar(255) NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `inviteCode` varchar(255) NULL, `password` varchar(255) NULL, `birthDate` datetime NULL, UNIQUE INDEX `IDX_f2578043e491921209f5dadd08` (`phoneNumber`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user_questionnaire` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `completedAt` datetime NULL, `userId` int NOT NULL, `questionnaireId` int NOT NULL, `answers` json NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `question` ADD CONSTRAINT `FK_3f7828c3b2c8db7b5e41cade66a` FOREIGN KEY (`questionnaireId`) REFERENCES `questionnaire`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `user_questionnaire` ADD CONSTRAINT `FK_afe1890a1a19e1938c0c6b75e96` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `user_questionnaire` ADD CONSTRAINT `FK_f9fe530e26c1aa029713cd2e2c8` FOREIGN KEY (`questionnaireId`) REFERENCES `questionnaire`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_questionnaire` DROP FOREIGN KEY `FK_f9fe530e26c1aa029713cd2e2c8`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_questionnaire` DROP FOREIGN KEY `FK_afe1890a1a19e1938c0c6b75e96`',
    );
    await queryRunner.query(
      'ALTER TABLE `question` DROP FOREIGN KEY `FK_3f7828c3b2c8db7b5e41cade66a`',
    );
    await queryRunner.query('DROP TABLE `user_questionnaire`');
    await queryRunner.query(
      'DROP INDEX `IDX_f2578043e491921209f5dadd08` ON `user`',
    );
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `question`');
    await queryRunner.query('DROP TABLE `questionnaire`');
  }
}
