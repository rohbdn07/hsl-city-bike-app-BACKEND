/**
 *        @file index.ts
 *     @summary Show lists of stations to this route
 * @description Handles following routes:
 *              - GET  '/stationslist'
 */
import express from "express";
import StationController from "../../controllers/index";
import Middlewares from "../../middlewares";
const router = express.Router();

router.get(
    "/stationslists",
    Middlewares.checkQueryForStationList,
    StationController.showStationList
);

router.get(
    "/stationsinfo/:id/:monthname",
    Middlewares.checkStationIdParams,
    Middlewares.checkMonthValidation,
    StationController.showStationById
);

export default router;
