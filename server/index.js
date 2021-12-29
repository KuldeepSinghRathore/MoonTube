const express = require("express")
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
const { notFound } = require("./middlewares/notFound")
const { errorHandler } = require("./middlewares/errorHandler")

// middleware

dotenv.config()
app.use(express.json())
app.use(morgan("common"))
app.use(cors())

const PORT = process.env.PORT || 5000
app.get("/", (req, res) => {
  res.send("Hello World")
})

// 404 Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
