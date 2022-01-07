const express = require("express")
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
// imported middlewares
const { notFound } = require("./middlewares/notFound")
const { errorHandler } = require("./middlewares/errorHandler")
const { connectDB } = require("./database/ConnectDb")
//imported  routes
const videoRouter = require("./routes/videos.route")
const userRouter = require("./routes/auth.route")
const historyRouter = require("./routes/history.route")
const likedRouter = require("./routes/liked.route")
const savedRouter = require("./routes/saved.route")
const playlistRouter = require("./routes/playlist.route")
const { saveVideoDataToDb } = require("./controller/video.controller")
const { videoData } = require("./database/data")

//using/calling  middlewares

app.use(cors())
dotenv.config()
app.use(express.json())
app.use(morgan("dev"))

const PORT = process.env.PORT || 5000
// DB Connection
connectDB()
/**Once for saving Data to Db */
// saveVideoDataToDb(videoData)
// calling routes
app.use("/api/videos", videoRouter)
app.use("/user", userRouter)
app.use("/api/history", historyRouter)
app.use("/api/liked", likedRouter)
app.use("/api/saved", savedRouter)
app.use("/api/playlist", playlistRouter)

app.get("/", (req, res) => {
  res.send("Hello World")
})

// 404 Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
