import { Router } from "express";

import { requireLogin, requireRole } from "../middleware/auth/auth.js";
import { create, update } from "../middleware/validation/transactionValidation.js";  
import validate from "../middleware/validation/validate.js";
import {buildTransactions, addTransaction, buildEditTransaction, editTransaction, removeTransaction } from "../controllers/transaction/transactionController.js";

const router = Router();

router.get("/transaction",
    requireLogin,
    requireRole("user"),
    buildTransactions
);

router.post("/transaction",
    requireLogin,
    requireRole("user"),
    create,
    validate("/transaction"),
    addTransaction
);
// GET data that is going to be updated
router.get("/transaction/:transactionId/edit",
    requireLogin,
    requireRole("user"),
    buildEditTransaction
);

// POST add the new transaction update
router.post("/transaction/:transactionId/edit",
    requireLogin,
    requireRole("user"),
    update,
    validate("/transaction"),
    editTransaction
);

router.post("/transaction/:transactionId/delete",
    requireLogin,
    requireRole("user"),
    removeTransaction
);

export default router;