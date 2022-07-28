/**
 *        @file check.name.ts
 *     @summary Check journey name and validate it
 * @description This middleware that checks if search query string(departure station name or return station name)
 * is valid or not and then passes into request body
 *     @middleware - check queries middleware
 *   @functions - checkSearchQuery()
 *              - checkName()
 */

import { NextFunction, Response, Request } from "express";
import { checkPageAndCountValue, validate } from "../helpers/validate";

export const checkSearchQuery = (req, res: Response, next: NextFunction) => {
    const { search } = req.query;
    const { monthname } = req.params;
    console.log("the Search name is", search);
    if (validate(monthname) || search) {
        checkPageAndCountValue(req);
        req.searchQuery = search;
        next();
    } else {
        res.status(400).json({
            success: false,
            message: `Opps! Entered query is not valid input. Please try with correct input.`,
        });
    }
};

export const checkQueryForStationList = (req, res, next) => {
    const { name, page, count, stationid } = req.query;
    console.log("the station id is", count);

    if ((name || page || count || stationid) !== undefined) {
        req.name = name;
        req.page = page;
        req.count = count;
        req.stationid = stationid;
        next();
    } else {
        res.status(400).json({
            success: false,
            message: `Opps! Entered query is not valid input. Please try with correct input.`,
        });
    }
};
