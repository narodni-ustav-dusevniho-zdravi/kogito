import {MigrationInterface, QueryRunner} from "typeorm";

export class articleVideo1623414638655 implements MigrationInterface {
    name = 'articleVideo1623414638655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `content_story` ADD `videoLink` text NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `content_story` DROP COLUMN `videoLink`");
    }

}
