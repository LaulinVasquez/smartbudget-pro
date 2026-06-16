// This is where we add all local variables that we want to make available in all templates

const addLocalVariables = (req, res, next) => {
  // Make NODE_ENV available to all templates
  res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";

  // Make req.query available to all templates
  res.locals.queryParams = { ...req.query };

  next()
};

export default addLocalVariables;
