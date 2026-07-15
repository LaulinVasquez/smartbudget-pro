import { createBudget, getBudgetsByUser, getBudgetById, updateBudget, deleteBudget } from "../../models/budgets/budgetModel.js";
import { getAllCategories } from "../../models/category/categoryModel.js";

async function buildBudgets(req,res,next) {
    try{
        const userId = req.session.user.userId;
        const budget = await getBudgetsByUser(userId);
        const categories = await getAllCategories();

        return res.render("budget/index", {
            title: "Budgets",
            budget,
            categories,
        });
    } catch(error){
        next(error)
    }
}

async function addBudget(req,res,next) {
    try {
        const userId = req.session.user.userId;

        await createBudget({
            userId,
            categoryId: req.body.categoryId,
            month: req.body.month,
            year: req.body.year,
            amount: req.body.amount,
        });
        req.flash("success", "Budget crated successfully.")
        return res.redirect("budget");
    } catch(error){
        next(error);
    }
    
}

async function buildEditBudget(req,res,next){
    try {
        const userId = req.session.user.userId;
        const budgetId = req.params.budgetId;

        const budget = await getBudgetById(budgetId, userId);
        const categories = await getAllcategories();

        if (!budget) {
            req.flash("error", "Budget not found.")
            return res.redirect("/budget");
        }
        
        return res.render("budget/edit", {
            title: "Edit Budget",
            budget,
            categories,
        });
    } catch (error){
        next(error);
    }
}

async function editBudget(req, res, next) {
  try {
    const userId = req.session.user.userId;
    const budgetId = req.params.budgetId;

    const updatedBudget = await updateBudget(
      budgetId,
      userId,
      {
        categoryId: req.body.categoryId,
        month: req.body.month,
        year: req.body.year,
        amount: req.body.amount,
      },
    );

    if (!updatedBudget) {
      req.flash("error", "Budget not found.");
      return res.redirect("/budget");
    }

    req.flash("success", "Budget updated successfully.");
    return res.redirect("/budget");
  } catch (error) {
    next(error);
  }
}

async function removeBudget(req, res, next) {
  try {
    const userId = req.session.user.userId;
    const budgetId = req.params.budgetId;

    const deletedBudget = await deleteBudget(budgetId, userId);

    if (!deletedBudget) {
      req.flash("error", "Budget not found.");
      return res.redirect("/budget");
    }

    req.flash("success", "Budget deleted successfully.");
    return res.redirect("/budget");
  } catch (error) {
    next(error);
  }
}

export {buildBudgets, addBudget, buildEditBudget, editBudget, removeBudget};