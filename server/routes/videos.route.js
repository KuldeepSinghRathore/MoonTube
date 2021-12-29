const {
  getAllVideosFromDb,
  addNewVideoToDb,
  updateVideoById,
  deleteVideoById,
  getVideoByParam,
  getVideoById,
} = require("../controller/video.controller")

const router = require("express").Router()

router.route("/").get(getAllVideosFromDb).post(addNewVideoToDb)
router.param("id", getVideoByParam)
router
  .route("/:id")
  .get(getVideoById)
  .post(updateVideoById)
  .delete(deleteVideoById)

module.exports = router
