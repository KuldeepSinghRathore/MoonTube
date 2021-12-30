const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const PlaylistSchema = new Schema(
  {
    userwithId: {
      type: ObjectId,
      ref: "User",
      required: [true, "user id is required"],
    },

    playlistName: {
      type: String,
      required: "please enter a playlist name",
    },
    playlistItems: [
      {
        video: {
          type: ObjectId,
          ref: "Video",
          required: [true, "Video id is required"],
        },
      },
    ],
  },
  { timestamps: true }
)

const Playlist = mongoose.model("Playlist", PlaylistSchema)
module.exports = { Playlist }
