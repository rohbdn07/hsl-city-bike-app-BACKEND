import { ILike } from "typeorm";
import { IStationQuery } from "../../interface/interfaces";
import { table_2021_05 } from "../entity/2021_05_hsl_entity";
import { table_2021_06 } from "../entity/2021_06_hsl_entity";
import { table_2021_07 } from "../entity/2021_07_hsl_entity";
import { bike_station } from "../entity/hsl_bike_station.entity";

/**
 * @file station.repo.ts
 * @returns collection of data(rows), total number of rows(count), month name
 * to station service
 */
export const getRowsOfStation = async (props: IStationQuery) => {
    // const numberOfRowsToDisplay = props.count;

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
                props.stationName || props.stationid
                    ? [
                          { name: ILike(`%${props.stationName}%`) },
                          { station_id: props.stationid },
                      ]
                    : {},
            skip: props.pageSize ? props.pageSize : 0,
            take: props.count ? props.count : 0,
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

// get rows by station id along with month
export const getRowsOfStationByIdAndMonth = async (month, id) => {
    let hslData;
    try {
        switch (month) {
            case "may":
                hslData = await search(
                    table_2021_05, // name of table
                    month,
                    id
                );
                return hslData;
                break;
            case "june":
                hslData = await search(
                    table_2021_06, // name of table
                    month,
                    id
                );
                return hslData;
                break;
            case "july":
                hslData = await search(
                    table_2021_07, // name of table
                    month,
                    id
                );
                return hslData;
                break;
            default:
                throw new Error();
                break;
        }
    } catch (error) {
        console.log("the error", error);
        throw new Error("Something went wrong!!!");
    }
};

const search = async (tableName, month, id) => {
    // find data(rows) from postgreSQL database tables
    const [list, count] = await tableName.findAndCount({
        select: {
            id: true,
            departure_station_name: true,
            departure_station_id: true,
            return_station_name: true,
            return_station_id: true,
            distance_meter: true,
            duration_sec: true,
        },
        where: id
            ? [
                  { departure_station_id: `${id}` },
                  {
                      return_station_id: `${id}`,
                  },
              ]
            : {},
    });

    return {
        data: list,
        totalCounts: count,
        month,
    };
};
