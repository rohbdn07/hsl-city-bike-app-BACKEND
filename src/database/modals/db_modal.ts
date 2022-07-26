import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

// it is a parent table(modal) which is in use by other extended class(entities)
export abstract class Db_modal_table extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "timestamp without time zone", nullable: true })
    departure_date: Date;

    @Column({ type: "timestamp without time zone", nullable: true })
    return_date: Date;

    @Column({ type: "int", nullable: true })
    departure_station_id: number;

    @Column({ type: "varchar", length: 150, unique: false, nullable: true })
    departure_station_name: string;

    @Column({ type: "int", nullable: true })
    return_station_id: number;

    @Column({ type: "varchar", length: 150, unique: false, nullable: true })
    return_station_name: string;

    @Column({ type: "float", nullable: true })
    distance_meter: number;

    @Column({ type: "float", nullable: true })
    duration_sec: number;

    toJSON() {
        this["distance_km"] = this.distance_meter;
        this["duration_min"] = this.duration_sec;
        return {
            ...this,
            distance_km: parseFloat((this.distance_meter / 1000).toFixed(2)), // convert value(meter) to kilometer
            duration_min: parseFloat((this.duration_sec / 60).toFixed(2)), // convert value (sec) to minutes
            // all below properties are convert to undefined
            // so that we won't see (not needed) these in our JSON response to client
            distance_meter: undefined,
            duration_sec: undefined,
        };
    }
}
