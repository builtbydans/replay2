import type { NextFunction, Request, Response } from "express";

import {
  createRecommendationShell,
  getRecommendationShellList,
} from "./recommendation.service";

export async function getRecommendations(
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const recommendations = await getRecommendationShellList();

    return response.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    return next(error);
  }
}

export async function createRecommendation(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const recommendation = await createRecommendationShell(request.body);

    return response.status(201).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    return next(error);
  }
}

