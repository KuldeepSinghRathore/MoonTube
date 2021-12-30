const mongoose = require("mongoose")
const Schema = mongoose.Schema

const VideoSchema = new Schema(
  {
    youtubeId: {
      type: String,
      required: "youtube id is required",
    },
    title: {
      type: String,
      required: "title is required",
    },
    creator: {
      type: String,
      required: "creator is required",
    },
    views: {
      type: String,
      required: "views is required",
    },
  },
  { timestamps: true }
)
const Video = mongoose.model("Video", VideoSchema)
module.exports = { Video }
