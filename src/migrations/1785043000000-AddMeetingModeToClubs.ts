import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMeetingModeToClubs1785043000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clubs" ADD COLUMN IF NOT EXISTS "meeting_mode" varchar NOT NULL DEFAULT 'OFFLINE'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clubs" DROP COLUMN IF EXISTS "meeting_mode"`,
    );
  }
}
