import {MigrationInterface, QueryRunner} from "typeorm";

export class contentUpdate1620835296573 implements MigrationInterface {
    name = 'contentUpdate1620835296573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_progress` ADD `itemsProgress` json NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_progress` DROP COLUMN `itemsProgress`");
    }

}
