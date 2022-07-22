/**
 *        @file index.ts
 *     @summary Show lists of rows of data through routes
 * @description Handles following routes:
 *              - GET  '/journeylist/month/:monthname'
 */
import express from "express";
import JourneyController from "../../controllers";
import CheckMiddleware from "../../middlewares/index";
const router = express.Router();

router.get(
    "/journeylist/month/:monthname",
    CheckMiddleware.checkMonthValidation,
    CheckMiddleware.checkSearchQuery,
    JourneyController.showJourneyList
);

export default router;
