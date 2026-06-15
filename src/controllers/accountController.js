export function buildLogin(req, res) {
    res.render("account/login", {
        title: "Login"
    });
}

export function buildRegister(req,res) {
    res.render("account/register", {
        title: "Register"
    });
}