const { Video } = require("../models/video.model")
const { extend } = require("lodash")
const saveVideoDataToDb = (videoData) => {
  videoData.forEach(async (data) => {
    const video = new Video(data)
    await video.save()
  })
}
// get all videos from db
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

// add new video to db
const addNewVideoToDb = async (req, res) => {
  try {
    const video = new Video(req.body)
    const savedVideo = await video.save()
    console.log(savedVideo)
    res.status(200).json({ success: true, savedVideo })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error Adding New Video",
      errorMessage: error.message,
    })
  }
}
const getVideoByParam = async (req, res, next, id) => {
  console.log(id)
  try {
    const video = await Video.findById(id)
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      })
    }
    req.video = video
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error Feteching Video",
      errorMessage: error.message,
    })
  }
}

const getVideoById = async (req, res) => {
  let { video } = req

  video.__v = undefined
  return res.status(200).json({
    success: true,
    video,
  })
}

const updateVideoById = async (req, res) => {
  try {
    let videoFromBody = req.body
    let { video } = req
    video = Object.assign(video, videoFromBody)
    // video = extend(video, videoFromBody)
    video = await video.save()
    return res.status(200).json({ success: true, video })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error Updating Video",
      errorMessage: error.message,
    })
  }
}

const deleteVideoById = async (req, res) => {
  try {
    let { video } = req
    video = await video.remove()
    video.deleted = true
    res.status(200).json({ success: true, video })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error Deleting Video",
      errorMessage: error.message,
    })
  }
}

module.exports = {
  saveVideoDataToDb,
  getAllVideosFromDb,
  addNewVideoToDb,
  getVideoByParam,
  getVideoById,
  updateVideoById,
  deleteVideoById,
}
