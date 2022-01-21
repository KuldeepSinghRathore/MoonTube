const {
  addToSavedUsingId,
  deleteFromSavedUsingId,
  getSavedUsingId,
} = require("../controller/saved.controller")

const router = require("express").Router()

router.route("/:videoId").post(addToSavedUsingId).delete(deleteFromSavedUsingId)

router.route("/").get(getSavedUsingId)

module.exports = router
