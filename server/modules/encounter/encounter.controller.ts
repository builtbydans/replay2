import type { NextFunction, Request, Response } from "express";

import { getEncounterShellById } from "./encounter.service";

export async function getEncounterById(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const encounter = await getEncounterShellById(String(request.params.id));

    return response.status(200).json({
      success: true,
      data: encounter,
    });
  } catch (error) {
    return next(error);
  }
}
