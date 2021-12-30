const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const LikedSchema = new Schema({
  _id: {
    type: ObjectId,
    ref: "User",
  },
  likedItems: [
    {
      video: { type: Schema.Types.ObjectId, ref: "Video" },
    },
  ],
})

const Liked = mongoose.model("Liked", LikedSchema)
module.exports = { Liked }
