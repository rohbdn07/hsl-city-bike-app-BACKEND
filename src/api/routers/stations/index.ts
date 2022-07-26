/**
 *        @file index.ts
 *     @summary Show lists of stations to this route
 * @description Handles following routes:
 *              - GET  '/stationslist'
 */
import express from "express";
import StationController from "../../controllers/index";
const router = express.Router();

router.get("/stationslist", StationController.showStationList);

export default router;
