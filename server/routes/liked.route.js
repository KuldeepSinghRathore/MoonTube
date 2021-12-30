const {
  addToLikedUsingId,
  deleteVideoFromLikedUsingId,
  getLikedUsingId,
} = require("../controller/liked.controller")

const router = require("express").Router()

router
  .route("/:userId/:videoId")
  .post(addToLikedUsingId)
  .delete(deleteVideoFromLikedUsingId)
router.route("/:userId").get(getLikedUsingId)

module.exports = router
