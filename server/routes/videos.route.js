const { getAllVideosFromDb } = require("../controller/video.controller")

const router = require("express").Router()

router.route("/").get(getAllVideosFromDb)

module.exports = router
