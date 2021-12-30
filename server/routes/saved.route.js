const {
  addToSavedUsingId,
  deleteFromSavedUsingId,
  getSavedUsingId,
} = require("../controller/saved.controller")

const router = require("express").Router()

router
  .route("/:userId/:videoId")
  .post(addToSavedUsingId)
  .delete(deleteFromSavedUsingId)

router.route("/:userId").get(getSavedUsingId)

module.exports = router
