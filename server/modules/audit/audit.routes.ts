import { Router } from "express";

import { getAuditEventsForEncounter } from "./audit.controller";

const router = Router();

router.get("/encounters/:encounterId", getAuditEventsForEncounter);

export default router;

