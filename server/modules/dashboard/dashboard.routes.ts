import { Router } from "express";

import { getDashboardShell } from "./dashboard.controller";

const router = Router();

router.get("/", getDashboardShell);

export default router;

