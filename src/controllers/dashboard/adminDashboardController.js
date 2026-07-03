function buildAdminDashboard(req,res) {
    res.render("dashboard/user", {
        title: "Admin Dashboard",
        user: req.session.user,
    });
};

export {buildAdminDashboard};