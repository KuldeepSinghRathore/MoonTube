const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const PlaylistSchema = new Schema(
  {
    userwithId: {
      type: ObjectId,
      ref: "User",
    },

    playlistName: {
      type: String,
      required: true,
    },
    playlistItems: [
      {
        video: { type: ObjectId, ref: "Video" },
      },
    ],
  },
  { timestamps: true }
)

const Playlist = mongoose.model("Playlist", PlaylistSchema)
module.exports = { Playlist }
