import { GetRowsOfTheMonthProps } from "../../interface/interfaces";
import { table_2021_05 } from "../entity/2021_05_hsl_entity";
import { table_2021_06 } from "../entity/2021_06_hsl_entity";
import { table_2021_07 } from "../entity/2021_07_hsl_entity";

/**
 * @file  journey.repo.ts
 * @param monthName name of the month by which we can get respective month's data collection
 * @returns collection of data including its total counts and name of month
 */
export const getRowsOfTheMonth = async ({
    month,
    searchQuery,
}: GetRowsOfTheMonthProps) => {
    console.log("REPO: this is for all journey rows", month);
    try {
        // Get all journey rows by search query name
        async function getJourneyRowsByStationName(tableName, stationName) {
            return await tableName
                .createQueryBuilder("journey")
                .where(
                    "(journey.return_station_name Ilike :returnStationName OR journey.departure_station_name Ilike :departureStationName)"
                )
                .skip(0)
                .take(20)
                .setParameters({
                    returnStationName: `%${stationName}%`,
                    departureStationName: `%${stationName}%`,
                })
                .getMany();
        }

        function returnDataWithCountAndMonth(data, month) {
            let hslData;
            let count;
            const monthName = month;
            if (searchQuery) {
                return {
                    hslData: data,
                    monthName,
                    count: data?.length,
                };
            }
            const totalCount = data ? data.pop() : undefined;
            hslData = data.shift();
            count = totalCount;
            return {
                hslData,
                count,
                monthName,
            };
        }

        switch (month) {
            case "may":
                const hslData1 = !searchQuery
                    ? await table_2021_05.findAndCount({
                          take: 20,
                          skip: 0,
                      })
                    : await getJourneyRowsByStationName(
                          table_2021_05,
                          searchQuery
                      );
                const data1 = returnDataWithCountAndMonth(hslData1, month);

                return data1;

                break;
            case "june":
                const hslData2 = !searchQuery
                    ? await table_2021_06.findAndCount()
                    : await getJourneyRowsByStationName(
                          table_2021_06,
                          searchQuery
                      );
                const data2 = returnDataWithCountAndMonth(hslData2, month);
                return data2;

                break;
            case "july":
                const hslData3 = !searchQuery
                    ? await table_2021_07.findAndCount()
                    : await getJourneyRowsByStationName(
                          table_2021_07,
                          searchQuery
                      );
                const data3 = returnDataWithCountAndMonth(hslData3, month);
                return data3;
                break;

            default:
                throw new Error();
                break;
        }
    } catch (error) {
        console.log("the error", error);
    }
};
