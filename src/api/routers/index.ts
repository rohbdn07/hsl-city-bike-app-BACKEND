import { Router } from "express";

import journeyList from "./journey/index";
import stationsList from "./stations/index";

const router = Router();

router.use(journeyList);
router.use(stationsList);

export default router;
