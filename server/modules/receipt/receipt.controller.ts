import type { NextFunction, Request, Response } from "express";

import { getReceiptShellById } from "./receipt.service";

export async function getReceiptById(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const receipt = await getReceiptShellById(String(request.params.id));

    return response.status(200).json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    return next(error);
  }
}
