const setHeadAssetsFunctionality = (res) => {
  res.locals.styles = [];
  res.locals.scripts = [];

  res.addStyles = (css, priority = 0) =>{
    res.locals.styles.push({ content: css, priority });
  };
  res.addScripts = (js, priority = 0) => {
    res.locals.scripts.push({content: js, priority});
  };

  res.locals.renderStyles = () => {
    return (
        res.locals.styles
        // Sort css by priority: higher numbers load first
        .sort((a, b) => b.priority - a.priority)
        .map((item) => item.content)
        .join("\n")
    );
  };

  res.locals.renderScripts = () => {
    return (
      res.locals.scripts    
      // Sort scripts by priority: higher numbers load first
        .sort((a, b) => b.priority - a.priority)
        .map((item) => item.content)
        .join("\n")
    )
  }
};

// This is where we add all local variables that we want to make available in all templates
const addLocalVariables = (req, res, next) => {
  setHeadAssetsFunctionality(res);
  res.addScripts('<script src="/js/flash.js" defer></script>', 10);
  res.addStyles('<link rel="stylesheet" href="/css/styles.css">', 10);

  // Logged-in state
  res.locals.isLoggedIn = false;
  // Current authenticated user (null if not logged in)
  res.locals.user = null;
  if (req.session && req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
  }
  // Make NODE_ENV available to all templates
  res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";
  // Make req.query available to all templates
  res.locals.queryParams = { ...req.query };

  next();
};

export default addLocalVariables;
