import { MigrationInterface, QueryRunner } from "typeorm";

export class booksAddWatchedColumn1671535469094 implements MigrationInterface {
    name = 'booksAddWatchedColumn1671535469094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "watched" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "watched"`);
    }

}
