const errorHandler = (err, req, res) => {
  console.error(err.stack)
  console.log(err)
  res.status(500).json({
    success: false,
    message: "Something went wrong Check Error  errorMessage",
    errorMessage: err.message,
  })
}
module.exports = { errorHandler }
