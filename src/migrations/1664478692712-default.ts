import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664478692712 implements MigrationInterface {
  name = "default1664478692712";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "videos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "url" text NOT NULL, "room_id" integer)`
    );
    await queryRunner.query(
      `CREATE TABLE "rooms" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_videos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "url" text NOT NULL, "room_id" integer, CONSTRAINT "FK_64bb2d8544299bbde670698ac37" FOREIGN KEY ("room_id") REFERENCES "rooms" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_videos"("id", "title", "url", "room_id") SELECT "id", "title", "url", "room_id" FROM "videos"`
    );
    await queryRunner.query(`DROP TABLE "videos"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_videos" RENAME TO "videos"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "videos" RENAME TO "temporary_videos"`
    );
    await queryRunner.query(
      `CREATE TABLE "videos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "url" text NOT NULL, "room_id" integer)`
    );
    await queryRunner.query(
      `INSERT INTO "videos"("id", "title", "url", "room_id") SELECT "id", "title", "url", "room_id" FROM "temporary_videos"`
    );
    await queryRunner.query(`DROP TABLE "temporary_videos"`);
    await queryRunner.query(`DROP TABLE "rooms"`);
    await queryRunner.query(`DROP TABLE "videos"`);
  }
}
