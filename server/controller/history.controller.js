const { History } = require("../models/history.model")
// Add History
const addToHistoryUsingId = async (req, res) => {
  try {
    const { userId } = req
    const { videoId } = req.params
    const history = await History.findById(userId)
     
    if (!history) {
      const newHistory = new History({
        _id: userId,
        historyItems: [
          {
            video: videoId,
          },
        ],
      })
      await newHistory.save()
      return res.status(200).json({
        success: true,
        message: "First video added to history",
        history: newHistory,
      })
    }
   
   history.historyItems=history.historyItems.filter(video=>video.toString()!==videoId).toString()
    history.historyItems = history.historyItems.concat({ video: videoId })
    await history.save()
    return res
      .status(200)
      .json({ success: true, message: "Video added to history" })
  } catch (error) {
    console.log(error.stack)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorMessage: error.message,
    })
  }
}

// get History
const getHistoryUsingId = async (req, res) => {
  try {
    const { userId } = req
    const history = await History.findById(userId).populate("historyItems.video")
    
    if (!history) {
      return res.status(404).json({
        success: false,
        message: "No history found",
        history: {
          historyItems: [],
        },
      })
    }
   const  historyItems = history.historyItems.sort((a,b)=>b.date - a.date)
    history.historyItems = historyItems
    return res.status(200).json({
      success: true,
      message: "History found",
      history,
    })
  } catch (error) {
    console.log(error.stack)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorMessage: error.message,
    })
  }
}

// delete History
const deleteVideoFromHistoryUsingId = async (req, res) => {
  try {
    const { userId } = req
    const { videoId } = req.params
    const history = await History.findById(userId)

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "No history found",
        history: {
          historyItems: [],
        },
      })
    }
    const findIndex = history.historyItems.findIndex(
      (historyItem) => historyItem.video.toString() === videoId
    )
    if (findIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "No video found of this id",
      })
    }
    // history.historyItems.splice(findIndex,1)
    history.historyItems[findIndex].remove()
    await history.save()
    return res.status(200).json({
      success: true,
      message: "Video deleted from history",
    })
  } catch (error) {
    console.log(error.stack)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorMessage: error.message,
    })
  }
}

module.exports = {
  addToHistoryUsingId,
  getHistoryUsingId,
  deleteVideoFromHistoryUsingId,
}
