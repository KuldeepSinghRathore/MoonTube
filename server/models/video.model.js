const mongoose = require("mongoose")
const Schema = mongoose.Schema

const VideoSchema = new Schema(
  {
    youtubeId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    views: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
const Video = mongoose.model("Video", VideoSchema)
module.exports = { Video }
