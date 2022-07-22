/**
 *        @file check.name.ts
 *     @summary Check journey name and validate it
 * @description This middleware that checks if search query string(departure station name or return station name)
 * is valid or not and then passes into request body
 *     @middleware - check queries middleware
 *   @functions - checkSearchQuery()
 *              - checkName()
 */

import { NextFunction, Response } from "express";

export const checkSearchQuery = (req, res: Response, next: NextFunction) => {
    const { search } = req.query;
    // const lowerCaseTextWithFirstLetterCapital = checkName(search);
    console.log("the Search name is", search);
    if (search || search !== undefined) {
        req.searchQuery = search;
        next();
    } else {
        res.status(400).json({
            success: false,
            message: ` Opps! Entered query is not valid input. Please try with correct input.`,
        });
    }
};
