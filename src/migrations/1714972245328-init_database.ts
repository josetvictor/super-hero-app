import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1714972245328 implements MigrationInterface {
    name = 'InitDatabase1714972245328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gender" ("id" SERIAL NOT NULL, "gender" character varying(20), CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colour" ("id" SERIAL NOT NULL, "colour" character varying(20), CONSTRAINT "PK_04e2f7f25e4de91d3b0ec96443d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "race" ("id" SERIAL NOT NULL, "race" character varying(100), CONSTRAINT "PK_a3068b184130d87a20e516045bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publisher" ("id" SERIAL NOT NULL, "publisher_name" character varying(50), CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alignment" ("id" SERIAL NOT NULL, "alignment" character varying(10), CONSTRAINT "PK_6d3449aed4bfee0b1d4b9b62e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute" ("id" SERIAL NOT NULL, "attribute_name" character varying(200), CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hero_attribute" ("id" SERIAL NOT NULL, "value" integer, "attributeId" integer, "superheroId" integer, CONSTRAINT "PK_695e9101d6bfd86621ee2fa3353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "superhero" ("id" SERIAL NOT NULL, "superhero_name" character varying(200), "full_name" character varying(200), "height_cm" integer, "weight_kg" integer, "genderId" integer, "eyeColourId" integer, "hairColourId" integer, "skinColourId" integer, "raceId" integer, "publisherId" integer, "alignmentId" integer, CONSTRAINT "PK_b92ff773465116c2b5e215bb910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "superpower" ("id" SERIAL NOT NULL, "powerName" character varying(200), CONSTRAINT "PK_fa3edbd7a16307c13bba08b1b0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "fistname" character varying NOT NULL, "lastname" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comic" ("id" SERIAL NOT NULL, "comic_name" character varying(200), "issue" integer, "publish_month" integer, "publish_year" integer, CONSTRAINT "PK_071fba28990ddf3518fcd165624" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hero_power" ("superpowerId" integer NOT NULL, "superheroId" integer NOT NULL, CONSTRAINT "PK_486c08fb9fe99af1a7050e926c9" PRIMARY KEY ("superpowerId", "superheroId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_06f6494961d98c3807b6f7fca4" ON "hero_power" ("superpowerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a632ff4c6782481a5c8a61746" ON "hero_power" ("superheroId") `);
        await queryRunner.query(`ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_b19b34005e1e30d190f6e6d1e6e" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_e2d683347c05acde35643743102" FOREIGN KEY ("superheroId") REFERENCES "superhero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "superhero" ADD CONSTRAINT "FK_2e984bd6c63045e1741e874c4b0" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "superhero" ADD CONSTRAINT "FK_305a36d558c6669df2414aa3b48" FOREIGN KEY ("eyeColourId") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "superhero" ADD CONSTRAINT "FK_ed169e1983baac1b859e7f8f1a0" FOREIGN KEY ("hairColourId") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "superhero" ADD CONSTRAINT "FK_158a6a899ddaa0030008103491e" FOREIGN KEY ("skinColourId") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "superhero" ADD CONSTRAINT "FK_f6bdd045591e490d98791cb4a3a" FOREIGN KEY ("raceId") REFERENCES "race"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "superhero" ADD CONSTRAINT "FK_89a6470a5f81bab7b4e571b1144" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "superhero" ADD CONSTRAINT "FK_d4218f21ad02261caf90209a079" FOREIGN KEY ("alignmentId") REFERENCES "alignment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hero_power" ADD CONSTRAINT "FK_06f6494961d98c3807b6f7fca47" FOREIGN KEY ("superpowerId") REFERENCES "superpower"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hero_power" ADD CONSTRAINT "FK_3a632ff4c6782481a5c8a61746c" FOREIGN KEY ("superheroId") REFERENCES "superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hero_power" DROP CONSTRAINT "FK_3a632ff4c6782481a5c8a61746c"`);
        await queryRunner.query(`ALTER TABLE "hero_power" DROP CONSTRAINT "FK_06f6494961d98c3807b6f7fca47"`);
        await queryRunner.query(`ALTER TABLE "superhero" DROP CONSTRAINT "FK_d4218f21ad02261caf90209a079"`);
        await queryRunner.query(`ALTER TABLE "superhero" DROP CONSTRAINT "FK_89a6470a5f81bab7b4e571b1144"`);
        await queryRunner.query(`ALTER TABLE "superhero" DROP CONSTRAINT "FK_f6bdd045591e490d98791cb4a3a"`);
        await queryRunner.query(`ALTER TABLE "superhero" DROP CONSTRAINT "FK_158a6a899ddaa0030008103491e"`);
        await queryRunner.query(`ALTER TABLE "superhero" DROP CONSTRAINT "FK_ed169e1983baac1b859e7f8f1a0"`);
        await queryRunner.query(`ALTER TABLE "superhero" DROP CONSTRAINT "FK_305a36d558c6669df2414aa3b48"`);
        await queryRunner.query(`ALTER TABLE "superhero" DROP CONSTRAINT "FK_2e984bd6c63045e1741e874c4b0"`);
        await queryRunner.query(`ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_e2d683347c05acde35643743102"`);
        await queryRunner.query(`ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_b19b34005e1e30d190f6e6d1e6e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a632ff4c6782481a5c8a61746"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06f6494961d98c3807b6f7fca4"`);
        await queryRunner.query(`DROP TABLE "hero_power"`);
        await queryRunner.query(`DROP TABLE "comic"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "superpower"`);
        await queryRunner.query(`DROP TABLE "superhero"`);
        await queryRunner.query(`DROP TABLE "hero_attribute"`);
        await queryRunner.query(`DROP TABLE "attribute"`);
        await queryRunner.query(`DROP TABLE "alignment"`);
        await queryRunner.query(`DROP TABLE "publisher"`);
        await queryRunner.query(`DROP TABLE "race"`);
        await queryRunner.query(`DROP TABLE "colour"`);
        await queryRunner.query(`DROP TABLE "gender"`);
    }

}
