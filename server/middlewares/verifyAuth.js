const jwt = require("jsonwebtoken")
const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.jwtSecret)
    req.userId = decoded.userId
    next()
  } catch (error) {
    console.log(error.stack)
    res.status(401).json({ success: false, message: "Unauthorized" })
  }
}

module.exports = verifyAuth
