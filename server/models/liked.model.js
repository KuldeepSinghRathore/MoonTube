const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const LikedSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      ref: "User",
      required: [true, "user id is required"],
    },
    likedItems: [
      {
        video: {
          type: Schema.Types.ObjectId,
          ref: "Video",
          required: [true, "Video id is required"],
        },
      },
    ],
  },
  { timestamps: true }
)

const Liked = mongoose.model("Liked", LikedSchema)
module.exports = { Liked }
