import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664479263128 implements MigrationInterface {
    name = 'default1664479263128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_rooms" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "description" text)`);
        await queryRunner.query(`INSERT INTO "temporary_rooms"("id", "name") SELECT "id", "name" FROM "rooms"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`ALTER TABLE "temporary_rooms" RENAME TO "rooms"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" RENAME TO "temporary_rooms"`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "rooms"("id", "name") SELECT "id", "name" FROM "temporary_rooms"`);
        await queryRunner.query(`DROP TABLE "temporary_rooms"`);
    }

}
