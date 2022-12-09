import {MigrationInterface, QueryRunner} from "typeorm";

export class successfullLogin1627281391831 implements MigrationInterface {
    name = 'successfullLogin1627281391831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `successfulLogin` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `successfulLogin`");
    }

}
