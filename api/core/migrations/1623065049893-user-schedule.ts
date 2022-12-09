import {MigrationInterface, QueryRunner} from "typeorm";

export class userSchedule1623065049893 implements MigrationInterface {
    name = 'userSchedule1623065049893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_schedule` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `forDay` date NOT NULL, `progress` json NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_schedule` ADD CONSTRAINT `FK_e934c0e0a6f68f200292ba41e1d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_schedule` DROP FOREIGN KEY `FK_e934c0e0a6f68f200292ba41e1d`");
        await queryRunner.query("DROP TABLE `user_schedule`");
    }

}
