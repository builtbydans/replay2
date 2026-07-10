import type { NextFunction, Request, Response } from "express";

import { getDashboardShellData } from "./dashboard.service";

export async function getDashboardShell(
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const dashboard = await getDashboardShellData();

    return response.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    return next(error);
  }
}

