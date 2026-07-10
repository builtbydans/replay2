import cors from "cors";
import express from "express";

import { API_PREFIX } from "./config/api";
import { errorHandler } from "./middleware/error-handler";
import aiRunRoutes from "./modules/ai-run/ai-run.routes";
import auditRoutes from "./modules/audit/audit.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import decisionRoutes from "./modules/decision/decision.routes";
import encounterRoutes from "./modules/encounter/encounter.routes";
import patientRoutes from "./modules/patient/patient.routes";
import receiptRoutes from "./modules/receipt/receipt.routes";
import recommendationRoutes from "./modules/recommendation/recommendation.routes";
import replayRoutes from "./modules/replay/replay.routes";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.status(200).json({
      success: true,
      data: {
        service: "Replay API shell",
        status: "ok",
      },
    });
  });

  app.use(`${API_PREFIX}/dashboard`, dashboardRoutes);
  app.use(`${API_PREFIX}/patients`, patientRoutes);
  app.use(`${API_PREFIX}/encounters`, encounterRoutes);
  app.use(`${API_PREFIX}/recommendations`, recommendationRoutes);
  app.use(`${API_PREFIX}/decisions`, decisionRoutes);
  app.use(`${API_PREFIX}/replays`, replayRoutes);
  app.use(`${API_PREFIX}/ai-runs`, aiRunRoutes);
  app.use(`${API_PREFIX}/receipts`, receiptRoutes);
  app.use(`${API_PREFIX}/audit`, auditRoutes);

  app.use(errorHandler);

  return app;
}

const app = createApp();

export default app;

