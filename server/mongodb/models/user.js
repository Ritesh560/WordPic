import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: Buffer,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  followers: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  bookmarks: [
    {
      type: ObjectId,
      ref: "Posts",
    },
  ],
})

const User = mongoose.model("User", UserSchema)
export default User
