import { MigrationInterface, QueryRunner } from "typeorm";

export class Migratrion1681331403987 implements MigrationInterface {
    name = 'Migratrion1681331403987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Type_pos" ("id" int NOT NULL IDENTITY(1,1), "id_agregador" int NOT NULL, "modelo" nvarchar(255) NOT NULL, "tipo" nvarchar(255) NOT NULL, CONSTRAINT "PK_1624ca36ca546e12fd55f5277c1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Type_pos"`);
    }

}
