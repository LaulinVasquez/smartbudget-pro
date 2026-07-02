function buildUserDashboard(req,res) {
    res.render("dashboard/user", {
        title: "Dashboard"
    });
};
function buildAdvisorDashboard(req,res) {
    res.render("dashboard/user", {
        title: "Advisor Dashboard"
    });
};
function buildAdminDashboard(req,res) {
    res.render("dashboard/user", {
        title: "Admin Dashboard"
    });
};

export {buildUserDashboard, buildAdvisorDashboard, buildAdminDashboard};