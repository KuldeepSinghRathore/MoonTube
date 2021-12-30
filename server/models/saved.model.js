const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const SavedSchema = new Schema({
  _id: {
    type: ObjectId,
    ref: "User",
  },
  savedItems: [
    {
      video: { type: Schema.Types.ObjectId, ref: "Video" },
    },
  ],
})
const Saved = mongoose.model("Saved", SavedSchema)
module.exports = { Saved }
