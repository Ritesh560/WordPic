import jwt from "jsonwebtoken"
import config from "config"

const auth = (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token")

  //validate token
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" })

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret)
    req.user = decoded.user
    next()
  } catch (err) {
    res.send(401).json({ msg: "Token is not valid" })
  }
}

export default auth
