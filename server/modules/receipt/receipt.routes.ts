import { Router } from "express";

import { getReceiptById } from "./receipt.controller";

const router = Router();

router.get("/:id", getReceiptById);

export default router;

