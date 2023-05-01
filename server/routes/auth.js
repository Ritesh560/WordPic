import express from "express"
const router = express.Router()
import jwt from "jsonwebtoken"
import { check, validationResult } from "express-validator"
import User from "../mongodb/models/user.js"
import auth from "../middleware/auth.js"
import bcrypt from "bcryptjs"

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send("Server Error")
  }
})

router.post("/", [check("email", "Please include a valid email").isEmail(), check("password", "please enter a password is required").exists()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array })

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, process.env.jwtSecret, (err, token) => {
      if (err) {
        throw err
      } else {
        res.json({ token })
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: [{ msg: "Server Error" }] })
  }
})

export default router
