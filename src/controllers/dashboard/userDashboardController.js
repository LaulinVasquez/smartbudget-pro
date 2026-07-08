import { getDashboardSummary,getRecentTransactions } from "../../models/dashboard/dashboardModel.js";

async function buildUserDashboard(req, res, next) {
  try {
    const userId = req.session.user.userId;
    
    const summary = await getDashboardSummary(userId);
    const transactions = await getRecentTransactions(userId);
    
    res.render("dashboard/user", {
      title: "Dashboard",
      user: req.session.user,
      summary,
      transactions
    });
  } catch (error) {
    next(error);
  }
}

export { buildUserDashboard };
