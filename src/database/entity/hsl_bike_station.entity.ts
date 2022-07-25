import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("hsl_bike_station")
export class bike_station extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "int", nullable: true })
    fid: number;

    @Column({ type: "int", unique: true, nullable: false })
    station_id: number;

    @Column({ type: "varchar", length: 150, unique: false, nullable: false })
    nimi: string;

    @Column({ type: "varchar", length: 150, unique: false, nullable: true })
    namn: string;

    @Column({ type: "varchar", length: 150, unique: false, nullable: true })
    name: string;

    @Column({ type: "varchar", unique: false, nullable: false })
    osoite: string;

    @Column({ type: "varchar", length: 150, unique: false, nullable: true })
    address: string;

    @Column({ type: "varchar", length: 150, unique: false, nullable: true })
    kaupunki: string;

    @Column({ type: "varchar", length: 150, unique: false, nullable: true })
    stad: string;

    @Column({ type: "varchar", length: 150, unique: false, nullable: true })
    operaattor: string;

    @Column({ type: "int", nullable: true })
    kapasiteet: number;

    @Column({ type: "float", nullable: true })
    longitude: number;

    @Column({ type: "float", nullable: true })
    latitude: number;
}
