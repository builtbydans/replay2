import type { NextFunction, Request, Response } from "express";

import { createDecisionShell } from "./decision.service";

export async function createDecision(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const decision = await createDecisionShell(request.body);

    return response.status(201).json({
      success: true,
      data: decision,
    });
  } catch (error) {
    return next(error);
  }
}

