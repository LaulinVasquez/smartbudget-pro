// contains static pages

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

// Error test

export const testErrorPage = (req, res, next) => {
  const err = new Error("Work as expected! (This is a test error)");
  err.status = 500;
  next(err);
};