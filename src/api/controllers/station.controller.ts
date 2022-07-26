/**
 *        @file station.controller.ts
 *     @summary station controller function to show lists of helsinki city bike stations
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - JourneyService
 *   @functions - showStationList()
 *     @returns Express JSON Response
 */

import { Response, Request } from "express";
import StationService from "../../services";

export const showStationList = async (req, res: Response) => {
    console.log("station controller is called");
    try {
        const getData = await StationService.getStationRows();
        res.status(200).json(getData);
    } catch (error) {
        console.log("there is an error", error);
        res.status(400).json({
            error: "unable to get station list of helsinki city bike",
        });
    }
};
