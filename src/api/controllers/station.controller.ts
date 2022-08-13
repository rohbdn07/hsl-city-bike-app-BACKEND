/**
 *        @file station.controller.ts
 *     @summary station controller function to show lists of helsinki city bike stations
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - JourneyService
 *   @functions - showStationList()
 *              - showStationById()
 *     @returns Express JSON Response
 */

import { Response, Request } from "express";
import StationService from "../../services";

export const showStationList = async (req, res: Response) => {
    const { stationid, stationName, page, count } = req;

    try {
        const getData = await StationService.getStationRows({
            stationid,
            stationName,
            page,
            count,
        });
        res.status(200).json(getData);
    } catch (error) {
        console.log("there is an error", error);
        res.status(400).json({
            error: "unable to get station list of helsinki city bike",
        });
    }
};

// get data by station id
export const showStationById = async (req, res: Response) => {
    const { month, id } = req;
    try {
        const getData = await StationService.getInfoById(month, id);
        res.status(200).json(getData);
    } catch (error) {
        res.status(400).json({
            error: "unable to get station info by station id",
        });
    }
};
