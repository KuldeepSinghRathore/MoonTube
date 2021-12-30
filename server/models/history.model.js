const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const HistorySchema = new Schema({
  _id: {
    type: ObjectId,
    ref: "User",
  },
  historyItems: [
    {
      video: { type: Schema.Types.ObjectId, ref: "Video" },
    },
  ],
})

const History = mongoose.model("History", HistorySchema)
module.exports = { History }
