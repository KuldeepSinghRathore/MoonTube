const mongoose = require("mongoose")
const { Schema } = mongoose
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: "firstName is not provided",
    },
    lastName: {
      type: String,
      required: "lastName is not provided",
    },
    email: {
      type: String,
      required: "email is not provided",
      unique: true,
    },
    password: {
      type: String,
      required: "password is not provided",
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", UserSchema)
module.exports = { User }
