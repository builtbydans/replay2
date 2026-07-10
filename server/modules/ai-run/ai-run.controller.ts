import type { NextFunction, Request, Response } from "express";

import { getAiRunShellById } from "./ai-run.service";

export async function getAiRunById(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const aiRun = await getAiRunShellById(String(request.params.id));

    return response.status(200).json({
      success: true,
      data: aiRun,
    });
  } catch (error) {
    return next(error);
  }
}
