const {
  addToPlaylistUsingId,
  getPlaylistUsingId,
  deletePlaylistUsingId,
  deleteVideoFromPlaylistUsingId,
} = require("../controller/playlist.controller")

const router = require("express").Router()

router
  .route("/:videoId")
  .post(addToPlaylistUsingId)
  .delete(deleteVideoFromPlaylistUsingId)
router.route("/").get(getPlaylistUsingId).delete(deletePlaylistUsingId)

module.exports = router
