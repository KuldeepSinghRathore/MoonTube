const {
  addToPlaylistUsingId,
  getPlaylistUsingId,
  deletePlaylistUsingId,
  deleteVideoFromPlaylistUsingId,
} = require("../controller/playlist.controller")

const router = require("express").Router()

router
  .route("/:userId/:videoId")
  .post(addToPlaylistUsingId)
  .delete(deleteVideoFromPlaylistUsingId)
router.route("/:userId").get(getPlaylistUsingId).delete(deletePlaylistUsingId)

module.exports = router
