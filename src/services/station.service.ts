/**
 *        @file station.service.ts
 *     @summary Station service to interact with database through TypeoORM
 * @description Define Functions that get station list data(rows) through repository
 *   @functions - getStationRows()
 */

import StationRepository from "../database/repository";
import { IStationQuery } from "../interface/interfaces";

export const getStationRows = async ({ stationid, name, page, count }) => {
    console.log("the count rows", typeof count);
    const pageSize =
        !isNaN(page) && !isNaN(count) ? (page - 1) * count : parseInt("0");
    try {
        const response = await StationRepository.getRowsOfStation({
            pageSize,
            count,
            name,
            stationid,
        });
        if (response?.data.length > 0) {
            const totalRows = response?.totalCounts;
            const hslData = response?.data;
            const counts = count
                ? !isNaN(count)
                    ? totalRows >= count
                        ? count
                        : totalRows
                    : parseInt("0")
                : undefined;
            return {
                success: true,
                message: "successfully got the data from database",
                data: {
                    totalRows,
                    counts,
                    hslData,
                },
            };
        } else {
            return {
                success: false,
                message: "No data found with that search or params",
            };
        }
    } catch (error) {
        return {
            success: false,
            message:
                "Oppps! Something went wrong...Please check params values.",
        };
    }
};
