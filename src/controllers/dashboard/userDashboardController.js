function buildUserDashboard(req, res) {
  res.render("dashboard/user", {
    title: "Dashboard",
    user: req.session.user,
  });
}

export { buildUserDashboard };
