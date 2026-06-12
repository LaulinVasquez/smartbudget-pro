import express from "express"

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("SmartBudget Pro is under development 🚀")
})

app.listen(PORT, () => {
  console.log(`Listening on port http://127.0.0.1:${PORT}`)
})