const {
  addToLikedUsingId,
  deleteVideoFromLikedUsingId,
  getLikedUsingId,
} = require("../controller/liked.controller")

const router = require("express").Router()

router
  .route("/:videoId")
  .post(addToLikedUsingId)
  .delete(deleteVideoFromLikedUsingId)
router.route("/").get(getLikedUsingId)

module.exports = router
