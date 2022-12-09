import {MigrationInterface, QueryRunner} from "typeorm";

export class registration1624609806866 implements MigrationInterface {
    name = 'registration1624609806866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `userInfoCompleted` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `user` ADD `registrationLabel` varchar(5) NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `group` varchar(10) NOT NULL DEFAULT 'normal'");
        await queryRunner.query("ALTER TABLE `user` ADD `age` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `dateOfBirth` date NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `maritalStatus` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `maritalStatusDescription` text NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `numberOfChildren` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `educationalAttainment` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `population` int NULL");
        await queryRunner.query("ALTER TABLE `questionnaire` ADD `scoreLabel` json NULL");
        await queryRunner.query("ALTER TABLE `user_questionnaire` ADD `points` int NOT NULL");
        await queryRunner.query("ALTER TABLE `user_questionnaire` ADD `label` varchar(5) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_questionnaire` DROP COLUMN `label`");
        await queryRunner.query("ALTER TABLE `user_questionnaire` DROP COLUMN `points`");
        await queryRunner.query("ALTER TABLE `questionnaire` DROP COLUMN `scoreLabel`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `population`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `educationalAttainment`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `numberOfChildren`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `maritalStatusDescription`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `maritalStatus`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `dateOfBirth`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `age`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `group`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `registrationLabel`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `userInfoCompleted`");
    }

}
