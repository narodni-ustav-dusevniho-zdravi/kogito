import {MigrationInterface, QueryRunner} from "typeorm";

export class update1618567209184 implements MigrationInterface {
    name = 'update1618567209184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `questionnaire` ADD `isDefaultAfterRegistration` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `question` ADD `index` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `index`");
        await queryRunner.query("ALTER TABLE `questionnaire` DROP COLUMN `isDefaultAfterRegistration`");
    }

}
