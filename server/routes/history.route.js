const {
  addToHistoryUsingId,
  getHistoryUsingId,
  deleteVideoFromHistoryUsingId,
} = require("../controller/history.controller")

const router = require("express").Router()

router
  .route("/:userId/:videoId")
  .post(addToHistoryUsingId)
  .delete(deleteVideoFromHistoryUsingId)
router.route("/:userId").get(getHistoryUsingId)

module.exports = router
