import { Router } from "express";

import { getEncounterById } from "./encounter.controller";

const router = Router();

router.get("/:id", getEncounterById);

export default router;

