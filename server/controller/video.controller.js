const { Video } = require("../models/video.model")

const saveVideoDataToDb = (videoData) => {
  videoData.forEach(async (data) => {
    const video = new Video(data)
    await video.save()
  })
}

const getAllVideosFromDb = async (req, res) => {
  try {
    const videos = await Video.find()
    res.status(200).json({ success: true, videos })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error Feteching Videos",
      errorMessage: error.message,
    })
  }
}
module.exports = { saveVideoDataToDb, getAllVideosFromDb }
