const { addToPlaylistUsingId } = require("../controller/playlist.controller")

const router = require("express").Router()

router.route("/:userId/:videoId").post(addToPlaylistUsingId)

module.exports = router
