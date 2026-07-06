import { Router } from "express";

import { requireLogin, requireRole } from "../middleware/auth/auth.js";
import { create, update } from "../middleware/validation/transactionValidation.js";  
import {validate} from "../middleware/validation/validate.js";
import {buildTransactions, addTransaction, buildEditTransaction, editTransaction, removeTransaction } from "../controllers/transaction/transactionController.js";

const router = Router();

router.get("/transactions",
    requireLogin,
    requireRole("user"),
    buildTransactions
);

router.post("/transactions",
    requireLogin,
    requireRole("user"),
    create,
    validate("/transactions"),
    addTransaction
);
// GET data that is going to be updated
router.get("/transactions/:transactionId/edit",
    requireLogin,
    requireRole("user"),
    buildEditTransaction
);

// POST add the new transaction update
router.post("/transactions/:transactionId/edit",
    requireLogin,
    requireRole("user"),
    update,
    validate("/transactions"),
    editTransaction
);

router.post("/transactions/:transactionId/delete",
    requireLogin,
    requireRole("user"),
    removeTransaction
);

export default router;