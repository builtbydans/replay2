import { Router } from "express";

import {
  createRecommendation,
  getRecommendations,
} from "./recommendation.controller";

const router = Router();

router.get("/", getRecommendations);
router.post("/", createRecommendation);

export default router;

