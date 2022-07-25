/**
 *        @file journey_service.ts
 *     @summary Journey service to interact with database through TypeoORM
 * @description Define Functions that get data(rows) through repository
 *   @functions - getRows()
 */

import { GetRowsOfTheMonthProps } from "../interface/interfaces";
import JourneyRepository from "../database/repository/index";

export const getRows = async ({ month, searchQuery, page, count }) => {
    const pageSize =
        !isNaN(page) && !isNaN(count) ? (page - 1) * count : parseInt("0");
    try {
        // get data through respository from database
        const response = await JourneyRepository.getRowsOfTheMonth({
            month,
            searchQuery,
            pageSize,
            count,
        });
        if (response?.list.length > 0) {
            const hslData = response?.list;
            const totalRows = response?.count;
            const monthName = response?.month;
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
                    monthName,
                    counts,
                    totalRows,
                    hslData,
                },
            };
        } else {
            return {
                success: false,
                message: "Cannot find the data with that query and parameter",
            };
        }
    } catch (error) {
        console.log("the error", error);
        return {
            success: false,
            message:
                "Oppps! Something went wrong...Please check params values.",
        };
    }
};
