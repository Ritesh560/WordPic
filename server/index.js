import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"

import connectDB from "./mongodb/connect.js"
import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"
import auth from "./routes/auth.js"
import user from "./routes/user.js"
import profile from "./routes/profile.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }))

app.use("/api/v1/post", postRoutes)
app.use("/api/v1/dalle", dalleRoutes)
app.use("/api/v1/auth", auth)
app.use("/api/v1/user", user)
app.use("/api/v1/profile", profile)

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "yo! Server is up and running",
  })
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8080, () => console.log("Server started on port 8080"))
  } catch (error) {
    console.log(error)
  }
}

startServer()
