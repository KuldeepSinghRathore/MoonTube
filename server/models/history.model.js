const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HistorySchema = new Schema({
  HistoryItems: [
    {
      video: { type: Schema.Types.ObjectId, ref: "Video" },
    },
  ],
})

const History = mongoose.model("History", HistorySchema)
module.exports = { History }
