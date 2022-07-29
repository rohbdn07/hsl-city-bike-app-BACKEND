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

    if ((name || page || count || stationid) !== undefined) {
        req.stationName = name;
        req.page = page;
        req.count = count;
        req.stationid = stationid;
        next();
    } else {
        res.status(400).json({
            success: false,
            message: `Please enter required queries either name, page, count or stationid.`,
        });
    }
};

export const checkStationIdParams = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        res.status(400).json({
            success: false,
            message: `Opps! Entered ${id} params is not valid number. Please try with valid one`,
        });
    } else {
        req.id = parseInt(id);
        next();
    }
};
