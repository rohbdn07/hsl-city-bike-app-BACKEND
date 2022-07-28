import { ILike } from "typeorm";
import { IStationQuery } from "../../interface/interfaces";
import { bike_station } from "../entity/hsl_bike_station.entity";

/**
 * @file station.repo.ts
 * @returns collection of data(rows), total number of rows(count)
 */
export const getRowsOfStation = async (props: IStationQuery) => {
    const numberOfRowsToDisplay = props.count;
    try {
        const [list, count] = await bike_station.findAndCount({
            select: {
                id: true,
                station_id: true,
                name: true,
                address: true,
                kaupunki: true,
                operaattor: true,
                kapasiteet: true,
            },
            where:
                props.name || props.stationid
                    ? [
                          { name: ILike(`%${props.name}`) },
                          { station_id: props.stationid },
                      ]
                    : {},
            skip: props.pageSize,
            take: numberOfRowsToDisplay,
        });
        return {
            data: list,
            totalCounts: count,
        };
    } catch (error) {
        console.log("the error", error);
        throw new Error();
    }
};
