import {MigrationInterface, QueryRunner} from "typeorm";

export class viciousCircle1623161238485 implements MigrationInterface {
    name = 'viciousCircle1623161238485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `diary_vicious_circle` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` text NOT NULL, `trigger` json NOT NULL, `negativeThoughts` json NOT NULL, `emotions` json NOT NULL, `physicalSymptoms` json NOT NULL, `behaviour` json NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `diary_vicious_circle` ADD CONSTRAINT `FK_ca5ae39238f50ee536da541240b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `diary_vicious_circle` DROP FOREIGN KEY `FK_ca5ae39238f50ee536da541240b`");
        await queryRunner.query("DROP TABLE `diary_vicious_circle`");
    }

}
