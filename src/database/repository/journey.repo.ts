import { GetRowsOfTheMonthProps } from "../../interface/interfaces";
import { table_2021_05 } from "../entity/2021_05_hsl_entity";
import { table_2021_06 } from "../entity/2021_06_hsl_entity";
import { table_2021_07 } from "../entity/2021_07_hsl_entity";
import { ILike } from "typeorm";

/**
 * @file journey.repo.ts
 * @param month name of the month
 * @param searchQuery keyword to search
 * @param pageSize skip values
 * @param count no. of rows to display in a single page
 * @returns collection of data(rows), total number of rows(count), month
 */
export const getRowsOfTheMonth = async ({
    month,
    searchQuery,
    pageSize,
    count,
}: GetRowsOfTheMonthProps) => {
    let hslData;
    try {
        switch (month) {
            case "may":
                hslData = await search(
                    table_2021_05, // name of table
                    month,
                    searchQuery,
                    pageSize,
                    count
                );
                return hslData;
                break;
            case "june":
                hslData = await search(
                    table_2021_06, // name of table
                    month,
                    searchQuery,
                    pageSize,
                    count
                );
                return hslData;
                break;
            case "july":
                hslData = await search(
                    table_2021_07, // name of table
                    month,
                    searchQuery,
                    pageSize,
                    count
                );
                return hslData;
                break;
            default:
                throw new Error();
                break;
        }
    } catch (error) {
        console.log("the error", error);
    }
};

const search = async (
    tableName,
    month,
    searchQuery,
    pageSize,
    numberOfRowsToDisplay
) => {
    // find data(rows) from postgreSQL database tables
    const [list, count] = await tableName.findAndCount({
        select: {
            id: true,
            departure_station_name: true,
            return_station_name: true,
            distance_meter: true,
            duration_sec: true,
        },
        where: searchQuery
            ? [
                  { departure_station_name: ILike(`%${searchQuery}%`) },
                  {
                      return_station_name: ILike(`%${searchQuery}%`),
                  },
              ]
            : {},
        skip: pageSize,
        take: numberOfRowsToDisplay,
    });

    return {
        list,
        count,
        month,
    };
};
