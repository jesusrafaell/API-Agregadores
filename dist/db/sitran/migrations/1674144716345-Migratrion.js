"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migratrion1674144716345 = void 0;
class Migratrion1674144716345 {
    constructor() {
        this.name = 'Migratrion1674144716345';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "general_logs_api" ("id" int NOT NULL IDENTITY(1,1), "id_user" int NOT NULL, "descript" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_d93e4c5af89aa34b542158f1c2b" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_89637c451e57456c1a1cd5b2c9a" DEFAULT getdate(), "id_origin_logs" int, CONSTRAINT "PK_dc762d0aa6eeab1b4afb5b69bd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "origin_logs_api" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_39a1b251cdfac804829c57c6904" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ea8ca9f335e21b1e42cbce55fcb" DEFAULT getdate(), CONSTRAINT "PK_a58f8ce56941368d00eda675ede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "general_logs_api" ADD CONSTRAINT "FK_7d0189795ebd352e3bfe8a1264a" FOREIGN KEY ("id_origin_logs") REFERENCES "origin_logs_api"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "general_logs_api" DROP CONSTRAINT "FK_7d0189795ebd352e3bfe8a1264a"`);
        await queryRunner.query(`DROP TABLE "origin_logs_api"`);
        await queryRunner.query(`DROP TABLE "general_logs_api"`);
    }
}
exports.Migratrion1674144716345 = Migratrion1674144716345;
//# sourceMappingURL=1674144716345-Migratrion.js.map