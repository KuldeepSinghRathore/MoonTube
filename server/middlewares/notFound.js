const notFound = (req, res, next) => {
  res.status(404).send({
    success: false,
    message: "404 Route not found",
  })
}

module.exports = { notFound }
