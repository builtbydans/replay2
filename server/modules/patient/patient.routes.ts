import { Router } from "express";

import { getPatientById, getPatients } from "./patient.controller";

const router = Router();

router.get("/", getPatients);
router.get("/:id", getPatientById);

export default router;

