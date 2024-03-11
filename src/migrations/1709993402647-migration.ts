import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709993402647 implements MigrationInterface {
    name = 'Migration1709993402647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "firstname" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_518f4754870658fe032a925d3c9" UNIQUE ("firstname", "lastname"), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "author"`);
    }

}
