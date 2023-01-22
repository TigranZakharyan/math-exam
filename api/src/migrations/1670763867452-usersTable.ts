import { MigrationInterface, QueryRunner } from "typeorm";

export class usersTable1670763867452 implements MigrationInterface {
    name = 'usersTable1670763867452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
