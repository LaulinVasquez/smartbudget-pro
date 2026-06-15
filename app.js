import express from "express"
import router from "./src/routes/index.js";

const app = express()
const PORT = process.env.PORT || 3000


// Middleware (setting up parse url-encoded allows Express to receive and process POST data)
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// static assets
app.use(express.static("src/public"));

// View engine
app.set("view engine", "ejs")

// Views location
app.set("views", "./src/views")


//  Home route
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening on port http://127.0.0.1:${PORT}`)
})