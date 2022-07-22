/**
 *        @file journey_service.ts
 *     @summary Journey service to interact with database through TypeoORM
 * @description Define Functions that perform CRUD operations
 *   @functions - getRows
 */

import { GetRowsOfTheMonthProps } from "../interface/interfaces";
import JourneyRepository from "../database/repository/index";

export const getRows = async ({
    month,
    searchQuery,
}: GetRowsOfTheMonthProps) => {
    try {
        const response = await JourneyRepository.getRowsOfTheMonth({
            month,
            searchQuery,
        });
        if (response?.hslData.length > 0) {
            const hslData = response?.hslData;
            const totalCount = response?.count;
            const monthName = response?.monthName;
            return {
                success: true,
                message: "successfully got the data from database",
                data: {
                    monthName,
                    totalCount,
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
