/**
 *        @file station.service.ts
 *     @summary Station service to interact with database through TypeoORM
 * @description Define Functions that get station list data(rows) through repository
 *   @functions - getStationRows()
 */

import StationRepository from "../database/repository";

export const getStationRows = async () => {
    console.log("station service is called");
    try {
        const response = await StationRepository.getRowsOfStation();
        if (response?.data.length > 0) {
            const totalCounts = response?.totalCounts;
            const hslData = response?.data;
            return {
                success: true,
                message: "successfully got the data from database",
                data: {
                    totalCounts,
                    hslData,
                },
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
