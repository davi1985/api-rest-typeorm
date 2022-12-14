import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664479626667 implements MigrationInterface {
    name = 'default1664479626667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subjects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "room_subject" ("room_id" integer NOT NULL, "subject_id" integer NOT NULL, PRIMARY KEY ("room_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f227421d2ef64ab086261ac07f" ON "room_subject" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a05f10c497f5f7db3022664a6d" ON "room_subject" ("subject_id") `);
        await queryRunner.query(`CREATE TABLE "temporary_rooms" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "description" text)`);
        await queryRunner.query(`INSERT INTO "temporary_rooms"("id", "name") SELECT "id", "name" FROM "rooms"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`ALTER TABLE "temporary_rooms" RENAME TO "rooms"`);
        await queryRunner.query(`DROP INDEX "IDX_f227421d2ef64ab086261ac07f"`);
        await queryRunner.query(`DROP INDEX "IDX_a05f10c497f5f7db3022664a6d"`);
        await queryRunner.query(`CREATE TABLE "temporary_room_subject" ("room_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "FK_f227421d2ef64ab086261ac07fd" FOREIGN KEY ("room_id") REFERENCES "subjects" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6" FOREIGN KEY ("subject_id") REFERENCES "rooms" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("room_id", "subject_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_room_subject"("room_id", "subject_id") SELECT "room_id", "subject_id" FROM "room_subject"`);
        await queryRunner.query(`DROP TABLE "room_subject"`);
        await queryRunner.query(`ALTER TABLE "temporary_room_subject" RENAME TO "room_subject"`);
        await queryRunner.query(`CREATE INDEX "IDX_f227421d2ef64ab086261ac07f" ON "room_subject" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a05f10c497f5f7db3022664a6d" ON "room_subject" ("subject_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a05f10c497f5f7db3022664a6d"`);
        await queryRunner.query(`DROP INDEX "IDX_f227421d2ef64ab086261ac07f"`);
        await queryRunner.query(`ALTER TABLE "room_subject" RENAME TO "temporary_room_subject"`);
        await queryRunner.query(`CREATE TABLE "room_subject" ("room_id" integer NOT NULL, "subject_id" integer NOT NULL, PRIMARY KEY ("room_id", "subject_id"))`);
        await queryRunner.query(`INSERT INTO "room_subject"("room_id", "subject_id") SELECT "room_id", "subject_id" FROM "temporary_room_subject"`);
        await queryRunner.query(`DROP TABLE "temporary_room_subject"`);
        await queryRunner.query(`CREATE INDEX "IDX_a05f10c497f5f7db3022664a6d" ON "room_subject" ("subject_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f227421d2ef64ab086261ac07f" ON "room_subject" ("room_id") `);
        await queryRunner.query(`ALTER TABLE "rooms" RENAME TO "temporary_rooms"`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "rooms"("id", "name") SELECT "id", "name" FROM "temporary_rooms"`);
        await queryRunner.query(`DROP TABLE "temporary_rooms"`);
        await queryRunner.query(`DROP INDEX "IDX_a05f10c497f5f7db3022664a6d"`);
        await queryRunner.query(`DROP INDEX "IDX_f227421d2ef64ab086261ac07f"`);
        await queryRunner.query(`DROP TABLE "room_subject"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
    }

}
