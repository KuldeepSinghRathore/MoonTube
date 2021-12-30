const { Liked } = require("../models/liked.model")

// Add To Liked
const addToLikedUsingId = async (req, res) => {
  try {
    const { userId, videoId } = req.params
    const liked = await Liked.findById(userId)
    if (!liked) {
      const newLiked = new Liked({
        _id: userId,
        likedItems: [
          {
            video: videoId,
          },
        ],
      })
      await newLiked.save()
      return res.status(200).json({
        success: true,
        message: "First video added to liked",
        liked: newLiked,
      })
    }
    liked.likedItems = liked.likedItems.concat({ video: videoId })
    await liked.save()
    return res.status(200).json({
      success: true,
      message: "Video added to liked",
      liked,
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

// get Liked
const getLikedUsingId = async (req, res) => {
  try {
    const { userId } = req.params
    const liked = await Liked.findById(userId).populate("likedItems.video")
    if (!liked) {
      return res.status(404).json({
        success: false,
        message: "No liked found",
        liked: {
          likedItems: [],
        },
      })
    }
    return res.status(200).json({
      success: true,
      message: "Liked found",
      liked,
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

// delete from Liked
const deleteVideoFromLikedUsingId = async (req, res) => {
  try {
    const { userId, videoId } = req.params
    const liked = await Liked.findById(userId)
    if (!liked) {
      return res.status(404).json({
        success: false,
        message: "No liked found",
        liked: {
          likedItems: [],
        },
      })
    }
    const findIndex = liked.likedItems.findIndex(
      (item) => item.video.toString() === videoId
    )
    if (findIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "No video found  of this id",
        liked,
      })
    }
    // liked.likedItems.splice(findIndex, 1)
    liked.likedItems[findIndex].remove()
    await liked.save()
    return res.status(200).json({
      success: true,
      message: "Video deleted from liked",
      liked,
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
  addToLikedUsingId,
  getLikedUsingId,
  deleteVideoFromLikedUsingId,
}
