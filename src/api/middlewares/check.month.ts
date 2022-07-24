/**
 *        @file check.month.ts
 *     @summary Check month parameter and validate it
 * @description This middleware that checks if month parameter
 * is valid or not and then passes into request body for further process
 * or return back with status code(400)
 *     @middleware - check month middleware
 *   @functions - checkMonthValidation()
 *              - validate()
 */

import { NextFunction, Response } from "express";
import { validate } from "../helpers/validate";

export const checkMonthValidation = (
    req,
    res: Response,
    next: NextFunction
) => {
    const { monthname } = req.params;

    if (!monthname || monthname === "" || !isNaN(monthname)) {
        res.status(400).json({
            success: false,
            message: ` Opps! Entered ${monthname} is not valid input. Please try with correct input.`,
        });
    } else if (monthname) {
        const month = validate(monthname);
        if (month) {
            console.log("the month is:", month);

            req.month = month;
            next();
        } else {
            res.status(400).json({
                success: false,
                message: ` Opps! Entered ${monthname} is not valid input. Please try with correct input.`,
            });
        }
    }
};
