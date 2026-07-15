import { createTransaction, getTransactionsByUser, getTransactionById, updateTransaction, deleteTransaction } from "../../models/transaction/transactionModel.js";
import { getAllCategories } from "../../models/category/categoryModel.js";

async function buildTransactions(req, res, next) {
    try {
        const userId = req.session.user.userId;

        const transactions = await getTransactionsByUser(userId);
        const categories = await getAllCategories();

        res.render("transaction/index", {
            title: "Transactions",
            transactions,
            categories,
        });
    } catch (error) {
        next(error);
    }
}

async function addTransaction(req, res, next) {
    try {
        const userId = req.session.user.userId;

        await createTransaction({
            userId,
            categoryId: req.body.categoryId,
            amount: req.body.amount,
            transactionType: req.body.transactionType,
            description: req.body.description,
            transactionDate: req.body.transactionDate,
        });
        req.flash("success", "Transaction added successfully.");
        return res.redirect("/transaction");
    } catch (error) {
        next(error);
    }
}

async function buildEditTransaction(req, res, next) {
    try {
        const userId = req.session.user.userId;
        const transactionId = req.params.transactionId;
        const transaction = await getTransactionById(transactionId, userId);
        const categories = await getAllcategories();

        if (!transaction) {
            req.flash("error", "Transaction not found.");
            return res.redirect("/transaction");
        }
        res.render("transaction/edit", {
            title: "Edit Transaction",
            transaction,
            categories,
        });
    } catch (error) {
        next(error);
    }
}

async function editTransaction(req, res, next) {
    try {
        const userId = req.session.user.userId;
        const transactionId = req.params.transactionId;

        const updatedTransaction = await updateTransaction(
            transactionId,
            userId,
            {
                categoryId: req.body.categoryId,
                amount: req.body.amount,
                transactionType: req.body.transactionType,
                description: req.body.description,
                transactionDate: req.body.transactionDate,
            }
        );
        if (!updatedTransaction) {
            req.flash("error", "Transaction not found.");
            return res.redirect("/transaction");
        }

        req.flash("success", "Transaction updated successfully.");
        return res.redirect("/transaction");
    } catch (error) {
        next(error);
    }
}

async function removeTransaction(req, res, next) {
    try {
        const userId = req.session.user.userId;
        const transactionId = req.params.transactionId;

        const transactionDeleted = await deleteTransaction(transactionId, userId);

        if (!transactionDeleted) {
            req.flash("error", "Transaction not found.");
            return res.redirect("/transaction");
        }
        req.flash("success", "Transaction deleted successfully.");
        return res.redirect("/transaction");
    } catch (error) {
        next(error);
    }
};

export { buildTransactions, addTransaction, buildEditTransaction, editTransaction, removeTransaction};