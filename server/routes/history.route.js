const {
  addToHistoryUsingId,
  getHistoryUsingId,
  deleteVideoFromHistoryUsingId,
} = require("../controller/history.controller")

const router = require("express").Router()

router
  .route("/:videoId")
  .post(addToHistoryUsingId)
  .delete(deleteVideoFromHistoryUsingId)
router.route("/").get(getHistoryUsingId)

module.exports = router
