const { signupUser } = require("../controller/user.controller")

const router = require("express").Router()

router.route("/signup").post(signupUser)

module.exports = router
