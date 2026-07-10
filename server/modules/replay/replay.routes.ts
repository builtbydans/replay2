import { Router } from "express";

import { getReplayById, getReplays } from "./replay.controller";

const router = Router();

router.get("/", getReplays);
router.get("/:id", getReplayById);

export default router;

