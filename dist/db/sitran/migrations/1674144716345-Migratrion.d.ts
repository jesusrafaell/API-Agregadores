import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Migratrion1674144716345 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
