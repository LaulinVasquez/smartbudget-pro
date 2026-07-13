import { createGoal, getGoalsByUser, getGoalById, updateGoal, deleteGoal, addGoalContribution } from "../../models/goal/goalModel.js";

async function buildGoals(req,res,next) {
    try{
        const userId = req.session.user.userId;
        const goals = await getGoalsByUser(userId);

        return res.render("goal/index", {
            title: "Goals",
            goals,
        });
    } catch (error) {
        next(error)
    }
};

async function addGoal(req, res, next) {
  try {
    const userId = req.session.user.userId;

    await createGoal({
      userId,
      name: req.body.name,
      description: req.body.description,
      targetAmount: req.body.targetAmount,
      targetDate: req.body.targetDate,
      status: "active",
    });

    req.flash("success", "Goal created successfully.");
    return res.redirect("/goal");
  } catch (error) {
    next(error);
  }
}

async function buildEditGoal(req, res, next) {
  try {
    const userId = req.session.user.userId;
    const goalId = req.params.goalId;

    const goal = await getGoalById(goalId, userId);

    if (!goal) {
      req.flash("error", "Goal not found.");
      return res.redirect("/goal");
    }

    return res.render("goal/edit", {
      title: "Edit Goal",
      goal,
    });
  } catch (error) {
    next(error);
  }
}

async function editGoal(req, res, next) {
  try {
    const userId = req.session.user.userId;
    const goalId = req.params.goalId;

    const updatedGoal = await updateGoal(goalId, userId, {
      name: req.body.name,
      description: req.body.description,
      targetAmount: req.body.targetAmount,
      targetDate: req.body.targetDate,
      status: req.body.status,
    });

    if (!updatedGoal) {
      req.flash("error", "Goal not found.");
      return res.redirect("/goal");
    }

    req.flash("success", "Goal updated successfully.");
    return res.redirect("/goal");
  } catch (error) {
    next(error);
  }
}

async function removeGoal(req, res, next) {
  try {
    const userId = req.session.user.userId;
    const goalId = req.params.goalId;

    const deletedGoal = await deleteGoal(goalId, userId);

    if (!deletedGoal) {
      req.flash("error", "Goal not found.");
      return res.redirect("/goal");
    }

    req.flash("success", "Goal deleted successfully.");
    return res.redirect("/goal");
  } catch (error) {
    next(error);
  }
}

async function contributeToGoal(req, res, next) {
  try {
    const userId = req.session.user.userId;
    const goalId = req.params.goalId;

    const goal = await getGoalById(goalId, userId);

    if (!goal) {
      req.flash("error", "Goal not found.");
      return res.redirect("/goal");
    }

    await addGoalContribution({
      goalId,
      amount: req.body.amount,
      note: req.body.note,
    });

    req.flash("success", "Contribution added successfully.");
    return res.redirect("/goal");
  } catch (error) {
    next(error);
  }
}


export { buildGoals, addGoal, buildEditGoal, editGoal, removeGoal, contributeToGoal };