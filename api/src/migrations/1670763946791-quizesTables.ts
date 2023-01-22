import { MigrationInterface, QueryRunner } from "typeorm";

export class quizesTables1670763946791 implements MigrationInterface {
    name = 'quizesTables1670763946791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quizes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "category" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2c6a29e4f537875fdef1f2e5881" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizes_questions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quizId" integer, CONSTRAINT "PK_0dd78ba92fd08abdef32c989e52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizes_answers" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "isCorrect" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questionId" integer, CONSTRAINT "PK_be612e2182c0da77f0c4ea6a5fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quizes_questions" ADD CONSTRAINT "FK_663d012782fead6c7abccbcaa9d" FOREIGN KEY ("quizId") REFERENCES "quizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizes_answers" ADD CONSTRAINT "FK_76499614658caa0a31dc1a21d36" FOREIGN KEY ("questionId") REFERENCES "quizes_questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quizes_answers" DROP CONSTRAINT "FK_76499614658caa0a31dc1a21d36"`);
        await queryRunner.query(`ALTER TABLE "quizes_questions" DROP CONSTRAINT "FK_663d012782fead6c7abccbcaa9d"`);
        await queryRunner.query(`DROP TABLE "quizes_answers"`);
        await queryRunner.query(`DROP TABLE "quizes_questions"`);
        await queryRunner.query(`DROP TABLE "quizes"`);
    }

}
