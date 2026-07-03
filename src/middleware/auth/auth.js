function requireLogin(req, res, next) {
    if (!req.session || !req.session.user) {
        req.flash("error", "Please log in to continue.");
        return res.redirect("/login");
    }
    next();
}

function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash("error", "Please log in to continue.");
            return res.redirect("/login");
        }
        if (!allowedRoles.includes(req.session.user.role)) {
            req.flash("error", "You do not have permission to access that page.");
            return res.redirect("/dashboard");
        }
        next();
    };
}

export {requireLogin, requireRole};