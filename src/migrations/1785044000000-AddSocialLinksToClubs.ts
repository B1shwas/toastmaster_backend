import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSocialLinksToClubs1785044000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clubs" ADD COLUMN IF NOT EXISTS "social_links" text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clubs" DROP COLUMN IF EXISTS "social_links"`,
    );
  }
}
