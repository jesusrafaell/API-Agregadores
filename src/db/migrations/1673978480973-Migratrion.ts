import { MigrationInterface, QueryRunner } from "typeorm";

export class Migratrion1673978480973 implements MigrationInterface {
    name = 'Migratrion1673978480973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "afiliados_api" ("id" int NOT NULL IDENTITY(1,1), "afiliado" nvarchar(255) NOT NULL, CONSTRAINT "UQ_2be39ac2eabe4dfde26ef9e9c89" UNIQUE ("afiliado"), CONSTRAINT "PK_9a6f537883408e0191f2f86ebfc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "origin_logs_api" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_39a1b251cdfac804829c57c6904" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ea8ca9f335e21b1e42cbce55fcb" DEFAULT getdate(), CONSTRAINT "PK_a58f8ce56941368d00eda675ede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "general_logs_api" ("id" int NOT NULL IDENTITY(1,1), "id_user" int NOT NULL, "descript" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_d93e4c5af89aa34b542158f1c2b" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_89637c451e57456c1a1cd5b2c9a" DEFAULT getdate(), "id_origin_logs" int, CONSTRAINT "PK_dc762d0aa6eeab1b4afb5b69bd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "general_logs_api" ADD CONSTRAINT "FK_7d0189795ebd352e3bfe8a1264a" FOREIGN KEY ("id_origin_logs") REFERENCES "origin_logs_api"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "general_logs_api" DROP CONSTRAINT "FK_7d0189795ebd352e3bfe8a1264a"`);
        await queryRunner.query(`DROP TABLE "general_logs_api"`);
        await queryRunner.query(`DROP TABLE "origin_logs_api"`);
        await queryRunner.query(`DROP TABLE "afiliados_api"`);
    }

}
