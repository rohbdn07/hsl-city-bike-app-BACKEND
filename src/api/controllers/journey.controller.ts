/**
 *        @file journey.controller.ts
 *     @summary Journey controller function to show lists of helsinki city bike journey
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - JourneyService
 *   @functions - showJourneyList()
 *     @returns Express JSON Response
 */

import { Response, Request } from "express";
import JourneyService from "../../services";

export const showJourneyList = async (req, res: Response) => {
    const { month, searchQuery, page, count } = req;
    try {
        const getData = await JourneyService.getRows({
            month,
            searchQuery,
            page,
            count,
        });
        res.status(200).json(getData);
    } catch (error) {
        console.log("there is an error", error);
        res.status(400).json({
            error: "unable to get list of helsinki city bike journey lists",
        });
    }
};
