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
const verifyAuth = require("./middlewares/verifyAuth")

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
app.use("/api/history", verifyAuth, historyRouter)
app.use("/api/liked", verifyAuth, likedRouter)
app.use("/api/saved", verifyAuth, savedRouter)
app.use("/api/playlist", verifyAuth, playlistRouter)

app.get("/", (req, res) => {
  res.send(`Thanks for visiting go checkout the
    <a href="https://github.com/KuldeepSinghRathore"> https://github.com/KuldeepSinghRathore</a>`)
})

// 404 Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
