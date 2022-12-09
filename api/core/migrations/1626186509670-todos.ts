import { MigrationInterface, QueryRunner } from 'typeorm';

export class todos1626186509670 implements MigrationInterface {
  name = 'todos1626186509670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `diary_todo` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `completed` datetime NULL, `deleted` datetime NULL, `title` text NOT NULL, `dayPart` enum ('MORNING', 'AFTERNOON', 'EVENING') NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `diary_todo` ADD CONSTRAINT `FK_a34f8fce2a314970b2cf81df320` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `diary_todo` DROP FOREIGN KEY `FK_a34f8fce2a314970b2cf81df320`',
    );
    await queryRunner.query('DROP TABLE `diary_todo`');
  }
}
