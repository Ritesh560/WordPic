import express from "express"
const router = express.Router()
import { check, validationResult } from "express-validator"
import gravatar from "gravatar"
import bcrypt from "bcryptjs"
import User from "../mongodb/models/user.js"
import jwt from "jsonwebtoken"

//@route GET api/users
// @desc Test route
//@access Public

router.post("/", [check("name", "Name is required").not().isEmpty(), check("email", "Please include a valid email").isEmail(), check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // console.log(req.body)
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    //check if user exist
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] })
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    })

    user = new User({
      name,
      email,
      avatar,
      password,
    })

    //hashing the password

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) {
        throw err
      } else {
        res.json({ token })
      }
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

export default router
