import {MigrationInterface, QueryRunner} from "typeorm";

export class adminInvitation1627372025586 implements MigrationInterface {
    name = 'adminInvitation1627372025586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `invitedUser` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `invitedUser`");
    }

}
