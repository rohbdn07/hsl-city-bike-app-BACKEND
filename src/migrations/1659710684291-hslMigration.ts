import { MigrationInterface, QueryRunner } from "typeorm";

export class hslMigration1659710684291 implements MigrationInterface {
    name = 'hslMigration1659710684291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "table2021_05" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "departure_date" TIMESTAMP, "return_date" TIMESTAMP, "departure_station_id" integer, "departure_station_name" character varying(150), "return_station_id" integer, "return_station_name" character varying(150), "distance_meter" double precision, "duration_sec" double precision, CONSTRAINT "CHK_f7d3477272ec1dd79f2c6732ad" CHECK ("duration_sec" > 10), CONSTRAINT "CHK_f2fce5af61ae9b72dc8c8aff25" CHECK ("distance_meter" > 10), CONSTRAINT "PK_a4351e43e6d6ead0aca079a14fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "table2021_06" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "departure_date" TIMESTAMP, "return_date" TIMESTAMP, "departure_station_id" integer, "departure_station_name" character varying(150), "return_station_id" integer, "return_station_name" character varying(150), "distance_meter" double precision, "duration_sec" double precision, CONSTRAINT "CHK_d42141b4558fe2e6671c7dd470" CHECK ("duration_sec" > 10), CONSTRAINT "CHK_b396270d8735be26eaede9ad00" CHECK ("distance_meter" > 10), CONSTRAINT "PK_30e1321a8e059d45e6e69472ccb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "table2021_07" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "departure_date" TIMESTAMP, "return_date" TIMESTAMP, "departure_station_id" integer, "departure_station_name" character varying(150), "return_station_id" integer, "return_station_name" character varying(150), "distance_meter" double precision, "duration_sec" double precision, CONSTRAINT "CHK_343b021721d7123652a945f25b" CHECK ("duration_sec" > 10), CONSTRAINT "CHK_fb22343f4678e2681e81ac2ddb" CHECK ("distance_meter" > 10), CONSTRAINT "PK_8cd1cb5a82ad0f5d703e5e2e40d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hsl_bike_station" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fid" integer, "station_id" integer NOT NULL, "nimi" character varying(150) NOT NULL, "namn" character varying(150), "name" character varying(150), "osoite" character varying NOT NULL, "address" character varying(150), "kaupunki" character varying(150), "stad" character varying(150), "operaattor" character varying(150), "kapasiteet" integer, "longitude" double precision, "latitude" double precision, CONSTRAINT "UQ_1599a7b29db3440e5e95aee95c9" UNIQUE ("station_id"), CONSTRAINT "PK_937236f424dd24a731a1cbcaa3f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hsl_bike_station"`);
        await queryRunner.query(`DROP TABLE "table2021_07"`);
        await queryRunner.query(`DROP TABLE "table2021_06"`);
        await queryRunner.query(`DROP TABLE "table2021_05"`);
    }

}
