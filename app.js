import express from "express";
import router from "./src/routes/index.js";
import addLocalVariables from "./src/middleware/global.js";
import path from "path";
import {fileURLToPath} from "url";
import {setupDatabase} from "./src/database/setup.js"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV?.toLocaleLowerCase() || "production";
const PORT = process.env.PORT || 3000;

// Middleware (setting up parse url-encoded allows Express to receive and process POST data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static assets
app.use(express.static(path.join(__dirname,"src/public"))) // Loading css
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(addLocalVariables);

//  Home route
app.use("/", router);


// Global error handling middleware for 404 and other errors
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  if (res.headerSent || res.finished) {
    return next(err);
  }
  // Determine the states code and template
  const status = err.status || 500;
  const message = status === 404 ? "404" : 500;
  const context = {
    title: status === 404 ? "404 - Page Not Found" : "Internal Server Error",
    error: NODE_ENV === "production" ? "An error occurred" : err.message, // Show error details only in development environment
    stack: NODE_ENV === "production" ? null : err.stack,
    NODE_ENV, // Our Websocket check needs this and it's convenient to pass along
  };
  // Make sure to render the proper error template
  try {
    res.status(status).render(`errors/${message}`, context);
  } catch (renderErr) {
    if (!res.headerSent) {
      res
        .status(status)
        .send(`<h1>Error ${status}</h1><p>An error occurred.</p>`);
    }
  }
});



app.listen(PORT, () => {
  setupDatabase();
  console.log(`Listening on port http://127.0.0.1:${PORT}`);
});
