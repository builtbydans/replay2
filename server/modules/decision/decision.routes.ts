import { Router } from "express";

import { createDecision } from "./decision.controller";

const router = Router();

router.post("/", createDecision);

export default router;

