import type { NextFunction, Request, Response } from "express";

import { getReplayShellById, getReplayShellList } from "./replay.service";

export async function getReplays(
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const replays = await getReplayShellList();

    return response.status(200).json({
      success: true,
      data: replays,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getReplayById(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const replay = await getReplayShellById(String(request.params.id));

    return response.status(200).json({
      success: true,
      data: replay,
    });
  } catch (error) {
    return next(error);
  }
}
