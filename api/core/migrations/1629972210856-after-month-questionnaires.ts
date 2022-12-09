import {MigrationInterface, QueryRunner} from "typeorm";

export class afterMonthQuestionnaires1629972210856 implements MigrationInterface {
    name = 'afterMonthQuestionnaires1629972210856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `afterMonthPlanned` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `user` ADD `platformOrigin` varchar(10) NULL");
        await queryRunner.query("ALTER TABLE `questionnaire` ADD `isDefaultAfterMonthUsing` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `questionnaire` ADD `isDefaultAfterMonthSimpler` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `questionnaire` ADD `isDefaultForControlGroupAfterMonth` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `user_questionnaire` ADD `occasion` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_questionnaire` DROP COLUMN `occasion`");
        await queryRunner.query("ALTER TABLE `questionnaire` DROP COLUMN `isDefaultForControlGroupAfterMonth`");
        await queryRunner.query("ALTER TABLE `questionnaire` DROP COLUMN `isDefaultAfterMonthSimpler`");
        await queryRunner.query("ALTER TABLE `questionnaire` DROP COLUMN `isDefaultAfterMonthUsing`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `platformOrigin`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `afterMonthPlanned`");
    }

}
