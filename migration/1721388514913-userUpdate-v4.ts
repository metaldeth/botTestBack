import {MigrationInterface, QueryRunner} from "typeorm";

export class userUpdateV41721388514913 implements MigrationInterface {
    name = 'userUpdateV41721388514913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "username" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "login" character varying(255) NOT NULL`);
    }

}
