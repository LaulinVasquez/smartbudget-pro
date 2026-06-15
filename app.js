import express from "express"

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
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home"
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port http://127.0.0.1:${PORT}`)
})