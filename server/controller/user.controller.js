const { User } = require("../Models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

// signupUser
const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    // checking if user already exists
    const userFromDb = await findUserByEmail(email)
    if (userFromDb) {
      return res.status(403).json({
        success: false,
        message: "User Email Already Exists",
      })
    }
    // hashing password
    let pass = password.toString()
    bcrypt.hash(pass, 10, async (err, hash) => {
      if (err) {
        console.log(err)
        res.status(500).json({
          success: false,
          message: "Cannot create user",
          errorMessage: err.message,
        })
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hash,
        })
        // saving New user
        const saveNewUser = await newUser.save()

        res.json({
          success: true,
          userId: saveNewUser._id,
        })
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Cannot create user",
      errorMessage: error.message,
    })
  }
}

module.exports = { signupUser }
