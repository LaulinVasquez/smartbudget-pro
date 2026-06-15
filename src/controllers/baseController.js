export function buildHome(req, res) {
    res.render("index", {
        title: "Home"
    });
};

export function buildAbout(req,res) {
    res.render("about", {
        title: "About"
    });
};