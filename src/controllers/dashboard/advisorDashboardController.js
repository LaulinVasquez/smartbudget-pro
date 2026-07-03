function buildAdvisorDashboard(req,res) {
    res.render("dashboard/user", {
        title: "Advisor Dashboard",
        user: req.session.user,
    });
};

export {buildAdvisorDashboard};