import type { NextFunction, Request, Response } from "express";

import { getPatientShellById, getPatientShellList } from "./patient.service";

export async function getPatients(
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const patients = await getPatientShellList();

    return response.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getPatientById(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const patient = await getPatientShellById(String(request.params.id));

    return response.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    return next(error);
  }
}
