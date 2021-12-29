const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    if (response) {
      console.log("Connected to the database")
    }
  } catch (error) {
    console.log("Error", error)
  }
}
module.exports = { connectDB }
