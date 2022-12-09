import {MigrationInterface, QueryRunner} from "typeorm";

export class progressUpdate1622143346710 implements MigrationInterface {
    name = 'progressUpdate1622143346710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `content_story` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `published` datetime NOT NULL, `enabled` tinyint NOT NULL, `title` varchar(255) NOT NULL, `content` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diary_entry` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `content` text NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diary_mood_log` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `mood` int NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_progress` DROP COLUMN `currentLevel`");
        await queryRunner.query("ALTER TABLE `user_progress` DROP COLUMN `levelProgress`");
        await queryRunner.query("ALTER TABLE `diary_entry` ADD CONSTRAINT `FK_0414326ce079d179a5e6a1ca993` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diary_mood_log` ADD CONSTRAINT `FK_c5909ca631b23744cf4b0e7cc59` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `diary_mood_log` DROP FOREIGN KEY `FK_c5909ca631b23744cf4b0e7cc59`");
        await queryRunner.query("ALTER TABLE `diary_entry` DROP FOREIGN KEY `FK_0414326ce079d179a5e6a1ca993`");
        await queryRunner.query("ALTER TABLE `user_progress` ADD `levelProgress` int NOT NULL");
        await queryRunner.query("ALTER TABLE `user_progress` ADD `currentLevel` int NOT NULL");
        await queryRunner.query("DROP TABLE `diary_mood_log`");
        await queryRunner.query("DROP TABLE `diary_entry`");
        await queryRunner.query("DROP TABLE `content_story`");
    }

}
