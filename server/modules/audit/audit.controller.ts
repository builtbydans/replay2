import type { NextFunction, Request, Response } from "express";

import { getAuditShellForEncounter } from "./audit.service";

export async function getAuditEventsForEncounter(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const events = await getAuditShellForEncounter(
      String(request.params.encounterId),
    );

    return response.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    return next(error);
  }
}
