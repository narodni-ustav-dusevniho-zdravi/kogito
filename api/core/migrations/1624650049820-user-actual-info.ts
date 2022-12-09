import {MigrationInterface, QueryRunner} from "typeorm";

export class userActualInfo1624650049820 implements MigrationInterface {
    name = 'userActualInfo1624650049820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `actualState` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `actualState`");
    }

}
