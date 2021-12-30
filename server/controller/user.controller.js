const { User } = require("../Models/user.model")
const bcrypt = require("bcrypt")
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}
const comparePassword = async (fromBody, fromDb) => {
  let matchPass = await bcrypt.compare(fromBody.password, fromDb.password)
  return matchPass
}
// loginUser
const loginUser = async (req, res) => {
  try {
    const userFromBody = req.body

    // finding user by email
    const userFromDb = await findUserByEmail(userFromBody.email)

    if (userFromBody === null) {
      return res.status(401).json({
        success: false,
        message: "No User Found Please SignUp",
      })
    }
    // comparing password
    if (!comparePassword(userFromBody, userFromDb)) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      })
    }
    // // creating token
    // const token = jwt.sign({ userId: userFromDb._id }, process.env.jwtSecret, {
    //   expiresIn: "24h",
    // })
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      userId: userFromDb.id,
      //   token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Authentication Failed",
      errorMessage: error.message,
    })
  }
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

module.exports = { signupUser, loginUser }
