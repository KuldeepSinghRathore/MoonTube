const { Saved } = require("../models/saved.model")

// Add to Saved
const addToSavedUsingId = async (req, res) => {
  try {
    const { userId, videoId } = req.params
    const saved = await Saved.findById(userId)
    if (!saved) {
      const newSaved = new Saved({
        _id: userId,
        savedItems: [
          {
            video: videoId,
          },
        ],
      })
      await newSaved.save()
      return res.status(200).json({
        success: true,
        message: "First video added to saved",
        saved: newSaved,
      })
    }
    saved.savedItems = saved.savedItems.concat({ video: videoId })
    await saved.save()
    return res.status(200).json({
      success: true,
      message: "Video added to saved",
      saved,
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
// Get Saved Using Id
const getSavedUsingId = async (req, res) => {
  try {
    const { userId } = req.params
    const saved = await Saved.findById(userId).populate("savedItems.video")
    if (!saved) {
      return res.status(404).json({
        success: false,
        message: "No saved found",
        saved: {
          savedItems: [],
        },
      })
    }
    return res.status(200).json({
      success: true,
      message: "Saved found",
      saved,
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

// Delete from Saved
const deleteFromSavedUsingId = async (req, res) => {
  try {
    const { userId, videoId } = req.params
    const saved = await Saved.findById(userId)
    if (!saved) {
      return res.status(404).json({
        success: false,
        message: "No saved found",
        saved: {
          savedItems: [],
        },
      })
    }
    // saved.savedItems = saved.savedItems.filter(
    //   (item) => item.video.toString() !== videoId
    // )
    const findIndex = saved.savedItems.findIndex(
      (item) => item.video.toString() === videoId
    )
    if (findIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "No video found in saved",
        saved,
      })
    }
    // saved.savedItems.splice(findIndex, 1)
    saved.savedItems[findIndex].remove()
    await saved.save()
    return res.status(200).json({
      success: true,
      message: "Video deleted from saved",
      saved,
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
  addToSavedUsingId,
  getSavedUsingId,
  deleteFromSavedUsingId,
}
