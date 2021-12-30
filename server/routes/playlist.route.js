const {
  addToPlaylistUsingId,
  getPlaylistUsingId,
  deletePlaylistUsingId,
  deleteVideoFromPlaylistUsingId,
} = require("../controller/playlist.controller")

const router = require("express").Router()

router.route("/:userId/:videoId").post(addToPlaylistUsingId)
router.route("/:userId").get(getPlaylistUsingId)
router
  .route("/:userId/:playlistId")
  .delete(deletePlaylistUsingId)
  .delete(deleteVideoFromPlaylistUsingId)
router
  .route("/:userId/:playlistId/:videoId")
  .delete(deleteVideoFromPlaylistUsingId)

module.exports = router
