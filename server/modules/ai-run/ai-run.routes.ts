import { Router } from "express";

import { getAiRunById } from "./ai-run.controller";

const router = Router();

router.get("/:id", getAiRunById);

export default router;

