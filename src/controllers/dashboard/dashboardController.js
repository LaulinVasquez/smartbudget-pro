import { getDashboardSummary,getRecentTransactions,getBudgetProgress } from "../../models/dashboard/dashboardModel.js";

async function buildUserDashboard(req, res, next) {
  try {
    const userId = req.session.user.userId;

    const [
      summary,
      transactions,
      budgetProgress,
    ] = await Promise.all([
      getDashboardSummary(userId),
      getRecentTransactions(userId),
      getBudgetProgress(userId),
    ]);

    return res.render("dashboard/user", {
      title: "Dashboard",
      user: req.session.user,
      summary,
      transactions,
      budgetProgress,
    });
  } catch (error) {
    next(error);
  }
}

export { buildUserDashboard };
